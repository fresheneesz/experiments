#include <iostream.h>
#include <signal.h>
#include <setjmp.h>

void sigsegv(int);
jmp_buf g_env;

main()
{ 	int  a=5, b=422;
	void* ptr = &&J1;
	void* ptr2 = &&J5;
	
	//	(*signal(int sig, void (*func)()))()     int (*)()  to void(*)(int)
//	signal(SIGSEGV, (*)sigsegv);
	//signal()
	
	if(signal(SIGSEGV, *sigsegv) == SIG_ERR)
	{	cout << "um whats up bevis";
		getchar();
	}
	else 
	{	cout << "nothing happened bevis";
		getchar();
		
	}
	int i = setjmp(g_env);
		
J5:	a+3;	
	
J1:	cout << "\nhi " << a+4;
	getchar();

	*((int*)ptr) = *((int*)ptr2) ;

	goto *ptr;
	

}
	
void sigsegv(int a)
{ 		 signal(SIGSEGV, *sigsegv); /*  */
		 /* NOTE some versions of UNIX will reset signal to default
		 after each call. So for portability reset signal each time */
 
		 cout << "What happend?";
		 getchar();
		 longjmp(g_env,1);
}
