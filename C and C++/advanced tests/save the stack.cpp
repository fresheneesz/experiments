#include <stdio.h>
#include <setjmp.h>
#include <stdlib.h>

class continuation;

long *pbos;					// pointer to the bottom of the stack
continuation *gcont = 0;	// global continuation

class continuation
{public:
	jmp_buf registers;
	int n;
	long *stack;
	continuation *next;	// Pointer to next continuation in chain.
	
	void save_stack(long *pbos,long *ptos) 
	{	int tempn = pbos - ptos;
		int i;
		
		stack = (long *)malloc(tempn*sizeof(long));
		n = tempn;
		for (i = 0; i<tempn; ++i) 
		{	stack[i] = pbos[-i];
		}
		
	}
	
	// Save current continuation.
	int save() 
	{	long tos;	// top of stack
		if(!setjmp(registers)) 	// Save registers
		{	save_stack(pbos,&tos);	// Save stack
			next = gcont;
			gcont = this;
			return 0;
		} 
		else 
		{	return 1;
		}
	}
	
	void restore_stack(int once_more) 
	{	long padding[12];
		long tos;
		int i,tempn;
		// Make sure there's enough room on the stack
		if (pbos-n < &tos) 
		{	restore_stack(1);
		}
		if (once_more) 
		{	restore_stack(0);
		}
		
		tempn = n;	//Copy stack back out from continuation
		for (i = 0; i<n; ++i) {
			pbos[-i] = stack[i];
		}
		longjmp(registers,1);
	}
	
	void exec_context() 
	{	restore_stack(1);		//Restore stack
	}
	
	// Restore last continuation. Restores the context.
	void restore() 
	{	if(gcont) 
		{	continuation *old = gcont;
			gcont = old->next;
			old->exec_context();
		} 
		else 
		{	return; 	// fall through and contine with main code
		}
	}
};

void pain(int* n, continuation* one)
{	printf("FEEL the PAIN\n");
	*n+=1;
	one->restore();
}

int main() 
{	long bos;	// bottom of stack
	pbos = &bos;
	continuation one;
	int n=0;
	
	one.save();
	pain(&n, &one);
	
	
	printf("n = %d\n", n);
	
	getchar();
}
