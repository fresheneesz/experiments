
/* must link to static libraries:
-lboost_filesystem (or use the boost_filesystem library libboost_iostreams-mgw-mt-s-1_33_1.lib)
*/

#include <boost/filesystem/operations.hpp>

using namespace boost::filesystem;
//using namespace std;

directory_iterator eofE;	// end of file entity

void fsSetup()
{	boost::filesystem::path::default_name_check(boost::filesystem::native);

	/*
	> 3. Whilst I'm here, I would also like to point out the following silly 
	> code I need to use boost filesystem for a program designed to run in 
	> Linux and Windows: 
	> 
	> #ifdef __linux__ 
	> fs::path::default_name_check(fs::windows_name); 
	> #else //ie we are compiling for Windows 
	> fs::path::default_name_check(fs::native); 
	> #endif
	*/
}

class fEntity		// file entity
{public:
	path p;
	fEntity* curChild;
	directory_iterator children;
	
	FILE* openFile;
	char* buffer;
	static const int maxBufferSize=2;
	int bufferSize;
	long int bufFirst;	// index of first buffer character
	int bufLen;			// length of the buffer
	bool bufUnInit;
	
	long int curIndex;		// current index of the FILE pointer
	
	fEntity()
	{	buffer=0;
		curChild = 0;
	}
	
	~fEntity()
	{	if(buffer!=0)
			free(buffer);
		if(curChild!=0)
			delete curChild;
	}
	
	fEntity& cur()
	{	return *curChild;
	}
	
	// returns true if there are no more entities contained in the folder
	bool next()
	{	if(children==eofE)
		{	return true;
		}
		else
		{	curChild->p = *children;
			children++;
			return false;
		}
	}
	
	bool access(const char* a)
	{	p = path(a);

		if(boost::filesystem::exists(p) && is_directory(p))
		{	children = directory_iterator(p);
			if(curChild==0)
			{	curChild = new fEntity();
			}
			curChild->p = *children;
			children++;
		}

	}
	
	void access(fEntity& a)
	{	p=a.p;
		if(boost::filesystem::exists(p) && is_directory(p))
		{	children = directory_iterator(p);
			if(curChild==0)
			{	curChild = new fEntity();
			}
			curChild->p = *children;
			children++;
		}
	}
	
	inline bool exists()
	{	return boost::filesystem::exists(p); 
	}
	
	inline bool isDir()
	{	return is_directory(p);
	}
	
	// returns null poiner if file does not and filename has spaces in it..
	const char* name()
	{	return p.leaf().c_str();
	}
	
	// returns size of the thing in bytes
	inline long int size()
	{	return file_size(p);
	}
	
	inline time_t lastMod()
	{	return last_write_time(p);
	}
	
	inline void rename(char* newPathName)
	{	boost::filesystem::rename(p, path(newPathName));
	}
	
	inline bool rm()
	{	return remove(p);
	}
	
	// be VERY careful when using this - deletes an entire file forever
	inline bool remove_all()
	{	return boost::filesystem::remove_all(p);
	}
	
	// makes a directory out of the current path name
	inline bool mkdir()
	{	return create_directory(p);
	}
	
	bool copy_all(char* name)
	{	// unimplimented
	}
	
	inline bool copyTo(char* name)
	{	if(isDir())
		{	return copy_all(name);
		}
		else
		{	copy_file(p, path(name));
		}
	}
	
	// opens the entity as a file (must be a file...).
	// Access types:
	// R file reference for reading.
	// RWO file reference for reading or writing. OVERWRITES the file it gets pointed to. 
	// RW file reference for reading or writing. 
	// adding 'b' to the access type opens the file in binary ("rb", "wb", "w+b", "r+b")
	// returns true if could not open folder
	bool open(int accessType)
	{	bufLen=0;
		int tempsize;
		tempsize = bufferSize;
		
		if(p==0)
			return true;
		
		if(boost::filesystem::exists(p))
		{	if(maxBufferSize<file_size(p))
				bufferSize = maxBufferSize;
			else
				bufferSize = file_size(p);
		}
		else
			bufferSize = maxBufferSize;
			
		if(buffer==0)
			buffer = (char*)malloc(bufferSize*sizeof(char));
		else if(tempsize < bufferSize)
		{	free(buffer);
			buffer = (char*)malloc(bufferSize*sizeof(char));
		}
			
		curIndex=0;
		bufUnInit = true;
	
		if(accessType==0)	// R - won't open if doesn't exist
		{	openFile = fopen(p.leaf().c_str(), "rb");
		}
		else if(accessType==2)	// RWO
		{	openFile = fopen(p.leaf().c_str(), "w+b");
		}
		else 				// RW
		{	if(!boost::filesystem::exists(p))	// if it doesn't exist
			{	openFile = fopen(p.leaf().c_str(), "w");
				fclose(openFile);
			}
			openFile = fopen(p.leaf().c_str(), "r+b");
		}
		
		if(openFile == 0)
			return true;	// couldn't open
		//else
			return false;
	}

