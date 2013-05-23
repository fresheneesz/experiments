#include <stdio.h>
#include "networkHandling for C v080214.h"

int main(int argc, char* argv[])
{	
	TCPsoc theAllocatedSocket;
	TCPsoc *sock = &theAllocatedSocket;
	TCPsocConstruct(sock);
	
	// memory for use in sending and receiving messages
	char message[1000]="FISKALOOA";
	int len;
	int port=9999;
	char* hostname=argv[1];

	Connect(sock, hostname, port);
	
	Send(sock, message,10);
	Send(sock, "wtf liew",9);
	
	Close(sock);
	
}
