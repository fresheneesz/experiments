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

/* Uses static libraries:
-lssleay32
-leay32
*/

// THIS DOESN'T WORK AT THE END - WTF???
main()
{	//OpenSSL_add_all_algorithms();

	RSA* keys;
	keys = RSA_new();
	BIGNUM* e = BN_new();
	
	// test seting a bignum to 0F
	BN_hex2bn(&e, "f");
	printf("MOOSE: %s\n\n", BN_bn2hex(e));
	
	// test generating a key - 1024 bytes long, exponent 0F (should be an odd number), using a default key creation function
	/*	In practice, common choices for e are 3, 17 and 65537 (2^16+1). 
		These are Fermat primes and are chosen because they make the modular exponentiation operation faster. 
		Also, having chosen e, it is simpler to test whether gcd(e, p-1)=1 and gcd(e, q-1)=1 
		while generating and testing the primes in step 1. Values of p or q that fail this test can be rejected there and then. 
		(Even better: if e is prime and greater than 2 then you can do the less-expensive test (p mod e)!=1 
		instead of gcd(p-1,e)==1.)
	*/
	srand(5);	// not sure if this affects RSA_generate_key_ex, but the documentation says rand should be seeded before use
	RSA_generate_key_ex(keys, 1024, e, 0);
	printf("SIZE: %d\n", RSA_size(keys));
	
	if(RSA_check_key(keys) != 1)
		printf("Key is bad.\n");
	
	// test getting keys back out - and printing them
	printf("HERE: ");
	printf("This is the industry (p):\n %s\n", BN_bn2hex(keys->p));
	printf("\nHERE: ");
	printf("This is the industry (q):\n %s\n", BN_bn2hex(keys->q));
	printf("\nHERE: ");
	printf("This is the industry (d):\n %s\n", BN_bn2hex(keys->d));
	printf("\nHERE: ");
	printf("This is the industry (e):\n %s\n", BN_bn2hex(keys->e));
	printf("\nHERE: ");
	printf("This is the industry (n):\n %s\n", BN_bn2hex(keys->n));
	
	// test encrypting messages
	char message[5000] = "Ok we'll try something new";
	char back[5000];
	int backsize;
	printf("\nBefore encryption:\n %s\n", message);
				// the buffer 'back' must be at least the size of the return value of RSA_size(keys)
				// flen (first argument must be LESS than RSA_size(rsa) - 11 for the PKCS #1 v1.5 based padding modes, 
				// less than RSA_size(rsa) - 41 for RSA_PKCS1_OAEP_PADDING 
				// and exactly RSA_size(rsa) for RSA_NO_PADDING.
	printf("\nBuffer to encrypt into must be at least %d bytes long.\n", RSA_size(keys));
	printf("Length of message must be LESS than %d bytes long (for RSA_PKCS1_OAEP_PADDING).\n", RSA_size(keys) - 41);
	backsize = RSA_public_encrypt(86, (unsigned char*)message, (unsigned char*) back, keys, RSA_PKCS1_OAEP_PADDING);
	printf("\nEncrypted to %d bytes:\n %s\n", backsize, back);
	if(backsize==-1)
		printf("Size: %d  Aww crap: %s\n", RSA_size(keys), ERR_error_string(ERR_get_error(), back));
	
	Scopy(message, "BAAAAD value"); // make sure message is really being written to by the decyrpter
	
	// test decrypting messages
	backsize = RSA_private_decrypt(backsize, (unsigned char *)back, (unsigned char *)message, keys, RSA_PKCS1_OAEP_PADDING);
	if(backsize==-1)
		printf("Size: %d  Aww crap2: %s\n", RSA_size(keys), ERR_error_string(ERR_get_error(), back));
		
	printf("\nAfter decryption:\n %s\n", message);
	
	// test killing keys
	RSA_free(keys);
	
	// test loading keys from a file
	RSA* pubkey;	// public key only
	
	FILE* hiya = fopen("rsa.private", "r");
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
	
	hiya = fopen("rsa.public", "r");
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
	
	
	getchar();
}
