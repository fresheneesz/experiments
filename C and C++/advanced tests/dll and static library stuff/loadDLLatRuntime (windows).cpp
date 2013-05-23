#include <windows.h>
#include <stdio.h>

main()
{	HINSTANCE__* x = LoadLibrary("hello.dll");    
    if(x==0)
    {	printf("Library not found\n");
	}
	else
	{	int(*y)() = (int(*)())GetProcAddress(x, "dllfunc");
		y();
	}
	getchar();
}
