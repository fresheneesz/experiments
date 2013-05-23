#include "theFilesystemBoost080310.h"
#include <stdio.h>
#include <iostream>
#include <fstream>
using namespace std;
#include "theStrings v080218.h"

//full traversal and output to file
void ftofBoost(fEntity& p, ofstream& file, int curtab)
{	while(1)
	{	if(!p.cur().isDir())
		{	for(int n=0; n<curtab; n++)
				file << "\t";
			file << p.cur().name()<<"\n";
		}
		if(p.next())
		{	break;	// done with folder
		}	
	} 
	p.access(p);
	while(1)
	{	if(p.cur().isDir())
		{	for(int n=0; n<curtab; n++)
				file<<"\t";
			if(curtab<4)
			{	for(int n=0; n<curtab; n++)
					cout << "\t";
				cout << "Entering "<<p.cur().name()<<"\n";
			}
			file<<p.cur().name()<<"\n";
			p.cur().access(p.cur().name());
			ftofBoost(p.cur(), file, curtab+1);
		}
		if(p.next())
		{	break;	// done with folder
		}	
	}
}

int main()
{
	fEntity p;
	
	fsSetup();
	
	path jobag = path("some path");
	
	cout << "Enter name of directory to list: ";
	char temp, fileName[100]=".";
	int n;
	for(n=0; (temp=getchar()) != '\n'; n++)
	{	fileName[n]=temp;
	}
	fileName[n]=0;
	
	printf("whatsdfwoeifejw the fuck\n");
	p.access(fileName);
	printf("what the fuck\n");
	ofstream out("list.txt");
	
	printf("ass\n");
    if(p.exists() && p.isDir())
        ftofBoost(p, out, 0);
    else
        cout<<fileName<<" does not exist or isn't a directory.\n";
    
	out.close();
	cout << "Done. Put output into file: list.txt\n";
	getchar();

}


