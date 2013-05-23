/* This file was created by Billy Tetrud. Use of this file is free as long as it is credited.

 #define useWinSock  if you want to use winsock to make a shared library is not neccessary
 must use mainH (stands for main handle) instead of main()

 These are the defined objects:
		
	int netInit()
	void netQuit()
	IPaddress
	class TCPsoc
	{	bool Listen(Uint16 port)
		bool getPeerAdd(IPaddress& ip)
		inline bool Accept(TCPsoc& a)
		bool Connect(char* hostname, Uint16 port)
		inline int Recv(void* container, int len)
		inline int Send(void *data, int len)
		inline void Close()
		inline TCPsoc& operator =(TCPsoc& a)
		
	}

	class UDPsoc
	{	bool getPeerAdd(IPaddress& ip)
		bool Bind(char* hostname, int port)
		void BindRaw(IPaddress& addr)
		inline int Recv(void* container, int len, IPaddress& into)
		inline bool Send(void* data, int len)
		inline void Close()
		
	};	
*/

		/* 
	#if defined(useWinSock)
		Must use:
		
		// some windows library like wsock32.lib or winsock32.lib 
		*/
		/*
		#include <winsock.h>

		{
	    WSADATA wsaData;   // if this doesn't work
	    //WSAData wsaData; // then try this instead
	
	    if (WSAStartup(MAKEWORD(1, 1), &wsaData) != 0) {
	        fprintf(stderr, "WSAStartup failed.\n");
	        exit(1);
	    }
		//*/


#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
	/* 
	Must use:
	
-lSDL 
-lsdl_net
	*/
	
	#include <SDL/SDL_net.h>
	#include <windows.h>
	
	// main handle the translates
	#define mainH int WINAPI WinMain(	HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow ) \
	{	char* commandLine; \
		int argc; \
		char** argv;
		commandLine = GetCommandLine(void); \
		\
	}

#else	// linux and unix

	#include <sys/socket.h>
	#include <netdb.h>
	#include <net/if.h>
	#include <string.h>
	#include <unistd.h>
	
	#define mainH main(int argc, char** argv)
#endif
 		
// initialize - returns 0 on success
// returns 1 on SDL_Init failure
// returns 2 on SDLNet_Init failure
int netInit()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		if(!SDL_Init(0))
		{	if(SDLNet_Init()<0)
			{	return 2;
			}
		}else 
		{	return 1; 
		}
		return 0;
	#else	// nothing for linux
		return 0;
	#endif
}

// quits SDL and SDL_net
void netQuit()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		SDLNet_Quit(); 
		SDL_Quit();
	#else	// nothing for linux
	#endif
}

#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
	// already defined in SDL_net
#else
	typedef struct IPADD
	{	int host;            // 32-bit IPv4 host address 
		int port;            // 16-bit protocol port 
	} IPaddress;
#endif

// puts the first IP address associated with hostname into IP
void Resolve(IPaddress& IP, char* hostname)
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		SDLNet_ResolveHost(&IP,hostname,0);
	#else
		// get IPaddress of hostname
		struct hostent* host = gethostbyname(hostname);		
		// set IPaddress in structure
		IP.host = ((struct in_addr*)(host->h_addr_list)[0])->s_addr;	
	#endif
}

void getOwnIP(IPaddress& IP)
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		#warning SDL can't do getOwnIP god damnit
		exit(99);	//	heed the warning ^
	#else
		char name[256];
		gethostname(name, 256);
		struct hostent* host = gethostbyname(name);		
		IP.host = ((struct in_addr*)(host->h_addr_list)[0])->s_addr;
	#endif
}	

class TCPsoc
{public:
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		TCPsocket sock;
	#else
		int sock;
	#endif
	
