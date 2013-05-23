#include <stdio.h>
#include <time.h>
#include "basicDynamicTypesv080205.h"

static const int MULT_ARRAY_SUBARRAY_SIZE=100;

class wordform
{public:
	char anychar_strings[50*MULT_ARRAY_SUBARRAY_SIZE];
	char anychars[50*MULT_ARRAY_SUBARRAY_SIZE];

	
	wordform()
	{	for(int x=0; x<50 ; x++)
		{	anychar_strings[x*50+0]=0;
			anychars[x*50+0]=0;
		}

	}
	
	void clear()
	{	for(int x=0; x<50 ; x++)
		{	anychar_strings[x*50+0]=0;
			anychars[x*50+0]=0;
		}

	}
};

main()
{		
	BDArr<wordform> wordforms;  // contains all the wordforms under one arrow
	wordform* CW;
	int a, b=0; 
	
	for(int moose=0; moose<100000; moose++)
	{	a=clock();
		
		CW = &(wordforms[wordforms.len()]);
		CW->clear();
		b+=clock()-a;
		if(moose%100==0)
			printf("This is %d: TIME %d\n", moose,b);
	}
	getchar();
	
}
