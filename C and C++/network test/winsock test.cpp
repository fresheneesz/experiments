/* link to static libraries:
-lws2_32
*/

#include <windows.h>
#include <winsock2.h>

main()
{	WSADATA wsaData;
	WORD version;
	int error;
	
	version = MAKEWORD( 2, 0 );
	error = WSAStartup( version, &wsaData );
	if( error != 0 )
	{	return FALSE;	// error
	}
	
	/* check for correct version */
	if ( LOBYTE( wsaData.wVersion ) != 2 || HIBYTE( wsaData.wVersion ) != 0 )
	{	WSACleanup();	/* incorrect WinSock version */
		return FALSE;
	}
	
	/* WinSock has been initialized */

	SOCKET server = socket( AF_INET, SOCK_STREAM, 0 );
	
	struct sockaddr_in sin;

	memset( &sin, 0, sizeof sin );
	
	sin.sin_family = AF_INET;
	sin.sin_addr.s_addr = INADDR_ANY;
	sin.sin_port = htons( 21 );
	
	if( bind( server, &sin, sizeof sin ) == SOCKET_ERROR )
	{
	    /* could not start server */
	    return FALSE;
	}
	
	while( listen( server, SOMAXCONN ) == SOCKET_ERROR );
	
	SOCKET client;
	int length;
	
	length = sizeof sin;
	client = accept( server, &sin, &length );
}
