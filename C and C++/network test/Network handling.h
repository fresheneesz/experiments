
#include <SDL/SDL.h>
#include <SDL/SDL_net.h>

TCPsocket Listen(Uint16 port)
{	IPaddress portHolder;
	TCPsocket portHolderSocket;
	
	if(SDLNet_ResolveHost(&portHolder,NULL,port))		// Resolve the string host, and fill in the IPaddress 
		return 0;
	portHolderSocket = SDLNet_TCP_Open(&portHolder); 		// open the tcp server socket 
	if(!portHolderSocket)
	{	return 0;
	} 
	return portHolderSocket;
}

TCPsocket Connect(char* hostname, Uint16 port)
{	TCPsocket sock;
	IPaddress ip;
	
	if(SDLNet_ResolveHost(&ip,hostname,port)<0)	// Resolve the argument into an IPaddress type 
	{	return 0;
	}
	sock=SDLNet_TCP_Open(&ip);  // open socket 

	return sock;
}




// turn URL or IPaddress into an integer address and set the port
// expects a non-constant address for output
int Resolve(IPaddress* output, char* host, Uint16 port)
{	if(host==NULL)
		return -1;
	//else
	return SDLNet_ResolveHost(output,host,port);
}

// turn integer address into a URL or IPaddress and set the port
// returns a pointer to a server_ip structure
void Resolve(char* output, IPaddress* address)
{	const char* a;
	a=SDLNet_ResolveIP(address);
	if(a==0)
	{	output[0]=0;
		return;
	}//else
	int n;
	for(n=0; a[n]!=0; n++)
	{	output[n] = a[n];
	}
	output[n]=0;
}


void ResolveToIP(char* output, IPaddress* address)
{	Uint32 ipaddr; 

	//ipaddr=SDL_SwapBE32(client_ip->host); 
	ipaddr=SDLNet_Read32(&(address->host));
	sprintf(output, "%d.%d.%d.%d", ipaddr>>24, (ipaddr>>16)&0xff, (ipaddr>>8)&0xff, ipaddr&0xff);
	//printf("Accepted a connection from %d.%d.%d.%d port %d\n", ipaddr>>24, (ipaddr>>16)&0xff, 
	//	(ipaddr>>8)&0xff, ipaddr&0xff, client_ipport); 
}


// Become a server and listen on the port
// expects a non-constant address for output
int HostListen(IPaddress* output, Uint16 port)
{	return SDLNet_ResolveHost(output,NULL,port);
}


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
