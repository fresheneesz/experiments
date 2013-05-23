/* This file was created by Billy Tetrud. Use of this file is free as long as it is credited.

 This may only be used on linux and systems witih compatible socket.h and netdb.h files. 
 I wrote this for a class which didn't let me use c++.. so its not really meant to be portable

 These are the defined functions:
	
TCPsocket listen(Uint16 port)
accept()
TCPsocket connect(char* hostname, Uint16 port)
	
*/


	#include <sys/socket.h>
	#include <netdb.h>
	#include <net/if.h>

	struct IPADD
	{	int host;            // 32-bit IPv4 host address 
   		int port;            // 16-bit protocol port 
	};
	
	typedef struct IPADD IPaddress;
	
	// initialize - returns 0 on success
	// returns 1 on SDL_Init failure
	// returns 2 on SDLNet_Init failure
	int netInit()
	{	return 0;	// do nothing, no need to initialize
	}
	
	void netQuit()
	{	// do nothing, no need to quit
	}

	typedef struct TCPSOCKET
 	{	int sock;
	} TCPsoc;
	
	void TCPsocConstruct(TCPsoc* a)
	{	a->sock = socket(PF_INET, SOCK_STREAM, 0);	// tcp socket
	}
	
	// Turns socket into a server and listens on the port
	// returns true on fail
	bool Listen(TCPsoc* a, int port)
	{	struct sockaddr_in my_addr;

		my_addr.sin_family = AF_INET;         // host byte order
		my_addr.sin_port = htons(port);     // short, network byte order
		my_addr.sin_addr.s_addr = INADDR_ANY;
		memset(my_addr.sin_zero, '\0', sizeof my_addr.sin_zero);

		bind(a->sock, (struct sockaddr *)&my_addr, sizeof(my_addr));
		
		if(listen(a->sock, -1))		// no idea, set "backlog" to infinity basically
		{	return true;	// fail
		}
		return false;
	}
	
	// Allows a server to accept a connection
	// even if connection returns non-NULL it might still not be connected
	// if that happens try testing if you can getPeerAdd
	bool Accept(TCPsoc* listener, TCPsoc* b)
	{	struct sockaddr_in cliaddr;
		socklen_t *addrlen;
		
		int len = sizeof(cliaddr);
		if(b->sock = accept(listener->sock, (struct sockaddr *)&cliaddr, &len))
		{	return true;	// fail
		}
		return false;
	}
	
	// connects to a server
	bool Connect(TCPsoc* a, char* hostname, int port)
	{	struct sockaddr_in serverAdd;   // will hold the destination addr

		serverAdd.sin_family = AF_INET;          // host byte order
	    serverAdd.sin_port = htons(port);   // short, network byte order
	    struct hostent* host = gethostbyname(hostname);		// get IPaddress of hostname
		serverAdd.sin_addr.s_addr = ((struct in_addr*)(host->h_addr_list)[0])->s_addr;	// set IPaddress in structure
	    memset(serverAdd.sin_zero, 0, sizeof(serverAdd.sin_zero));	// set last part of struct to 0 (might be optional?)
		
		if(connect(a->sock, (struct sockaddr *)&serverAdd, sizeof(serverAdd)))
			return true; // for error
		//else
		return false;
	}

	// gets the address of the peer this socket is connected to
	// returns true on failure
	bool getPeerAdd(TCPsoc* a, IPaddress* ip)
	{	struct sockaddr_in addr;
		
		int len = sizeof(addr);
		if(getpeername(a->sock, (struct sockaddr*)&addr, &len))
			return true;
		
		ip->host = addr.sin_addr.s_addr;
		ip->port = addr.sin_port;
		return false;
	}
	
	// receives len bytes of data into container
	// blocks until len bytes is received
	// returns number of bytes received
	// if 0 is returned, the socket was closed from the opposite side
	// if 0 or len isn't returned there was an error
	inline int Recv(TCPsoc* a, void* container, int len)
	{	return recv(a->sock, container, len, 0); 
	}	
	
	// attempts to send len bytes of data
	// returns number of bytes sent
	// if len isn't returned, there was an error or disconnect
	inline int Send(TCPsoc* a, void* data, int len)
	{	return send(a->sock, data, len, 0); 
	}
	
	inline void Close(TCPsoc* a)
	{	close(a->sock);
	}

	/*GAH
	{	if_nameindex()
		
		struct ifreq ifr; struct sockaddr_in saddr;
		fd=socket(PF_INET,SOCK_STREAM,*0);
		strcpy(ifr.ifr_name,"name of interface");
		ioctl(fd,SIOCGIFADDR,&ifr);
		saddr=*((struct sockaddr_in *)(&(ifr.ifr_addr))); /* is the address[/color]
	}
	*/