	// open read
	inline bool openR()
	{	return open(0);
	}
	// open read/write
	inline bool openRW()
	{	return open(1);
	}
	// open read and overwrite
	inline bool openRWO()
	{	return open(2);
	}
	
	inline void close()
	{	fclose(openFile);
	}

	// fill buffer from current position in the FILE pointer
	// for internal use only
	// returns true on end of file
	bool fill(int reset)
	{	bufLen = fread(buffer, sizeof(char), bufferSize, openFile);
		if(bufUnInit)
		{	bufFirst = reset;
			bufUnInit = false;
		}
		else
		{	bufFirst += bufLen;
		}
			
		curIndex += bufLen;
		if(bufLen == 0)
			return true; 	// End of File
		//else
			return false;
	}
	
	
	// READ ONLY
	// returns -1 on end of file
	char get(long int index)
	{	if(bufFirst <= index&&index < bufFirst+bufLen)
		{	// just return below
		}
		else if(curIndex <= index&&index < curIndex+bufferSize)
		{	if(fill(0))
				return -1;
		}
		else		// if index is out of range
		{	fseek(openFile, index, SEEK_SET);
			// prepare bufFirst for update - and update curIndex
			bufUnInit=true;
			curIndex = index;
			if(fill(index))
				return -1;
		}
		return buffer[index-bufFirst];
	}
	
	// READ ONLY
	// returns -1 on end of file
	inline char operator [](long int index)
	{	return get(index);
	}
	
	// puts a character stream into the file
	void put(long int index, char* a, int aSize)
	{	if(index!=curIndex)
		{	fseek(openFile, index, SEEK_SET);
		}
		curIndex += fwrite(a, sizeof(char), aSize, openFile);
	}
	
	// puts a character stream into the file
	void put(long int index, char a)
	{	if(index!=curIndex)
		{	fseek(openFile, index, SEEK_SET);
		}
		curIndex += fwrite(&a, sizeof(char), 1, openFile);
	}
	
		// gets num characters and puts them in 'a'
	char* gechars(int index, char* a, int num)
	{	int n;
		for(n=0; n<num; n++)
		{	a[n]=get(index);
			if(a[n]==-1)
			{	a[n]=0;
				return a;
			}
			index++;
		}
		a[n]=0;
		return a;
	}
	
	// gets chacters until a certain one, and returns the string
	char* gechars(int index, char* a, char end)
	{	int n;
		for(n=0; (a[n]=get(index))!=end; n++)
		{	if(a[n]==-1)
			{	a[n]=0;
				return a;
			}
			index++;
		}
		a[n]=0;
		return a;
	}
	
	// not meant to be used publically
	// this function was jacked from BillysStrings....h
	bool isIn_forFilesystem(char a, char* ins)
	{	for(int m=0; ins[m]!=0; m++)
		{	if(a==ins[m])
			{	return true;
			}
		}
		return false;
	}
	
	// gets chacters until reaching one of a number of characters
	// returns the string
	char* gechars(int index, char* a, char* ends)
	{	int n;
		for(n=0; !isIn_forFilesystem(a[n]=get(index), ends); n++)
		{	if(a[n]==-1)
			{	a[n]=0;
				return a;
			}
			index++;
		}
		a[n]=0;
		return a;
	}
	
	// opens the entity as a file (must be a file...).
	//Access types:
	// R file reference for reading.
	// RWO file reference for reading or writing. OVERWRITES the file it gets pointed to. 
	// RW file reference for reading or writing. 
	// adding 'b' to the access type opens the file in binary ("rb", "wb", "w+b", "r+b")
	// returns true if could not open folder
	bool open(char* filename, int accessType)
	{	bufLen=0;
		bufferSize = maxBufferSize;
			
		if(buffer!=0)
			free(buffer);
		buffer = (char*)malloc(maxBufferSize*sizeof(char));
			
		curIndex=0;
	
		if(accessType==0)	// R - won't open if doesn't exist
		{	openFile = fopen(filename, "rb");
		}
		else if(accessType==2)	// RWO
		{	openFile = fopen(filename, "w+b");
		}
		else 				// RW
		{	openFile = fopen(filename, "r+b");
		}
		
		if(openFile == 0)
			return true;	// couldn't open
		//else
			return false;
	}
	
	
};

inline bool operator ==(path& a, path& b)	//file equivalence test: returns true if they are equal
{	if(equivalent(a, b) && file_size(a)==file_size(b) && last_write_time(a)==last_write_time(b))
		return true;
	//else
	return false;
}
