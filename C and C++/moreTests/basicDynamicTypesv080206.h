/*	This file was created by Billy Tetrud. Use of this file is free as long as it is credited.
*/

#ifndef BillysBasicDynamicTypes
#define BillysBasicDynamicTypes

#include "neccessaryFunctions080106.h"

// Dynamic list, automaticaly grows - never goes out of bounds (except for negative index)
// must not contain a class that contains pointers nor a reference of any distance to such a class 
template <class T,int startSize=5>
class BDArr		// basic dynamic list
{public:
	T* list;
	int theSize, length;
	
	// creates an empty list
	BDArr()		
	{	length=0;
		theSize=startSize;
		listloc(list,startSize);
	}
	
	~BDArr()
	{	free(list);
		list=0;
		length=0;
		theSize=0;
	}
	
	// Doubles the size of the list
	// returns true on failure
	bool grow()
	{	if(rloc(list, theSize*2*sizeof(T)))
			return true;
		theSize*=2;
		return false;
	}
	
	// halves the size of the list
	void shrink()
	{	theSize/=2;
		rloc(list, theSize*sizeof(T));
	}
	
	// bracket operator for usual array access
	T& operator [](int n)
	{	if(n>=theSize)
		{	if(grow())
				return *((T*)0);	// out of memory - yeah.. thats supposed to give an error
			return (*this)[n];
		}
		if(n>=length)
		{	length = n+1;
		}
		return list[n];
	}
	
	// returns the size
	int size()
	{	return theSize;
	}
	
	int len()
	{	return length;
	}

	BDArr<T> operator =(BDArr<T> a)
	{	for(int n=0; n<a.length; n++)
		{	list[n]=a.list[n];
		}
		length = a.length;
	}

};

// dynamic queue
// must not contain a class that contains pointers nor a reference of any distance to such a class 
template <class T, int startSize=5>
class BDFifo
{public:
	BDArr<T,startSize> Q;
	int front, back;//, length;
	
	BDFifo()	// creates empty queue
	{	front=0;
		back=0;
		//length=0;
	}
	
	T& operator [](int n)	// access middle of queue
	{	if(n>=Q.size())
		{	if(back<=front)// add the back of Q thats in the beggining of the Darr to the front
			{	for(int m=0; m<back; m++)
				{	Q[Q.length] = Q[m];
				}
				back = Q.length;	// queue should no longer be wrapped around the array
			}
			return Q[front+n];
		}	
		else if(n+front>=Q.size())
		{	return Q[n - (Q.size()-front)];
		}
		else
		{	return Q[front+n];
		}
	}
	
	// add to back - because C++ is stupid, you may not push a literal type (integer literal, float literal, etc)
	// to push a literal, create a dummy variable, and assign it inside the parens, like this: push(dummy=4);
	// 			or use the function pushlit
	void push(T& a)	
	{	(*this)[length()] = a;

		if(back+1==Q.size())
		{	back=0;
		}
		else
			back+=1;
	}
	
	// add literal to back 
	void pushlit(T a)	
	{	(*this)[length()] = a;

		if(back+1==Q.size())
		{	back=0;
		}
		else
			back+=1;
	}
	
	// pull from front - returns true if can't pop
	bool pop(T& a)
	{	if(front==back && Q.length==0)
			return true;
		else
		{	a = Q[front];
			if(front+1==Q.size())
			{	front=0;
			}
			else
				front+=1;
				
			if(front==back)
				Q.length=0;	// indicates that queue is empty, not full
			return false;
		}
	}
	
	
	int length()
	{	if(back>front)
		{	return back-front;
		}
		else if(back==front)
		{	if(Q.length==0)
				return 0;
			else
				return Q.length;
		}
		else
		{	return back + Q.length-front;
		}
	}
	
	int len()
	{	return length();
	}
};

#endif
