#include <windows.h>
#include <stdio.h>
int WINAPI WinMain ( HINSTANCE instance, HINSTANCE previous, LPSTR
commandline, int show )
{	FreeConsole();
	for(int n=0; n<10000; n)
	{	printf("MOO\n");
	}
	getchar();
}
