#include <stdio.h>
#include <time.h>
#include <windows.h>

main()
{	int a1, a2=0, b1, b2=0, c1, c2=0, d1, d2=0; 
	int length=1000;
	int* jack __attribute__ ((__malloc__));
	int* moose;
	int n,m;
	
	for(m=0; m<length; m++)
	{	a1=clock();
		jack=0;
		for(n=0; n<1000; n++)
		{	*jack++;
		}
		a2+=clock()-a1;
		
		b1=clock();
		moose=0;
		for(n=0; n<1000; n++)
		{	*moose++;
		}
		b2+=clock()-b1;
		
	/*	c1=clock();
		c2+=clock()-c1;
	
	/*
		d1=clock();
		int d(54);
		d2+=clock()-d1;
	*/	
		
		
	}
	
	printf("\nfirst: %d",a2);
	printf("\nfirst: %d",b2);
	printf("\nfirst: %d",c2);
	printf("\nfirst: %d",d2);
	
	
	getchar();
	
}
