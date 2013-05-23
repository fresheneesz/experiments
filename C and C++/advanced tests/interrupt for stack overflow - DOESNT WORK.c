#include <signal.h>
#include <stdio.h>

volatile sig_atomic_t quit;

void signal_handler(int sig)
{	printf("WOOO\n");
    getchar();
}

void infinite(int* x)
{	*x=*x+2;
	infinite(x);
}

int main()
{	signal(SIGINT, signal_handler);
    signal(SIGTERM, signal_handler);
	signal(SIGSEGV, signal_handler);
    signal(SIGBREAK, signal_handler);

	int x=3;
	infinite(&x);

    while(!quit)
    {	char s[100];
    	scanf("%s",s);
    	printf("%s\n", s);
    }
    printf("quit = %d\n",quit);
    getchar();
}
