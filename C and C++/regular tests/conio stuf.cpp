#include <iostream>
#include <conio.h>

using namespace std;

/*On Unix, there should be an ioctl() to set such a mode, or 
you can use the higher-level interface in the curses library.
In a DOS environment, check out getch() and/or kbhit().
/*/

main()
{	char a[12], b[1];
	int n=0;
	
	cout << "huh: ";
	while((a[n]	= cgets()) != 'r')
	{	cout << (int)a[n];
		n++;
		getchar();
		
	}
	cout << "\na";
	getchar();
	
}
