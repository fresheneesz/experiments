// because this is c...
typedef int bool;
#define false 0
#define true 1

#include "Network handling for c linux v071103.h"
//#include "BillysStrings for C v071022.h"
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <sys/socket.h>
	#include <netdb.h>
	#include <net/if.h>

int main(int argc, char* argv[])
{		// This block of code declares and initializes sockets
		// pointers are used to look pretier (no &sock junk)
	// delcares:
	// server, sock
	UDPsoc theAllocatedSocket;
	UDPsoc *sock;
	sock = &theAllocatedSocket;
	UDPsocConstruct(sock);
	
	// memory for use in sending and receiving messages
	char message[1000];	
	int len;
	int port=9999;

	printf("Listening on %d.\n",port);
	UDPListen(sock, port);

	//printf("CONNECTED\n");
	len = RecvUDP(sock, message,10);
	printf("%s\n", message);
	len = RecvUDP(sock, message,9);
	printf("%s\n", message);
	
	CloseUDP(sock);
	
}
