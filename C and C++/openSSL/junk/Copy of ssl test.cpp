#include <stdio.h>
//#include <openssl/bio.h>
//#include <openssl/ssl.h>
//#include <openssl/err.h>
#include <openssl/rsa.h>
//#include <openssl/rand.h>
#include <time.h>

main()
{	RSA* keys;
	keys = RSA_new();
	BIGNUM* e = BN_new();
	
	// test seting a bignum to 0F
	BN_hex2bn(&e, "f");
	printf("MOOSE: %s\n", BN_bn2hex(e));
	
	// test generating a key - 1024 bytes long, exponent 0F (should be an odd number), using a default key creation function
	/*	In practice, common choices for e are 3, 17 and 65537 (2^16+1). 
		These are Fermat primes and are chosen because they make the modular exponentiation operation faster. 
		Also, having chosen e, it is simpler to test whether gcd(e, p-1)=1 and gcd(e, q-1)=1 
		while generating and testing the primes in step 1. Values of p or q that fail this test can be rejected there and then. 
		(Even better: if e is prime and greater than 2 then you can do the less-expensive test (p mod e)!=1 
		instead of gcd(p-1,e)==1.)
	*/
	srand(time(0));	// not sure if this affects RSA_generate_key_ex, but the documentation says rand should be seeded before use
	RSA_generate_key_ex(keys, 1024, e, 0);
	
	// test getting keys back out - and printing them
	printf("HERE: ");
	printf("This is the industry %s\n", BN_bn2hex(keys->p));
	printf("\nHERE: ");
	printf("This is the industry %s\n", BN_bn2hex(keys->q));
	printf("\nHERE: ");
	printf("This is the industry %s\n", BN_bn2hex(keys->d));
	printf("\nHERE: ");
	printf("This is the industry %s\n", BN_bn2hex(keys->e));
	printf("\nHERE: ");
	printf("This is the industry %s\n", BN_bn2hex(keys->n));
	

	//SSL_CTX * ctx = SSL_CTX_new(SSLv23_client_method());
	//SSL * ssl;
	
	//if(! SSL_CTX_load_verify_locations(ctx, "/path/to/TrustStore.pem", NULL))
	//{
	    /* Handle failed load here */
	//}
	getchar();
}
//RSA *	RSA_generate_key(int bits, unsigned long e,void
//		(*callback)(int,int,void *),void *cb_arg);
