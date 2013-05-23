
#include <fcntl.h>
//#include <stdio.h>

int SL(char* x);
void wout(char* a);

int r  = O_RDONLY;
int w  = O_WRONLY; 
int rw = O_RDWR;
int ap = O_APPEND;
int c  = O_CREAT;
int e  = O_EXCL;
int t  = O_TRUNC;

main()
{	int a=3;
	char b[50];
	a=open("hi.txt",w|c);
	wout("what the fuck");
	read(0,b,1);
	close(a);
}


void wout(char* a)
{	write(1,a,SL(a));
}

int SL(char* x)
{   int n=0;
    int result=0;
    while(x[n]!=0)
    {   result++;
        n++;
    }
    return(result);
}
