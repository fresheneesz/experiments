/* 
-lSDLmain 
-lSDL 
-lsdl_net
*/

#include <stdio.h>
#include <stdlib.h>
#include <SDL/SDL_thread.h>

#include "KBhandlingv080203.h"
#include "networkHandling v080218.h"
#include "theSSL080303.h"
#include "theStrings v080218.h"

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
RSAkey keys, pubkey;
char getchnrBlocking();

mainH
{	TCPsoc sock;
	
	RSAinit(5);
	netInit();
	bool options[3];
	for(int n=0; n<=2; n++) {
		options[n] = true;
	}
	
	char SLLtemp[2000];
	keys.generate(1024);
	printf("Your encryption keys have been generated.\n");
	printf("Your private key exponent is:\n %s\n", keys.hexD(SLLtemp));
	printf("Your public key exponent is: %s\n", keys.hexE(SLLtemp));
	printf("Your modulus is:\n %s\n\n", keys.hexN(SLLtemp));
	
	// menu
	/*while(1) {
		
		if(options[1]) printf("1. Listen for client\n");
		if(options[2]) printf("2. Connect to host\n");
		
		char option = getchnrBlocking();
		
		if(options[1] && option=='1') {
			listenForClient(sock);
			break;	
				
		} else if(options[2] && option=='2') {
			connectToHost(sock);
			break;	
		} 
	}*/
	
	initSock(sock);
	
    sendThread = SDL_CreateThread(sendMessages, &(sock));		// thread for sending messages
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

// gets option - spin waiting until its chosen
char getchnrBlocking() {
	char temp;
	while(temp!='1' && temp!='2')
		temp = gechnr();	
	return temp;	
}


//void initSock(TCPsocket& sock)
void initSock(TCPsoc& sock)
{	char temp;
	IPaddress* client_ip;
	//TCPsocket server; 
	TCPsoc server;
	int len, result, err, out=0, n; 
	Uint16 port = 9999; 
	char  hostname[100];
	char SLLtemp[2000];

	
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
			
			SDL_Delay(10);
		}
		
		int keyLens;
		sock.Recv((void*)&keyLens, sizeof(int));
		
		printf("What happened here? %d\n", keyLens);
		sock.Recv(SLLtemp, keyLens);
		
		printf("Nothin hapened? %s\n", SLLtemp);
		pubkey.setE(SLLtemp);
		sock.Recv((void*)&keyLens, sizeof(int));
		sock.Recv(SLLtemp, keyLens);
		pubkey.setN(SLLtemp);
		
		printf("Connected!\n");
		printf("The person you're messaging to has public key exponent:\n %s\n", pubkey.hexE(SLLtemp));
		printf("The person you're messaging to has modulus: %s\n", pubkey.hexN(SLLtemp));
		
		keyLens = Slen(keys.hexE(SLLtemp))+1;
		sock.Send((void*)&keyLens, sizeof(int));
		sock.Send(SLLtemp, keyLens);
		keyLens = Slen(keys.hexN(SLLtemp))+1;
		sock.Send((void*)&keyLens, sizeof(int));
		sock.Send(SLLtemp, keyLens);
		
		printf("\nConnected!\n");
		printf("The person you're messaging to has public key exponent:\n %s\n", pubkey.hexE(SLLtemp));
		printf("The person you're messaging to has modulus: %s\n", pubkey.hexN(SLLtemp));
		
		printf("\nStart typing messages!\n");
	} 
	else if(temp=='2')
	{	printf("Type hostname: ");
		for(n=0; (temp = getchar())!='\n'; n++)
		{	hostname[n] = temp;
		}
		hostname[n]=0;
	
		if(sock.Connect(hostname,port))
			errorFunc(ConnectErr);
		
		int keyLens;
		keyLens = Slen(keys.hexE(SLLtemp))+1;
		sock.Send((void*)&keyLens, sizeof(int));
		sock.Send(SLLtemp, keyLens);
		keyLens = Slen(keys.hexN(SLLtemp))+1;
		sock.Send((void*)&keyLens, sizeof(int));
		sock.Send(SLLtemp, keyLens);
		
		sock.Recv((void*)&keyLens, sizeof(int));
		sock.Recv(SLLtemp, keyLens);
		printf("WHAT THE HELLSZORES: %s\n", SLLtemp);
		pubkey.setE(SLLtemp);
		sock.Recv((void*)&keyLens, sizeof(int));
		sock.Recv(SLLtemp, keyLens);
		pubkey.setN(SLLtemp);
		
		printf("\nConnected!\n");
		printf("The person you're messaging to has public key exponent:\n %s\n", pubkey.hexE(SLLtemp));
		printf("The person you're messaging to has modulus: %s\n", pubkey.hexN(SLLtemp));
		
		printf("\nStart typing messages!\n");
	} 
	else
	{	printf("PROBLEM!Press enter to exit.\n");
		getchar();
		exit(0);
	}
	
}

int receiveMessages(void* socka)
{	int len;
	char message[1025], decMessage[200];
	TCPsoc sock = *(TCPsoc*)(socka);
	
	while(1)
	{	//len=SDLNet_TCP_Recv(sock, message, 1024); 
		len = sock.Recv(message,1024);
		//printf("len = %d\n", len);
		if(len>0) 
		{	for(int n=0; n<onTheTable_len; n++)
				printf("\b");
			for(int n=0; n<onTheTable_len; n++)
				printf(" ");	
			//printf("\rReceiving: %s\n", message); 
			if(onTheTable_len)
			{	for(int n=0; n<onTheTable_len; n++)
					printf("%c",onTheTable[n]);
				onTheTable_len=0;
			}
			
			/*printf("Press 1 to decrypt, 0 to leave as encrypted.\n");
			char temp=0;
			while(temp!='1' && temp!='2')
				temp = gechnr();
			*/
			//if(temp=='1') {
				keys.decPriv(message, len, decMessage);
				printf("\rMessage: %s\n", decMessage); 
				Scopy(message, decMessage);
			//}
			
		} else if(len==-1)
		{	out = 1;
			break;
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
{	int len, temp, n, encSize;
	char message[200], encMessage[1025];
	TCPsoc sock = *(TCPsoc*)(socka);
	
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
			
			encSize = pubkey.encPub(message, n+1, encMessage);
	        len=SDLNet_TCP_Send(sock.sock,encMessage,encSize);   //send message to client 
		    if(len < encSize) 
		    	printf("\t\t\tSDLNet_TCP_Send: %s\n", SDLNet_GetError()); 
		    
		    if(message[0]=='e' && message[1]=='n' && message[2]=='d' && message[3]==0)
		    	break;
		}
		SDL_Delay(10);
	}
	printf("Connection has been closed (by you). Press enter to quit.\n");
	SDL_KillThread(recvThread);
}
