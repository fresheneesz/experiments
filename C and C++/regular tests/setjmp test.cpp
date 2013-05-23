#include <stdio.h>
#include <setjmp.h>

static jmp_buf buf;

void second(void)
{	printf("second\n");
	longjmp(buf,1);
}
void first(void)
{	second();
	printf("first\n");	// never prints
}
main ()
{	int a = setjmp(buf);
    if(!a)
    	first();
    else
    	printf("main");
	getchar();
}
