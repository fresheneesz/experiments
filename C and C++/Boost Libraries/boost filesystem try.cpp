// use -lboost_filesysem

#include<boost/filesystem/operations.hpp>
#include<iostream>
#include<fstream>
#include<stdio.h>
 
//namespace bf = boost::filesystem;         //create an alias

using namespace boost::filesystem;
using namespace std;

//a (= b)
void stringCat(char* a, char* b)
{	int n;
	for(n=0; a[n]!=0; n++)
	{}	//a[n]==0
	for(int m=0; b[m]!=0; m++)
	{	a[n]=b[m];
		n++;
	}
	a[n]=0;	
	//printf("%d - %s\n",n,a);
	//getchar();
}

//full traversal and output to file
void ftofBoost(path& p, ofstream& file, int curtab)
{	
	directory_iterator dir(p), end;
	
	for(; dir!=end; dir++)
	{	if(!is_directory(*dir))
		{	for(int n=0; n<curtab; n++)
				file << "\t";
			file << dir->leaf()<<"\n";
		}
	}
	dir = directory_iterator(p);
	for(; dir!=end; dir++)
	{	if(is_directory(*dir))
		{	for(int n=0; n<curtab; n++)
				file<<"\t";
			if(curtab<4)
			{	for(int n=0; n<curtab; n++)
					cout << "\t";
				cout << "Entering "<<dir->leaf()<<"\n";
			}
			file<<dir->leaf()<<"\n";
			ftofBoost(*dir, file, curtab+1);
		}
	}
}

/*
//full traversal and output to file
void ftofBoost(path& p, FILE* file, int curtab)
{	
	directory_iterator dir(p), end;
	
	for(; dir!=end; dir++)
	{	if(!is_directory(*dir))
		{	for(int n=0; n<curtab; n++)
				fprintf(file,"\t");
			fprintf(file,"%s\n",dir->leaf());
		}
	}
	dir = directory_iterator(p);
	for(; dir!=end; dir++)
	{	if(is_directory(*dir))
		{	for(int n=0; n<curtab; n++)
				fprintf(file,"\t");
			if(curtab<4)
			{	for(int n=0; n<curtab; n++)
					printf("\t");
				cout << "Entering "<<dir->leaf()<<"\n";
			}
			fprintf(file,"%s\n",dir->leaf());
			ftofBoost(*dir, file, curtab+1);
		}
	}
}
*/

int main()
{
	path p;
	
	cout << "Enter name of directory to list: ";
	char temp, fileName[100]="..";
	int n;
	for(n=0; (temp=getchar()) != '\n'; n++)
	{	fileName[n]=temp;
	}
	fileName[n]=0;
	
	p=path(fileName);
	ofstream out("list.txt");
	
    if(exists(p) && is_directory(p))
        ftofBoost(p, out, 0);
    else
        cout<<p.leaf()<<" does not exist or isn't a directory.\n";
    
	out.close();
	cout << "Done. Put output into file: %s\n","list.txt";
	getchar();

}


