#include <stdio.h>
void foo(void* g);
main()
{	void* a=&&the;
	printf("Hi");

	foo(a);
	printf("MOO");
the:printf("ASS");
	getchar();
	goto *a;
	getchar();
}

void foo(void* g)
{	goto *g;
}
