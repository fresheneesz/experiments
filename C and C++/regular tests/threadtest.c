#include <stdio.h>
#include "theThreads for C v080000.h"

mutex b, c;

void* func1(void* a)
{	
	int n;
	
	mutexL(&b);
	for(n=0; n<1000; n++)
	{	printf("A");
	}
	mutexUL(&b);
	mutexUL(&c);
}

void* func2(void* a)
{	int n;
	mutexL(&b);
	for(n=0; n<100; n++)
	{	printf("B");
	}
	mutexUL(&b);
	mutexL(&c);
	for(n=0; n<900; n++)
	{	printf("C");
	}
	mutexUL(&c);
	
}

main()
{	thread moose, moose2;
	mutexConstruct(&b);
	mutexConstruct(&c);
	
	mutexL(&c);
	
	startThread(&moose, func2, 0);
	startThread(&moose2, func1, 0);
	
	waitonThread(&moose);
	waitonThread(&moose2);
}
