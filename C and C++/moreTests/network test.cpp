#include "networkHandling v080218.h"
#include "KBhandlingv080203.h"
#include "theStrings v080218.h"

mainH
{	int port = 9999;
	
	netInit();
	
	printf("Options:\n\tU. UDP\n\tT.TCP\n");
	if(gechn() == 'u')
	{	printf("UDP Options:\n\tL. listen\n\tC. connect\n");
		if(gechn() == 'l')	// listen
		{	UDPsoc server;
		
			if(server.Open(port))
				printf("couldn't open port\n");
			printf("Listening....\n");
			
			char message[100];
	
			IPaddress client;
			server.Recv(message, 100, client);
			printf("\tData:    %s\n", message);
			server.Bind(client);
			Scopy(message, "Boo");
			server.Send(message, 4);
		 	server.Close();
		}
		else	// connect
		{	UDPsoc sock;
		
			if(sock.Open(0))
				printf("couldn't open any port!? wtf!?\n");
				
			char hostname[50];
			printf("Type host name: ");
			gechars(hostname, '\n');
			sock.Bind(hostname, port);
			
			char message[100];
			Scopy(message, "HEyo");
			printf("Sending... on port %d\n", port);
			sock.Send(message, 5);
			if(0==sock.Recv(message, 100))
				printf("SHIT\n");
			printf("Got: %s\n", message);
			sock.Close();
		}
	}
	else
	{	printf("TCP Options:\n\tL. listen\n\tC. connect\n");
		if(gechn() == 'l')	// listen
		{	TCPsoc server;
		
			if(server.Listen(port))
				printf("couldn't open port\n");
			printf("Listening....\n");
			
			char message[100];
	
			TCPsoc connection;
			server.Accept(connection);
			printf("Connected!\n");
			
			connection.Recv(message, 100);
			printf("\tData:    %s\n", message);
			Scopy(message, "Boo");
			connection.Send(message, 4);
		 	
			 server.Close();
			 connection.Close();
		}
		else	// connect
		{	TCPsoc sock;
		
			if(sock.Connect("localhost", port))
				printf("couldn't connect!? wtf!?\n");
			printf("Connected\n");
			
			char message[100];
			Scopy(message, "HEyo");
			printf("Sending... on port %d\n", port);
			sock.Send(message, 5);
			if(0==sock.Recv(message, 100))
				printf("SHIT\n");
			printf("Got: %s\n", message);

			sock.Close();
		}
	}
		
	getchar();
}
