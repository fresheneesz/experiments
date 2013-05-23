/*	This file was created by Billy Tetrud. Use of this file is free as long as it is credited.
*/
#ifndef BillysNeccessaryFunctions
#define BillysNeccessaryFunctions

#include <stdlib.h>

// replacement for the realloc function
// in is the size coming in, and out is the size going out
// returns true on failure
template <class T>
bool rloc(T*& a, /*int in,*/ int out)
{	T* temp;
	//temp = (T*)malloc(out);
	temp = (T*)realloc(a, out);
	
	if(temp!=0)
	{	/*int m;
		for(m=0; m+3<in && m+3<out; m+=4)
		{	((int*)temp)[m/4] = ((int*)a)[m/4];
		}
		for(; m<in && m<out; m++)
		{	((char*)temp)[m] = ((char*)a)[m];
		}
		free(a);	// returns resources
		*/
		a=temp;
		return false;	// no error
	}
	else
	{	return true;		// failure
	}
}


// allocates memory for a list - n is the number of elements wanted
// does not free any resources
// returns true on failure
template <class T>
bool listloc(T*& a, int n)
{	a = (T*)malloc(n*sizeof(T));

	if(a!=0)
	{	return false;	// no error
	}
	else
	{	true;		// failure
	}
}

// replacement for the malloc function
// out is the size going out
// returns true on failure
template <class T>
bool mloc(T*& a, int out)
{	a = (T*)malloc(out);
	
	if(a!=0)
	{	return false;	// no error
	}
	else
	{	return true;		// failure
	}
}

#define ITER1(x)		for(int n1=0; n1<x; n1++)
#define ITER2(x,y)		for(int n1=0; n1<x; n1++) \
							for(int n2=0; n2<y; n2++)


#endif