	TCPsoc()
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			// nothing for SDL_net
		#else
			sock = socket(PF_INET, SOCK_STREAM, 0);
		#endif
	}
	
	// gets the address of the peer this socket is connected to
	// returns true on failure
	bool getPeerAdd(IPaddress& ip)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			IPaddress* temp;
			temp = SDLNet_TCP_GetPeerAddress(sock);	// not sure what kind of memory this returns
			if(temp==NULL)
				return true;
			ip.host = temp->host;
			ip.port = temp->port;
			return false;
		#else
			struct sockaddr_in addr;
			
			int len = sizeof(addr);
			if(getpeername(sock, (struct sockaddr*)&addr, &len))
				return true;
			
			ip.host = addr.sin_addr.s_addr;
			ip.port = addr.sin_port;
			return false;
		#endif
	}
	
	// Turns socket into a server and listens on the port
	// returns true if it failed
	bool Listen(int port)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			IPaddress portHolder;
			TCPsocket portHolderSocket;
			
			if(SDLNet_ResolveHost(&portHolder,NULL,port))		// Resolve the string host, and fill in the IPaddress 
			{	sock=0;
				return true;	// fail.
			}
			portHolderSocket = SDLNet_TCP_Open(&portHolder); 		// open the tcp server socket 
			if(!portHolderSocket)
			{	sock=0;
				return true;	// fail.
			} 
			sock = portHolderSocket;
			return false;	// no fail
		#else
			struct sockaddr_in my_addr;

			my_addr.sin_family = AF_INET;         // host byte order
			my_addr.sin_port = htons(port);     // short, network byte order
			my_addr.sin_addr.s_addr = htons(INADDR_ANY);
			memset(&(my_addr.sin_zero), '\0', sizeof(my_addr.sin_zero));
	
			if(-1 == bind(sock, (struct sockaddr *)&my_addr, sizeof(my_addr)))
				return true;
			
			if(-1 == listen(sock, 128))		// set "backlog" to 128
			{	return true;	// fail
			}
			return false;
		#endif
	}	
	
		
	// Allows a server to accept a connection - non-blocking
	// even if connection returns non-NULL it might still not be connected
	// if that happens try testing if you can getPeerAdd
	// returns *true* on accept
	bool AcceptNB(TCPsoc& contacter)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			contacter.sock = SDLNet_TCP_Accept(sock);		//try to accept a connection
			if(contacter.sock == NULL)
				return false;
			else
				return true;
		#else
			struct sockaddr_in cliaddr;
			socklen_t *addrlen;
			
			int len = sizeof(cliaddr);
			if(-1==(contacter.sock = accept(sock, (struct sockaddr *)&cliaddr, &len)))
			{	return false;	// no accept
			}
			return true;	// AHHH MAYBE I SHOUDLNT DO THIS!! or maybe i should that just made things work....
		#endif
	}
	
	// Allows a server to accept a connection - blocking
	// even if connection returns non-NULL it might still not be connected
	// if that happens try testing if you can getPeerAdd
	// returns *true* on accept
	bool Accept(TCPsoc& contacter)
	{	while(!AcceptNB(contacter))
		{	
			#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
				SDL_Delay(25);
			#else
				usleep(25);
			#endif
		}
		return true;
	}
	
	// Allows a server to accept a connection - blocking with time out
	// even if connection returns non-NULL it might still not be connected
	// if that happens try testing if you can getPeerAdd
	// returns *true* on accept, false on timeout
	bool AcceptTO(TCPsoc& contacter, int timeoutInMicroseconds)
	{	while(!AcceptNB(contacter))
		{	if(timeoutInMicroseconds==0)
			{	return false;
			}
			#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
				SDL_Delay(25);
			#else
				usleep(25);
			#endif
			timeoutInMicroseconds--;
		}
		return true;
	}
	
	// connects to a server
	// returns true on error
	bool Connect(char* hostname, int port)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			IPaddress ip;
			if(SDLNet_ResolveHost(&ip,hostname,port)<0)	// Resolve the argument into an IPaddress type 
			{	return true;
			}
			sock=SDLNet_TCP_Open(&ip);  // open socket 
			if(sock==NULL)
				return true;
			//else
			return false;
		#else
			struct sockaddr_in serverAdd;   // will hold the destination addr

			serverAdd.sin_family = AF_INET;          // host byte order
		    serverAdd.sin_port = htons(port);   // short, network byte order
		    struct hostent* host = gethostbyname(hostname);		// get IPaddress of hostname
			if(host==0)
			{	return true;	// error
			}
			serverAdd.sin_addr.s_addr = ((struct in_addr*)(host->h_addr_list)[0])->s_addr;	// set IPaddress in structure
		    memset(&(serverAdd.sin_zero), 0, sizeof(serverAdd.sin_zero));	// set last part of struct to 0 (might be optional?)
	
			if(connect(sock, (struct sockaddr *)&serverAdd, sizeof(serverAdd)))
				return true; // for error
			//else
			return false;
		#endif
	}
	
	// receives len bytes of data into container
	// blocks until len bytes is received
	// returns number of bytes received
	// if 0 is returned, the socket was closed from the opposite side
	// if 0 or len isn't returned there was an error
	inline int Recv(void* container, int len)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			return SDLNet_TCP_Recv(sock, container, len);
		#else
			return recv(sock, container, len, 0); 
		#endif
	}

	// attempts to send len bytes of data
	// returns number of bytes sent
	inline int Send(void *data, int len)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			return SDLNet_TCP_Send(sock, data, len);
		#else
			return send(sock, data, len, 0); 
		#endif
	}
	
	inline void Close()
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			SDLNet_TCP_Close(sock);
		#else
			close(sock);
		#endif
	}
	
	inline TCPsoc& operator =(TCPsoc& a)
	{	sock = a.sock;
	}
	
	// gets num characters from socket and puts them in 'a'
	// returns number actually received 
	int RecvNum(char* container, int num)
	{	int n, test;
		for(n=0; n<num; n++)
		{	test = Recv(&(container[n]), 1);
			if(test==-1 || test==0)
			{	container[n]=0;
				return test;
			}
		}
		container[n]=0;
		return n;
	}
	
	// gets chacters until a certain one
	// returns 0 if successful before connection closed, -1 for error, and positive integer if successful and connection still open
	int RecvEnd(char* container, char end, int maxN)
	{	int n, test;
		for(n=0; n<maxN; n++)
		{	test = Recv(&(container[n]), 1);
			if(test==-1 || test==0)
			{	container[n]=0;
				return test;
			}
			if(container[n]==end)
			{	container[n+1] = 0;
				return n+1;
			}
		}
		container[n]=0;
		return n;
	}
	
	// not meant to be used publically
	// this function was jacked from BillysStrings....h
	bool isIn_forNetworkHandling(char a, char* ins)
	{	int m;
		for(m=0; ins[m]!=0; m++)
		{	if(a==ins[m])
			{	return true;
			}
		}
		return false;
	}
	
	// gets chacters until reaching one of a number of characters
	// returns the number of characters gotten
	int RecvEnds(char* container, char* ends)
	{	int n, test;
		for(n=0; 1; n++)
		{	test = Recv(&(container[n]), 1);
			if(test==-1 || isIn_forNetworkHandling(container[n], ends))
				break;
		}
		container[n]=0;
		return n;
	}
	
};


