#include <stdio.h>
#include <iostream.h>
//#include <openssl/bio.h>
//#include <openssl/ssl.h>
#include <openssl/err.h>
#include <openssl/rsa.h>
//#include <openssl/rand.h>
#include <openssl/pem.h>

#include <time.h>
#include "theStrings v080218.h"
#include "theSSL080306.h"

/* Uses static libraries:
-lssleay32
-leay32
*/

// THIS DOESN'T WORK AT THE END - WTF???
main()
{	RSAkey FUCK, ASS;
	char bitch[5000];
	
	FILE* keyfile = fopen("p1.private", "r");
	if(keyfile==0)
	{	return true;
	}
	int SHIT = fread(bitch, sizeof(char), 5000, keyfile);
	
	BIO *keymem;
    keymem = BIO_new_mem_buf(bitch, SHIT);

	
	FUCK.key = PEM_read_bio_RSAPrivateKey(keymem, 0, 0, 0);
	
	//BIO_set_close(keymem, BIO_NOCLOSE); /* So BIO_free() leaves BUF_MEM alone */
    //BIO_free(keymem);
	
	if(FUCK.key == 0)
		printf("CRAP true;");
	
	
	//if(FUCK.loadPEMpriv("p1.private"))
	//{	printf("FUCK failed\n");
	//}
	if(ASS.loadPEMpubAlternate("p1.public"))
	{	printf("FUCK failed also\n");
	}
	
	if(RSA_check_key(FUCK.key) != 1)
		printf("Key is bad.\n");
	
	char message[500], back[500];
	int backlen;
	
	printf("FUCK ben zhao %s\n", FUCK.hexE(back));
	printf("FUCK ben zhao %s\n", FUCK.hexN(back));
	printf("FUCK ben zhao %s\n", FUCK.hexD(back));
	
	printf("\nFUCK ben zhao %s\n", ASS.hexE(back));
	printf("\nFUCK ben zhao %s\n\n", ASS.hexN(back));
	
	Scopy(message, "I HATE THIS BULLLSHIT.");
	if((backlen=FUCK.encPriv(message, Slen(message), back)) == -1)
		printf("SHIT SHIT SHIT HIST HIST SIHTIOH\n");
	
	Scopy(message, "not it");	
	
	if(ASS.decPub(back, backlen, message) == -1)
		printf("FUCK You\n");
	
	printf("END RESULT: %s\n", message);
	
	/*//OpenSSL_add_all_algorithms();

	RSA* keys;
	char message[500], back[500];
	int backsize;
	keys = RSA_new();

	srand(5);	// not sure if this affects RSA_generate_key_ex, but the documentation says rand should be seeded before use
	
	// test loading keys from a file
	RSA* pubkey;	// public key only
	pubkey = RSA_new();
	
	FILE* hiya = fopen("p1.private", "r");
	if(hiya==0)
		printf("Couldn't open hiya\n");
	
	keys = PEM_read_RSAPrivateKey(hiya, 0, 0, 0);
	
    fclose(hiya);
	
	// test getting keys back out - and printing them
	printf("privFF: ");
	printf("This is the industry (p):\n %s\n", BN_bn2hex(keys->p));
	printf("\nprivFF: ");
	printf("This is the industry (q):\n %s\n", BN_bn2hex(keys->q));
	printf("\nprivFF: ");
	printf("This is the industry (d):\n %s\n", BN_bn2hex(keys->d));
	printf("\nprivFF: ");
	printf("This is the industry (e):\n %s\n", BN_bn2hex(keys->e));
	printf("\nprivFF: ");
	printf("This is the industry (n):\n %s\n", BN_bn2hex(keys->n));
	
	hiya = fopen("p1.public", "r");
	if(hiya==0)
		printf("Couldn't open hiya\n");
	
	pubkey = PEM_read_RSA_PUBKEY(hiya, 0, 0, 0);
	fclose(hiya);
	
	// test getting keys back out - and printing them
	printf("\n\npubFF: ");
	printf("This is the industry (e):\n %s\n", BN_bn2hex(pubkey->e));
	printf("\npubFF: ");
	printf("This is the industry (n):\n %s\n", BN_bn2hex(pubkey->n));
	
	
	// test encrypting messages
	Scopy(message, "Fack it all");
	printf("\nBefore encryption:\n %s\n", message);
	backsize = RSA_private_encrypt(30, (unsigned char*)message, (unsigned char*) back, keys, RSA_PKCS1_OAEP_PADDING);
	printf("\nEncrypted to %d bytes:\n %s\n", backsize, back);
	if(backsize==-1)
		printf("Size: %d  Aww crap: %s\n", RSA_size(keys), ERR_error_string(ERR_get_error(), back));
	
	Scopy(message, "BAAAAD value"); // make sure message is really being written to by the decyrpter
	
	// test decrypting messages
	backsize = RSA_public_decrypt(backsize, (unsigned char *)back, (unsigned char *)message, pubkey, RSA_PKCS1_OAEP_PADDING);
	if(backsize==-1)
		printf("Size: %d  Aww crap2: %s\n", RSA_size(keys), ERR_error_string(ERR_get_error(), back));
		
	printf("\nAfter decryption:\n %s\n", message);
	*/
	
	getchar();
}
