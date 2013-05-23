#include <stdio.h>
#include "networkHandling for C v080214.h"

int main(int argc, char* argv[])
{	
	TCPsoc theAllocatedSocket;
	TCPsoc *sock = &theAllocatedSocket;
	TCPsocConstruct(sock);
	
	// memory for use in sending and receiving messages
	char message[1000];	
	int len;
	int port=9999;

	TCPsoc shitphys;
	TCPsoc *shit = &shitphys;
	TCPsocConstruct(shit);
	
	printf("Listening on %d.\n",port);
	Listen(sock, port);
	//getchar();
	while(1)
	{	if(Accept(sock, shit))
			break;
	}

	len = Recv(shit, message,10);
	printf("%s\n", message);
	len = Recv(shit, message,9);
	printf("%s\n", message);
	
	Close(sock);
	
}