class UDPsoc
{public:
	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		UDPsocket sock;
		UDPpacket packIn, packOut;
	#else
		int sock;
		struct sockaddr_in dest;
	#endif

	UDPsoc()
	{
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			// nothing needs to happen
		#else
			sock = socket(PF_INET, SOCK_DGRAM, 0);
			dest.sin_family = AF_INET;				// host byte order
			memset(&(dest.sin_zero), 0, sizeof(dest.sin_zero));	// set last part of struct to 0 (might be optional?)
		#endif
	}

	// gets the address of the peer this socket is connected to
	// returns true on failure
	bool getPeerAdd(IPaddress& ip)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			IPaddress* temp;
			temp = SDLNet_UDP_GetPeerAddress(sock, -1);	// not sure what kind of memory this returns
			if(temp==NULL)
				return true;
			ip.host = temp->host;
			ip.port = temp->port;
			return false;
		#else
			struct sockaddr_in addr;
			
			int len = sizeof(addr);
			if(getpeername(sock, (struct sockaddr*)&addr, &len))
				return true;
			
			ip.host = addr.sin_addr.s_addr;
			ip.port = addr.sin_port;
			return false;
		#endif
	}

	// Opens on a UDP port
	// Opening on port 0 will open an unused port
	// returns true on failure
	bool Open(int port)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			sock = SDLNet_UDP_Open(port);
			if(sock==NULL)
				return true;
		#else
			struct sockaddr_in my_addr;
	
			my_addr.sin_family = AF_INET;         // host byte order
			my_addr.sin_port = htons(port);     // short, network byte order
			my_addr.sin_addr.s_addr = htons(INADDR_ANY);
			memset(&(my_addr.sin_zero), '\0', sizeof(my_addr.sin_zero));
	
			if(-1 == bind(sock, (struct sockaddr *)&my_addr, sizeof(my_addr)))
				return true;
		#endif
		
		return false;
	}

	// binds a UDPsoc to its destination
	// returns true on failure
	bool Bind(char* hostname, int port)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			if(SDLNet_ResolveHost(&(packOut.address), hostname, port) != 0)
				return true;	
		#else
			dest.sin_port = htons(port);   // short, network byte order
			struct hostent* host = gethostbyname(hostname);		// get IPaddress of hostname
			if(host == 0)
				return true;
			dest.sin_addr.s_addr = ((struct in_addr*)(host->h_addr_list)[0])->s_addr;	// set IPaddress in structure
		#endif
		
		return false;
	}
	
	// binds a UDPsoc to its destination
	// void because this can't fail
	void Bind(IPaddress& addr)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			packOut.address.host = addr.host;
			packOut.address.port = addr.port;
		#else
			dest.sin_port = addr.port;
			dest.sin_addr.s_addr = addr.host;
		#endif
	}
	
	// receives len bytes of data into container
	// blocks until packet is received
	// returns number of bytes received, 0 on error
	inline int Recv(void* container, int len, IPaddress& into)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			packIn.data = (Uint8*)container;
			int ready;
			while(1)
			{	ready = SDLNet_UDP_Recv(sock, &packIn);
				if(ready!=0)
					break;
				SDL_Delay(10);
			}

			if(ready==-1)
				return 0;
			if((&into)!=0)
			{	into.host = packIn.address.host;
				into.port = packIn.address.port;
			}
			
			return packIn.len;
		#else
			struct sockaddr_in addr;
			
			int fromLen = sizeof(addr);
			int bytes;
			bytes = recvfrom(sock, container, len, 0, (struct sockaddr*)&addr, &fromLen); 
			
			if(into!=0)
			{	into->host = addr.sin_addr.s_addr;
				into->port = addr.sin_port; 
			}
			
			return bytes;
		#endif
	}	
	
	// receives len bytes of data into container
	// blocks until packet is received
	// returns number of bytes received, 0 on error
	inline int Recv(void* container, int len)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			packIn.data = (Uint8*)container;
			int ready;
			while(1)
			{	ready = SDLNet_UDP_Recv(sock, &packIn);
				if(ready!=0)
					break;
				SDL_Delay(10);
			}

			if(ready==-1)
				return 0;
			
			return packIn.len;
		#else
			struct sockaddr_in addr;
			
			int fromLen = sizeof(addr);
			int bytes;
			bytes = recvfrom(sock, container, len, 0, (struct sockaddr*)&addr, &fromLen); 
			
			return bytes;
		#endif
	}
	
	// attempts to send len bytes of data
	// returns true on failure
	inline bool Send(const void* data, int len)
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			packOut.data = (Uint8*)data;
			packOut.len = len;
			packOut.maxlen = len;
			
			if(SDLNet_UDP_Send(sock, -1, &packOut) == 0)
			{	return true;
			}
		#else
			if(sendto(sock, data, len, 0, (struct sockaddr*)&(dest), sizeof(dest)) == -1)
				return true;
		#endif
		return false; // no error
	}
	
	inline void Close()
	{	
		#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
			SDLNet_UDP_Close(sock);
		#else
			close(sock);
		#endif
	}
	
};
