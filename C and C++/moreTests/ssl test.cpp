#include <stdio.h>

#include <time.h>
#include <openssl/err.h>
#include "theStrings v080218.h"
#include "theSSL080310.h"


/* Uses static libraries:
-lssleay32
-leay32
*/

	bool loadPEMprivFile(RSAkey* key, char* keyFilename, char* temp, int tempSize)
	{	FILE* keyfile = fopen(keyFilename, "r");
		
		if(keyfile==0)
			return true;
			
		tempSize = fread(temp, sizeof(char), tempSize, keyfile);
		
		return key->loadPEMpriv(temp, tempSize);
	}
	
	bool loadPEMpubFile(RSAkey* key, char* keyFilename, char* temp, int tempSize)
	{	FILE* keyfile = fopen(keyFilename, "r");
		
		if(keyfile==0)
			return true;
			
		tempSize = fread(temp, sizeof(char), tempSize, keyfile);
		
		return key->loadPEMpub(temp, tempSize);
	}
	
	bool loadPEMpubFileAlt(RSAkey* key, char* keyFilename, char* temp, int tempSize)
	{	FILE* keyfile = fopen(keyFilename, "r");
		
		if(keyfile==0)
			return true;
			
		tempSize = fread(temp, sizeof(char), tempSize, keyfile);
		
		return key->loadPEMpubAlt(temp, tempSize);
	}

main()
{	RSAinit(time(0));

	RSAkey keys;
	char temp[500];
	char message[5000] = "Ok we'll try something new";
	char back[5000];
	int backsize;
//*

	keys.generate(128);	
	if(RSA_check_key(keys.key) != 1)
		printf("Key is bad.\n");
	
	// test getting keys back out - and printing them
	
	printf("\nHERE: ");
	printf("This is the industry (d):\n %s\n", keys.hexD(temp));
	printf("\nHERE: ");
	printf("This is the industry (e):\n %s\n", keys.hexE(temp));
	printf("\nHERE: ");
	printf("This is the industry (n):\n %s\n", keys.hexN(temp));
	
	// test encrypting messages
	
	printf("\nBefore encryption:\n %s\n", message);
	backsize = keys.encPub(message, 86, back);
	printf("\nEncrypted to %d bytes:\n %s\n", backsize, back);
	if(backsize==-1)
		printf("Size: %d  Aww crap: %s\n", RSA_size(keys.key), ERR_error_string(ERR_get_error(), back));
	
	Scopy(message, "BAAAAD value"); // make sure message is really being written to by the decyrpter
	
	// test decrypting messages
	backsize = keys.decPriv(back, backsize, message);
	if(backsize==-1)
		printf("Size: %d  Aww crap2: %s\n", RSA_size(keys.key), ERR_error_string(ERR_get_error(), back));
		
	printf("\nAfter decryption8:\n %s\n", message);
//*/		
	// test loading keys from a file
	RSAkey pubkey;	// public key only

	char bob[1000];
	if(loadPEMprivFile(&keys, "rsa.private", bob, 1000))
		printf("Couldn't load file\n");
	
	// test getting keys back out - and printing them
	printf("This is the industry (d):\n %s\n", keys.hexD(temp));
	printf("\nprivFF: ");
	printf("This is the industry (e):\n %s\n", keys.hexE(temp));
	printf("\nprivFF: ");
	printf("This is the industry (n):\n %s\n", keys.hexN(temp));
	
	if(loadPEMpubFileAlt(&pubkey, "rsa.public", bob, 1000))
		printf("OH NOOOOO\n");
	
	// test getting keys back out - and printing them
	printf("\n\npubFF: ");
	printf("This is the industry (e):\n %s\n", pubkey.hexE(temp));
	printf("\npubFF: ");
	printf("This is the industry (n):\n %s\n", pubkey.hexN(temp));
	
	// testing manually setting pieces of a key	
	//pubkey.setD(keys.hexD(temp));	// pubkey contains a private key.. sorry
	//pubkey.setN(keys.hexN(temp));
		
	// test encrypting messages
	Scopy(message, "GO ON GO ON!!!");
	printf("\nBefore encryption:\n %s\n", message);
	backsize = keys.encPriv(message, 80, back);
	printf("\nEncrypted to %d bytes:\n %s\n", backsize, back);
	if(backsize==-1)
		printf("Size: %d  Aww crap: %s\n", RSA_size(keys.key), ERR_error_string(ERR_get_error(), back));

	Scopy(message, "BAAAAD value"); // make sure message is really being written to by the decyrpter
	
	// test decrypting messages
	backsize = pubkey.decPub(back, backsize, message);
	if(backsize==-1)
		printf("Size: %d  Aww crap2: %s\n", RSA_size(keys.key), ERR_error_string(ERR_get_error(), back));
		
	printf("\nAfter decryption:\n");
	printf(" %s\n", message);
	
	
	getchar();
}

