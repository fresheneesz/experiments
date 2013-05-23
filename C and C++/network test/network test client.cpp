/* 
-lSDLmain 
-lSDL 
-lsdl_net
*/

#include <stdio.h>
#include <stdlib.h>

#include "KB handling.h"
#include "Network handling.h"

#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
#	include <windows.h>
#	define main_handle int WINAPI WinMain(	HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow ) 
#else
#	define main_handle int main()
#endif

void init();

main_handle
{	IPaddress* client_ip;
	TCPsocket sock, server; 
	char message[1024], hostname[100];
	int len, result, err, out=0, n; 
	Uint16 port = 9999; 
	char temp;
	//float SorR = 45.23;
	
	//printf("size: %d\n", sizeof(float));
	
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
		//for(n=0; (temp = getchar())!='\n'; n++)
		//{	hostname[n] = temp;
		//}
		//hostname[n]=0;
	
		sock = Connect("localhost",port);
		if(!sock)
			errorFunc(ConnectErr);
		printf("Connected!\n\n");
	} 
	else
	{	printf("PROBLEM!Press enter to exit.\n");
		getchar();
		exit(0);
	}
	
	float temp1=5.34234, temp2=3.34358, temp3 = 35834.28932, tempin;
	//printf("5.34234: %d, %d, %d, %d\n", ((char*)&temp1)[0], ((char*)&temp1)[1], ((char*)&temp1)[2], ((char*)&temp1)[3]);
       // read the buffer from server 
    while(1)
    {	SDLNet_TCP_Send(sock,"",1);
		for(int f=0; f<10; f++)
		{	//len=SDLNet_TCP_Recv(sock, message, 1024); 
			len=SDLNet_TCP_Recv(sock, &tempin, sizeof(float)); 
			if(((char*)&tempin)[0]==0)
				break;
			
			//printf("IN: %d, %d, %d, %d\n", message[0], message[1], message[2], message[3]);
			
			//((char*)&tempin)[0]=message[0];
			//((char*)&tempin)[1]=message[1];
			//((char*)&tempin)[2]=message[2];
			//((char*)&tempin)[3]=message[3];
			
			//if(len) 
			//{	printf("Receiving: %.*s\n",len, message); 
			//} 
			if(len == sizeof(float))
			{	printf("Receiving: %f\n", tempin);
			}
			else 
			{	printf("SDLNet_TCP_Recv: %s\n",SDLNet_GetError()); 
			} 
			if(message[0]=='e' && message[1]=='n' && message[2]=='d' && message[3]==0)
				out=1;
		}

		if(out)
			break;
			
		if(keyhit())
		{	//printf("Send: ");
			//for(n=0; (temp=getchar())!='\n'; n++)
	        //{	message[n]=temp;
			//}
			//message[n]=0;
	        //len=SDLNet_TCP_Send(sock,message,n+1);   //send message to client 
	        message[0]=getch();
	        
			if(message[0] == '1')
				len=SDLNet_TCP_Send(sock,&temp1,sizeof(float));   //send message to client 
			else if(message[0] == '2')
				len=SDLNet_TCP_Send(sock,&temp2,sizeof(float));   //send message to client 
			else if(message[0] == '3')
				len=SDLNet_TCP_Send(sock,&temp3,sizeof(float));   //send message to client 
		    
			if(len < sizeof(float)) 
		    	printf("\t\t\tSDLNet_TCP_Send: %s\n", SDLNet_GetError()); 
		        		
		    if(message[0]=='e' && message[1]=='n' && message[2]=='d' && message[3]==0)
		    	break;
		}
		SDL_Delay(1);
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
