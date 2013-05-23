/* 
-lSDLmain 
-lSDL 
-lsdl_net
*/
 
#include <stdio.h>
#include <stdlib.h>

#include "Network handling.h"

//enum {sdl,sdlnet,resolve,tcpopen};
void init();

int WINAPI WinMain(	HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow ) 
{	IPaddress server_ip, tempAdd;
	IPaddress* client_ip; 
	IPaddress* myip;
	TCPsocket server, client; 
	char message[100], connection[100]; 
	int len, n, err; 
	Uint16 port = 9999; 
	char temp;
	
	init();
	
	server=Listen(port);
	if(!server)
		errorFunc(listenerr);
	
	while(1)
	{	client=SDLNet_TCP_Accept(server);           //try to accept a connection 
	    if (client)
		{	client_ip=SDLNet_TCP_GetPeerAddress(client); 	// get the clients IP and port number        
			if(client_ip)
			{	ResolveToIP(connection,client_ip);
				printf("Accepted a connection from %s port %d\n\n", connection, client_ip->port); 
	            while(1)
	            {	printf("Send: ");
					for(n=0; (temp=getchar())!='\n'; n++)
	            	{	message[n]=temp;
					}
					message[n]=0;
	        		len=SDLNet_TCP_Send(client,message,n+1);   //send message to client 
		        	if(len < n+1) 
		        		printf("\t\t\tSDLNet_TCP_Send: %s\n", SDLNet_GetError()); 
		        		
		        	if(message[0]=='e' && message[1]=='n' && message[2]=='d' && message[3]==0)
						break;
					SDL_Delay(10);
				}
				SDLNet_TCP_Close(client); // close socket        
				printf("\n\n\t\tBye\n"); 
	        	break; 
	        } 
			else 
			{	printf("SDLNet_TCP_GetPeerAddress: %s\n",SDLNet_GetError()); 
	        } 
	    }
		SDL_Delay(10); 
	} 

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
