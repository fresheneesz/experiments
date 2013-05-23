#include <al/al.h>
#include <al/alc.h>
#include <al/alu.h>
#include <al/alut.h>

#include <ogg/ogg.h>
#include <ogg/codec.h>
#include <ogg/vorbisfile.h>

#include <stdio.h>

/* must link to dynamic libraries:
	vorbisfile.dll
*/

/* must link to static libraries:
-lSDLmain 
-lSDL 
-lopenal32 
-lalc 
-lalu 
-lalut 
-logg 
-lvorbis 
-lvorbisfile
*/

bool audioInit()
{	alutInit(0, 0);
    if(alGetError()!=AL_NO_ERROR)
	{	printf("OpenAL initialization failed. Um.. get a new computer. You fail.\n");
		return false;
	}
	
	alDopplerFactor(0);					// no doppler effect
	//alDopplerVelocity(velocity);		// sets speed of sound
	return true;
}

class ogg_stream
{public://private:
	FILE*           oggFile;       // file handle
	OggVorbis_File  oggStream;     // stream handle
	vorbis_info*    vorbisInfo;    // some formatting data
	vorbis_comment* vorbisComment; // user comments
	
	ALuint buffers[2]; // front and back buffers
	ALuint source;     // audio source
	ALenum format;     // internal format
	
	int active;		// whether the audio source is playing or not
	int paused;		// whether the source is paused or not

 //public:
	int BUFFER_SIZE;				// minimum is 4096
	
	void open(char* path, int bufferSize) // obtain a handle to the file
	{	BUFFER_SIZE=bufferSize;
		active=0; paused=0;
		
		int result;
		
		if(!(oggFile = fopen(path, "rb")))
		    printf("Could not open %s for binary reading.\n", path);
		
		if((result = ov_open(oggFile, &oggStream, NULL, 0)) < 0)
		{	fclose(oggFile);
			printf("Could not open Ogg stream for %s.\n", path);
		}
		
		vorbisInfo = ov_info(&oggStream, -1);
		vorbisComment = ov_comment(&oggStream, -1);
		
		if(vorbisInfo->channels == 1)
			format = AL_FORMAT_MONO16;
		else if(vorbisInfo->channels == 2)
			format = AL_FORMAT_STEREO16;
		else
			printf("Error %d channels. \
					More or less channels than 1 or 2 were found. \
					2 channels will be assumed.\n", vorbisInfo->channels);
	    
		alGenBuffers(2, buffers);
		if(alGetError() != AL_NO_ERROR)
				printf("01OpenAL error was raised.\n");
		alGenSources(1, &source);
		if(alGetError() != AL_NO_ERROR)
				printf("02OpenAL error was raised.\n");
		
		alSource3f(source, AL_POSITION,        0.0, 0.0, 0.0);
		alSource3f(source, AL_VELOCITY,        0.0, 0.0, 0.0);
		alSource3f(source, AL_DIRECTION,       0.0, 0.0, 0.0);
		alSourcef (source, AL_ROLLOFF_FACTOR,  0.0          );
		alSourcei (source, AL_SOURCE_RELATIVE, AL_TRUE      );
	}
	
	void release()			// release the file handle
	{	alSourceStop(source);
		active=0; paused=0;
		empty();
		alDeleteSources(1, &source);
		if(alGetError() != AL_NO_ERROR)
				printf("03OpenAL error was raised.\n");
		alDeleteBuffers(1, buffers);
		if(alGetError() != AL_NO_ERROR)
				printf("04OpenAL error was raised.\n");
		ov_clear(&oggStream);
	}
	
	void display()         // display some info on the Ogg
	{	printf("\tversion         %d\n", vorbisInfo->version			);
		printf("\tchannels        %d\n", vorbisInfo->channels			);
		printf("\trate (hz)       %g\n", vorbisInfo->rate				);
		printf("\tbitrate upper   %g\n", vorbisInfo->bitrate_upper	);
		printf("\tbitrate nominal %g\n", vorbisInfo->bitrate_nominal	);
		printf("\tbitrate lower   %g\n", vorbisInfo->bitrate_lower	);
		printf("\tbitrate window  %g\n", vorbisInfo->bitrate_window	);
		printf("vendor: %s\n", vorbisComment->vendor);
		    
		for(int i = 0; i < vorbisComment->comments; i++)
		    printf("   %s\n", vorbisComment->user_comments[i]);
		printf("\n");
	}
	
	bool playing()			// check if the source is playing
	{	ALenum state;
		alGetSourcei(source, AL_SOURCE_STATE, &state);
		return (state == AL_PLAYING);
	}
	
	void PlayOrPause()
	{	if(paused)
		{	alSourcePlay(source);//Box->source);
			paused=0;
		}
		else
		{	alSourcePause(source);//Box->source);
			paused=1;
		}
	}	
	
	bool playback()        // play the Ogg stream
	{	active=1; paused=0;
		if(playing())
			return true;
		if(!stream(buffers[0]))
			return false;
		if(!stream(buffers[1]))
		    return false;
		
		alSourceQueueBuffers(source, 2, buffers);
		alSourcePlay(source);
		
		return true;
	}
	
