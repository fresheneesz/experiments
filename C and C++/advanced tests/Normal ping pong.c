#include <stdio.h>
int pong();

// THIS WORKS INDEFINATELY!!!!! which is awesome

int ping()
{	printf("PING ");
	return pong();	//return pong()+1;	// <---- that +1 also kills it
	//pain();		// adding another function kills the stack
}

int pong()
{	printf("PONG  ");
	//getchar();
	return ping();
	//pain();
}

main()
{	ping();
}
