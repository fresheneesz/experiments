/* 
-lSDLmain 
-lSDL 
-lsdl_net
*/

#include <stdio.h>
#include <stdlib.h>
#include <SDL/SDL_thread.h>


#include "KB handling.h"
#include "Network handling.h"

#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
#	include <windows.h>
#	define main_handle int WINAPI WinMain(	HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow ) 
#else
#	define main_handle int main()
#endif

int out=0;

void init();
int receiveMessages(void* sock);
char onTheTable[1000]="Send: ", onTheTable_len=0;

main_handle
{	IPaddress* client_ip;
	TCPsocket sock, server; 
	char message[1024], hostname[100];
	int len, result, err, out=0, n; 
	Uint16 port = 9999; 
	char temp;
	
	init();
	
	printf("1. Listen for client\n");
	printf("2. Connect to host\n");
	while(temp!='1' && temp!='2')
		temp = getchnec();
	if(temp=='1')
	{	server=Listen(port);
		printf("Listening...\n");
		if(!server)
			errorFunc(listenerr);
	
		while(1)
		{	sock=SDLNet_TCP_Accept(server);           //try to accept a connection
			if (sock)
			{	client_ip=SDLNet_TCP_GetPeerAddress(sock);	// get the clients IP and port number        
				if(client_ip)
				{	printf("Connected!\n\n");
					break;
				}
				else
				{	printf("SDLNet_TCP_GetPeerAddress: %s\n",SDLNet_GetError()); 
					SDL_Delay(100);
				}
			}
			
			SDL_Delay(10);
		}
	} 
	else if(temp=='2')
	{	printf("Type hostname: ");
		for(n=0; (temp = getchar())!='\n'; n++)
		{	hostname[n] = temp;
		}
		hostname[n]=0;
	
		sock = Connect(hostname,port);
		if(!sock)
			errorFunc(ConnectErr);
		printf("Connected!\n\n");
	} 
	else
	{	printf("PROBLEM!Press enter to exit.\n");
		getchar();
		exit(0);
	}
	

       // read the buffer from server 
    SDL_Thread* thread = SDL_CreateThread(receiveMessages, &sock);
    
	if ( thread == NULL )
	{	fprintf(stderr, "Unable to create thread: %s\n", SDL_GetError());
		out=1;
    }
    while(1)
    {	if(out)
			break;
			
		if(keyhit())
		{	printf("Send: ");
			onTheTable_len=6;
			for(n=0; (temp=getchec())!='\n'; n++)
	        {	message[n]=temp;
	        	onTheTable[6+n] = temp;
	        	onTheTable_len++;
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
	printf("Connection closed. Press enter to quit.\n");
	SDLNet_TCP_Close(sock);

	SDLNet_Quit(); 
	SDL_Quit(); 
	getchar();
}


void init()
{	if(!SDL_Init(0))
	{	if(SDLNet_Init()<0)
		{	errorFunc(sdlnet); 
		}
	}else 
	{	errorFunc(sdl); 
	}
}

int receiveMessages(void* socka)
{	int len;
	char message[1024];
	TCPsocket sock = *(TCPsocket*)(socka);
	
	while(1)
	{	len=SDLNet_TCP_Recv(sock, message, 1024); 
	
		if(len) 
		{	printf("\rReceiving: %s\n", message); 
			if(onTheTable_len)
			{	for(int n=0; n<onTheTable_len; n++)
					printf("%c",onTheTable[n]);
				onTheTable_len=false;
			}
		} else 
		{	printf("SDLNet_TCP_Recv: %s\n",SDLNet_GetError()); 
		} 
		if(message[0]=='e' && message[1]=='n' && message[2]=='d' && message[3]==0)
			out=1;
	}
}
