/* 
-lSDLmain 
-lSDL 
-lsdl_net
*/

#include <stdio.h>
#include <stdlib.h>
#include <SDL/SDL_thread.h>


#include "KBhandlingv071112.h"
#include "networkHandling v080304.h"


int out=0;

int receiveMessages(void* sock);
int sendMessages(void* socka);
void initSock(UDPsoc& sock);
char onTheTable[1000]="Send: ", onTheTable_len=0;
SDL_Thread* sendThread, * recvThread;

mainH
{	UDPsoc sock;
	
	netInit();
	initSock(sock);
	
    sendThread = SDL_CreateThread(sendMessages, &sock);		// thread for sending messages
    recvThread = SDL_CreateThread(receiveMessages, &sock);	// thread for receiving and printing messages
    
    SDL_WaitThread(sendThread, 0);
    SDL_WaitThread(recvThread, 0);
    
	if ( recvThread == NULL || sendThread == NULL )
	{	fprintf(stderr, "Unable to create one of the threads: %s\n", SDL_GetError());
    }
    
	sock.Close();
	netQuit();
	
	getchar();
}

void initSock(UDPsoc& sock)
{	char temp;
	IPaddress clientIP;
	Uint16 port = 9999; 
	char  hostname[100];
	
	printf("1. Listen for client\n");
	printf("2. Connect to host\n");
	while(temp!='1' && temp!='2')
		temp = gechnr();
	if(temp=='1')
	{	printf("Listening...\n");
		sock.Open(port);
		// message can be anything (expected to be nothing) and is not displayed.
		char message[10];
		sock.Recv(message, 10, clientIP);	
		sock.Bind(clientIP);
	} 
	else if(temp=='2')
	{	printf("Type hostname: ");
		int n;
		for(n=0; (temp = getchar())!='\n'; n++)
		{	hostname[n] = temp;
		}
		hostname[n]=0;
		
		sock.Open(0);
		sock.Bind(hostname,port);
			
		sock.Send("a", 1);

	} 
	else
	{	printf("PROBLEM!Press enter to exit.\n");
		getchar();
		exit(0);
	}
	
}

int receiveMessages(void* socka)
{	int len;
	char message[1024];
	UDPsoc sock = *(UDPsoc*)(socka);
	
	while(1)
	{	len=sock.Recv(message, 1024); 
		if(len) 
		{	for(int n=0; n<onTheTable_len; n++)
				printf("\b");
			for(int n=0; n<onTheTable_len; n++)
				printf(" ");	
			printf("\rReceiving: %s\n", message); 
			if(onTheTable_len)
			{	for(int n=0; n<onTheTable_len; n++)
					printf("%c",onTheTable[n]);
				onTheTable_len=0;
			}
		} else 
		{	printf("AIR OR\n"); 
		} 
		if(message[0]=='e' && message[1]=='n' && message[2]=='d' && message[3]==0)
		{	out=1;
			break;
		}
	}
	printf("\tConnection has been closed from the other side. Press enter to quit.\n");
	SDL_KillThread(sendThread);
}

int sendMessages(void* socka)
{	int len, temp, n;
	char message[1024];
	UDPsoc sock = *(UDPsoc*)(socka);
	
	while(1)
    {	if(khit())
		{	printf("Send: ");
			onTheTable_len=6;
			for(n=0; (temp=gech())!='\n'; n++)
	        {	if(temp == '\b')
				{	n-=2;
					onTheTable_len--;
				}
				else
				{	message[n]=temp;
		        	onTheTable[6+n] = temp;
		        	onTheTable_len++;
				}
			}
			message[n]=0;			
			onTheTable_len=0;
			
	        //send message to client 
		    if(sock.Send(message,n+1)) 
		    	printf("\t\tEr ur\n"); 
		    
		    if(message[0]=='e' && message[1]=='n' && message[2]=='d' && message[3]==0)
		    	break;
		}
		SDL_Delay(10);
	}
	printf("Connection has been closed (by you). Press enter to quit.\n");
	SDL_KillThread(recvThread);
}
