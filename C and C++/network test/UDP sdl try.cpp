#include <stdio.h>
#include <stdlib.h>
#include "KBhandlingv071112.h"
#include "theStrings v071225.h"
 
#include <SDL/SDL_net.h>

#include <windows.h>
int WINAPI WinMain(	HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow ) 
{	int port=9999;
	
	if(gechn() == 'l')	// listen
	{
	
		UDPsocket sd;       /* Socket descriptor */
		UDPpacket p;
	
		SDLNet_Init();
	 
		if (!(sd = SDLNet_UDP_Open(port)))		/* Open a socket on a port */
		{	printf("SDLNet_UDP_Open: %s\n", SDLNet_GetError());
		}
		printf("Listening on port %d\n", port);
		char moo[512];
		p.data = (Uint8*)moo;// Make space for the packet
	 
	 	int quit=0;
		while (!quit)
		{	/* Wait a packet. UDP_Recv returns != 0 if a packet is coming */
			if (SDLNet_UDP_Recv(sd, &p))
			{	printf("UDP Packet incoming\n");
				printf("\tChan:    %d\n", p.channel);
				printf("\tData:    %s\n", (char *)p.data);
				printf("\tLen:     %d\n", p.len);
				printf("\tMaxlen:  %d\n", p.maxlen);
				printf("\tStatus:  %d\n", p.status);
				printf("\tAddress: %x %x\n", p.address.host, p.address.port);
	 
				/* Quit if packet contains "quit" */
				if(SEQ((char *)p.data, "quit\n"))
					quit = 1;
			}		
			SDL_Delay(10);
		}
	 
		/* Clean and exit */
		//SDLNet_FreePacket(p);
		SDLNet_Quit();
		getchar();
		return EXIT_SUCCESS;
	}
	else 
	{
		UDPsocket sd;
		IPaddress srvadd;
		UDPpacket p;
		
		char host[]="localhost";
	 
		SDLNet_Init();
		
		if (!(sd = SDLNet_UDP_Open(0)))	// Open a socket on random port
		{	printf("SDLNet_UDP_Open: %s\n", SDLNet_GetError());
		}
	 
		if (SDLNet_ResolveHost(&srvadd, host, port))	// Resolve server name  
		{	printf("SDLNet_ResolveHost(%s %d): %s\n", host, port, SDLNet_GetError());
		}
		char moo[512];
		p.data = (Uint8*)moo;
	 
		int quit=0;
		while (!quit)
		{	printf("Fill the buffer\n>");
			gechars((char *)p.data, "\n");
			
			p.address.host = srvadd.host;	/* Set the destination host */
			p.address.port = srvadd.port;	/* And destination port */
	 
			p.len = strlen((char *)p.data) + 1;
			SDLNet_UDP_Send(sd, -1, &p); /* This sets the p->channel */
	 
			/* Quit if packet contains "quit" */
			if (SEQ((char *)p.data, "quit\n"))
				quit = 1;
				
		}
		
		SDLNet_Quit();
		return EXIT_SUCCESS;
	}
}
