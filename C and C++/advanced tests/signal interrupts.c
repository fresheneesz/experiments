#include <stdio.h>
#include <signal.h>
#include <stdlib.h>


void sigproc(int a)
{	signal(SIGINT, sigproc); /*  */
	/* NOTE some versions of UNIX will reset signal to default
	after each call. So for portability reset signal each time */

	printf("Received SIGINT. You have pressed ctrl-c. The function input is: %d\n", a);
}

void quitproc(int a)
{	printf("Received SIGQUIT, meaning ctrl-\\ was pressed. Quitting. The function input is: %d\n", a);
	exit(0); /* normal exit status */
}

void DBZproc(int a)
{	printf("You got a floating point exception! Congratulations! The function input is: %d\n", a);
	getchar();
}

void SEGFproc(int a)
{	printf("You Seg Faulted! Congratulations! The function input is: %d\n", a);
	getchar();
}

main()
{	signal(SIGINT, sigproc);
	//signal(SIGQUIT, quitproc);
	signal(SIGFPE, DBZproc);
	signal(SIGSEGV, SEGFproc);
	printf("ctrl-c disabled use ctrl- to quit\n");
	//char f[10];
	//int n=0;
	//f[1234534]=90;
	float f= 34/0;
	for(;;); /* infinite loop */
}