	bool update()			// update the stream if necessary
	{	int processed;
		bool active = true;

		if(!playing() && !paused)	// if not playing, keep playing
		{	//printf("not playing: %d\n", active);
			if(!active)
				return false;
			//else
			alSourcePlay(source);
			return true;
		}
		
		alGetSourcei(source, AL_BUFFERS_PROCESSED, &processed);
		ALuint buffer;
		for(;processed;processed--)
		{	alSourceUnqueueBuffers(source, 1, &buffer);
			if(alGetError() != AL_NO_ERROR)
				printf("05OpenAL error was raised.\n");
			active = stream(buffer);
			alSourceQueueBuffers(source, 1, &buffer);
		    if(alGetError() != AL_NO_ERROR)
				printf("06OpenAL error was raised.\n");
		}
		return active;
	}
	
	// offset in pcm/1000
	bool seekpcm(int offset)
	{	int finalOffset = oggStream.pcm_offset + offset*1000;
		if(finalOffset < 0)
			finalOffset = 0;
		ov_pcm_seek(&oggStream, oggStream.pcm_offset + offset*1000);
	}

	bool seekable()
	{	if(ov_seekable(&oggStream) == 0)
			return false;
		//else
			return true;
	}

 protected:
 	bool stream(ALuint buffer)   // reloads a buffer
	{	char data[BUFFER_SIZE];
		int  size=0;
		int section, result;
		int endian=0, bytesPerPeice=2, isSigned=true;
		
		while(size < BUFFER_SIZE)
		{	result = ov_read(&oggStream, data + size, BUFFER_SIZE - size, endian, bytesPerPeice, isSigned, &section);
		
		    if(result > 0)
		        size += result;
		    else if(result==0)
		    {	active=0;
		    	
		    	alSourceStop(source);
				active=0;
				empty();
				alDeleteSources(1, &source);
				if(alGetError() != AL_NO_ERROR)
						printf("03OpenAL error was raised.\n");
				//alDeleteBuffers(1, buffers);
				//if(alGetError() != AL_NO_ERROR)
				//	printf("04OpenAL error was raised.\n");
				ov_clear(&oggStream);
		    	
				break;
			}
			else //if(result < 0)
			{	printf("ERROR: %s\n", errorString(result));
				return false;
			}
		}
		
		if(size == 0)
		    return false;
		
		alBufferData(buffer, format, data, size, vorbisInfo->rate);
		if(alGetError() != AL_NO_ERROR)
		{	printf("07OpenAL error was raised.\n");
			return false;
		}
		
		return true;
	}	
	
	void empty()                 // empties the queue
	{	int queued;
		alGetSourcei(source, AL_BUFFERS_QUEUED, &queued);
	
		while(queued--)
		{	ALuint buffer;
			alSourceUnqueueBuffers(source, 1, &buffer);
			if(alGetError() != AL_NO_ERROR)
				printf("08OpenAL error was raised.\n");
		}
	}
	
	char* errorString(int code) // stringify an error code
	{	switch(code)
		{case OV_EREAD:
			return "Read from media.\n";
		 case OV_ENOTVORBIS:
			return "Not Vorbis data.\n";
		 case OV_EVERSION:
			return "Vorbis version mismatch.\n";
		 case OV_EBADHEADER:
			return "Invalid Vorbis header.\n";
		 case OV_EFAULT:
			return "Internal logic fault (bug or heap/stack corruption.";
		 default:
			return "Unknown Ogg error.";
		}
	}
	
};



/* Loads sample data from the disk using the Alut utility and send the data into OpenAL as a buffer. 
 * A source is then also created to play that buffer.
 */
ALboolean LoadALData(char WAVfileName[], ALfloat SourcePos[], ALfloat SourceVel[], ALuint* BufferID, ALuint* Source)
{	ALenum format;
	ALsizei size;
	ALvoid* data;
	ALsizei freq;
	ALboolean loop=1;

	alGenBuffers(1, BufferID);	// Load wav data into a buffer.
	if(alGetError() != AL_NO_ERROR)
		return AL_FALSE;

	alutLoadWAVFile(WAVfileName, &format, &data, &size, &freq, &loop);
	alBufferData(*BufferID, format, data, size, freq);
	alutUnloadWAV(format, data, size, freq);

	alGenSources(1, Source);	// Bind the buffer with the source.

	if(alGetError() != AL_NO_ERROR)
		printf("Failed to load a sound. Texture Error\n");

	alSourcei (*Source, AL_BUFFER,   *BufferID   );
	alSourcef (*Source, AL_PITCH,    1      );
	alSourcef (*Source, AL_GAIN,     1.0      );
	alSourcefv(*Source, AL_POSITION, SourcePos);
	alSourcefv(*Source, AL_VELOCITY, SourceVel);
	alSourcei (*Source, AL_LOOPING,  1     );

	if(alGetError() == AL_NO_ERROR)		// Do another error check and return.
		return AL_TRUE;
	//else
		printf("Failed to load a sound. Texture Error\n");
		return AL_FALSE;
}
    
void SetListenerValues(ALfloat ListenerPos[], ALfloat ListenerVel[], ALfloat ListenerOri[])
{
    alListenerfv(AL_POSITION,    ListenerPos);
    alListenerfv(AL_VELOCITY,    ListenerVel);
    alListenerfv(AL_ORIENTATION, ListenerOri);
}
