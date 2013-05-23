#include <stdio.h>
int* foo() __attribute__ ((__malloc__));

//http://www.unixwiz.net/techtips/gnu-c-attributes.html
main()
{	int* jack __attribute__ ((__malloc__));
	int b=5;
	jack = &b;
	printf("%d",*jack);
	foo();
	getchar();
}

int* foo()
{	int* a = (int*)malloc(sizeof(a));
	return a;
}
