#include <openssl/md5.h>
#include <openssl/ssl.h>
#include <stdio.h>
#include "theStrings v080218.h"

main()
{	
	SSL_library_init();
	char moose[500];
	for(int n=0; n<450; n++)
	{	moose[n]=0;
	}
	
	printf("THE HASH:%s\nTHE_EYND\n", MD5((unsigned char*)"goobag", sizeof("goobag"), (unsigned char*)moose));
	printf("\nIS LENGTH: %d\n", Slen(moose));
	char giblets[200] = "STICKS OR UMbrllas";
	
	BIO* fuckBio;
	BIO_new_fd();
	
	
	
	getchar();
}
