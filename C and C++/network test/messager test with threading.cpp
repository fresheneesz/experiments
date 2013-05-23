/* 
-lSDLmain 
-lSDL 
-lsdl_net
*/



#include <stdio.h>
#include <stdlib.h>
#include <SDL/SDL_thread.h>

#include "KBhandlingv071112.h"
#include "networkHandling v071112.h"

enum {sdl,sdlnet,resolve,tcpopen, listenerr, ConnectErr};
void errorFunc(int switcher)
{	switch(switcher)
	{ case sdl:
		printf("SDL_Init: %s\n",SDL_GetError()); 
		getchar();
		exit(0); 
		break;
	  case sdlnet:
		printf("SDLNet_Init: %s\n",SDLNet_GetError()); 
		getchar(); exit(0);  
		break;
	  case resolve:
		printf("SDLNet_ResolveHost: %s\n",SDLNet_GetError()); 
		getchar();
		exit(0); 
		break;
	  case tcpopen:
		printf("SDLNet_TCP_Open: %s\n",SDLNet_GetError()); 
		getchar(); exit(0); 
		break;
	  case listenerr:
		printf("Listening Failed. Period.\n");
		getchar(); exit(0); 
		break;
	  case ConnectErr:
	  	printf("Connecting Failed. Period.\n");
		getchar(); exit(0); 
		break;
	  default:
		printf("This should not have happened - probably means something failed tho: %s.\n", SDLNet_GetError());
		getchar(); exit(0); 
		break;
	}
}

/*
#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
#	include <windows.h>
#	define main_handle int WINAPI WinMain(	HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow ) 
#else
#	define main_handle int main()
#endif
*/

int out=0;

//void netInit();
int receiveMessages(void* sock);
int sendMessages(void* socka);
void initSock(TCPsoc& sock);
char onTheTable[1000]="Send: ", onTheTable_len=0;
SDL_Thread* sendThread, * recvThread;

mainH
{	//TCPsocket sock;
	TCPsoc sock;
	
	netInit();
	initSock(sock);
	
    sendThread = SDL_CreateThread(sendMessages, &(sock.sock));		// thread for sending messages
    recvThread = SDL_CreateThread(receiveMessages, &sock);	// thread for receiving and printing messages
    
    SDL_WaitThread(sendThread, 0);
    SDL_WaitThread(recvThread, 0);
    
	if ( recvThread == NULL || sendThread == NULL )
	{	fprintf(stderr, "Unable to create one of the threads: %s\n", SDL_GetError());
    }
    
	SDLNet_TCP_Close(sock.sock);

	SDLNet_Quit(); 
	SDL_Quit(); 
	getchar();
}


/*
void init()
{	if(!SDL_Init(0))
	{	if(SDLNet_Init()<0)
		{	errorFunc(sdlnet); 
		}
	}else 
	{	errorFunc(sdl); 
	}
}
//*/

//void initSock(TCPsocket& sock)
void initSock(TCPsoc& sock)
{	char temp;
	IPaddress* client_ip;
	//TCPsocket server; 
	TCPsoc server;
	int len, result, err, out=0, n; 
	Uint16 port = 9999; 
	char  hostname[100];
	
	printf("1. Listen for client\n");
	printf("2. Connect to host\n");
	while(temp!='1' && temp!='2')
		temp = gechnr();
	if(temp=='1')
	{	//server=Listen(port);
		if(server.Listen(port))
			errorFunc(listenerr);
		printf("Listening...\n");
	
		while(1)
		{	if(server.Accept(sock))
				break;
			/*sock.sock = SDLNet_TCP_Accept(server.sock);           //try to accept a connection
			if (sock.sock)
			{	client_ip=SDLNet_TCP_GetPeerAddress(sock.sock);	// get the clients IP and port number        
				if(client_ip)
				{	printf("Connected!\n\n");
					break;
				}
				else
				{	printf("SDLNet_TCP_GetPeerAddress: %s\n",SDLNet_GetError()); 
					SDL_Delay(100);
				}
			}
			*/
			
			SDL_Delay(10);
		}
	} 
	else if(temp=='2')
	{	printf("Type hostname: ");
		for(n=0; (temp = getchar())!='\n'; n++)
		{	hostname[n] = temp;
		}
		hostname[n]=0;
	
		if(sock.Connect(hostname,port))
			errorFunc(ConnectErr);
		printf("Connected!\n\n");
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
	TCPsoc sock = *(TCPsoc*)(socka);
	
	while(1)
	{	//len=SDLNet_TCP_Recv(sock, message, 1024); 
		len = sock.Recv(message,1024);
	
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
		{	printf("SDLNet_TCP_Recv: %s\n",SDLNet_GetError()); 
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
	TCPsocket sock = *(TCPsocket*)(socka);
	
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
			
	        len=SDLNet_TCP_Send(sock,message,n+1);   //send message to client 
		    if(len < n+1) 
		    	printf("\t\t\tSDLNet_TCP_Send: %s\n", SDLNet_GetError()); 
		    
		    if(message[0]=='e' && message[1]=='n' && message[2]=='d' && message[3]==0)
		    	break;
		}
		SDL_Delay(10);
	}
	printf("Connection has been closed (by you). Press enter to quit.\n");
	SDL_KillThread(recvThread);
}
