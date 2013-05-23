#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <signal.h>
#include <fcntl.h>

int gotdata=0;
void sighandler(int signo)
{
    if (signo!=SIGIO)
        gotdata++;
    return;
}

char buffer[4096];

int main(int argc, char **argv)
{	
	int boom, n=0;
    int count;
    struct sigaction action;

    memset(&action, 0, sizeof(action));
    action.sa_handler = sighandler;
    action.sa_flags = 0;

    sigaction(SIGIO, &action, NULL);

    fcntl(STDIN_FILENO, F_SETOWN, getpid());
    fcntl(STDIN_FILENO, F_SETFL, fcntl(STDIN_FILENO, F_GETFL) | FASYNC);

    while(1) 
	{	printf("Gotdata: %d\n", gotdata); 
		sleep(1);
    }
}
