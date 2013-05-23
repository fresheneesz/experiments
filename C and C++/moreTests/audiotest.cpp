#include "audioHandling v080226.h"
#include "KBhandlingv080203.h"

main()
{	audioInit();
	ogg_stream a;
	a.open("Legofwiz-dead.ogg", 2*4096);
	
	printf("Starting file\n");
	if(!a.seekable())
	{	printf("WTF????\n");
	}	

	a.playback();
	for(int n=0; 1; n++)
	{	a.update();
		if(khit())
		{	char temp = gechn();
			if(temp == 'f')	//forward
			{	a.seekpcm(5);
			}
			else if(temp == 'b')	// back
			{	a.seekpcm(-8);
			}
		}
	}
}
