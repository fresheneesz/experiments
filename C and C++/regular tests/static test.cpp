#include <iostream.h>

int red;

int moose()
{	static int x = red;
	return x;
}

main() 
{	red = 5;
	red = 8;

	printf("%d",moose());
	red = 3;
	printf("%d",moose());
	
	getchar();
}
