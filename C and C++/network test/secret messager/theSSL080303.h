/* Must link to shared libraries:
	SSLeay32.dll
*/

/* Must link to static libraries:
-lssleay32
-leay32	
*/

#ifndef theSSL_H
#define theSSL_H

#define APPLINK_STDIN	1
#define APPLINK_STDOUT	2
#define APPLINK_STDERR	3
#define APPLINK_FPRINTF	4
#define APPLINK_FGETS	5
#define APPLINK_FREAD	6
#define APPLINK_FWRITE	7
#define APPLINK_FSETMOD	8
#define APPLINK_FEOF	9
#define APPLINK_FCLOSE 	10	/* should not be used */

#define APPLINK_FOPEN	11	/* solely for completeness */
#define APPLINK_FSEEK	12
#define APPLINK_FTELL	13
#define APPLINK_FFLUSH	14
#define APPLINK_FERROR	15
#define APPLINK_CLEARERR 16
#define APPLINK_FILENO	17	/* to be used with below */

#define APPLINK_OPEN	18	/* formally can't be used, as flags can vary */
#define APPLINK_READ	19
#define APPLINK_WRITE	20
#define APPLINK_LSEEK	21
#define APPLINK_CLOSE	22
#define APPLINK_MAX	22	/* always same as last macro */

#ifndef APPMACROS_ONLY
#include <stdio.h>
#include <io.h>
#include <fcntl.h>

static void *app_stdin(void)		{ return stdin;  }
static void *app_stdout(void)		{ return stdout; }
static void *app_stderr(void)		{ return stderr; }
static int   app_feof(FILE *fp)		{ return feof(fp); }
static int   app_ferror(FILE *fp)	{ return ferror(fp); }
static void  app_clearerr(FILE *fp)	{ clearerr(fp); }
static int   app_fileno(FILE *fp)	{ return _fileno(fp); }
static int   app_fsetmod(FILE *fp,char mod)
{ return _setmode (_fileno(fp),mod=='b'?_O_BINARY:_O_TEXT); }

#ifdef __cplusplus
extern "C" {
#endif

__declspec(dllexport)
void **
#if defined(__BORLANDC__)
__stdcall	/* __stdcall appears to be the only way to get the name
		 * decoration right with Borland C. Otherwise it works
		 * purely incidentally, as we pass no parameters. */
#else
__cdecl
#endif
OPENSSL_Applink(void)
{ static int once=1;
  static void *OPENSSL_ApplinkTable[APPLINK_MAX+1]={(void *)APPLINK_MAX};

    if (once)
    {	OPENSSL_ApplinkTable[APPLINK_STDIN]	= (void*)app_stdin;
	OPENSSL_ApplinkTable[APPLINK_STDOUT]	= (void*)app_stdout;
	OPENSSL_ApplinkTable[APPLINK_STDERR]	= (void*)app_stderr;
	OPENSSL_ApplinkTable[APPLINK_FPRINTF]	= (void*)fprintf;
	OPENSSL_ApplinkTable[APPLINK_FGETS]	= (void*)fgets;
	OPENSSL_ApplinkTable[APPLINK_FREAD]	= (void*)fread;
	OPENSSL_ApplinkTable[APPLINK_FWRITE]	= (void*)fwrite;
	OPENSSL_ApplinkTable[APPLINK_FSETMOD]	= (void*)app_fsetmod;
	OPENSSL_ApplinkTable[APPLINK_FEOF]	= (void*)app_feof;
	OPENSSL_ApplinkTable[APPLINK_FCLOSE]	= (void*)fclose;

	OPENSSL_ApplinkTable[APPLINK_FOPEN]	= (void*)fopen;
	OPENSSL_ApplinkTable[APPLINK_FSEEK]	= (void*)fseek;
	OPENSSL_ApplinkTable[APPLINK_FTELL]	= (void*)ftell;
	OPENSSL_ApplinkTable[APPLINK_FFLUSH]	= (void*)fflush;
	OPENSSL_ApplinkTable[APPLINK_FERROR]	= (void*)app_ferror;
	OPENSSL_ApplinkTable[APPLINK_CLEARERR]	= (void*)app_clearerr;
	OPENSSL_ApplinkTable[APPLINK_FILENO]	= (void*)app_fileno;

	OPENSSL_ApplinkTable[APPLINK_OPEN]	= (void*)_open;
	OPENSSL_ApplinkTable[APPLINK_READ]	= (void*)_read;
	OPENSSL_ApplinkTable[APPLINK_WRITE]	= (void*)_write;
	OPENSSL_ApplinkTable[APPLINK_LSEEK]	= (void*)_lseek;
	OPENSSL_ApplinkTable[APPLINK_CLOSE]	= (void*)_close;

	once = 0;
    }

  return OPENSSL_ApplinkTable;
}

#ifdef __cplusplus
}
#endif
#endif

#include <openssl/rsa.h>
#include <openssl/pem.h>

#include <time.h>

// takes a random seed
void RSAinit(int seed)
{	if(seed == -1)
	{	srand(time(0));
	}
	else
	{	srand(seed);
	}
}

char* itSforSSL(int a, char* b);
void ScopyforSSL(char* to, char* from);


class RSAkey
{public:
	RSA* key;
	
	RSAkey()
	{	key = RSA_new();
	}
	
	~RSAkey()
	{	if(key != 0)
		{	RSA_free(key);
		}
	}
	
	// generate a key of size 'bytes' with e = 65537
	void generate(int bytes)
	{	BIGNUM* e = BN_new();
		BN_hex2bn(&e, "10001");	// 65537
		
		/*	In practice, common choices for e are 3, 17 and 65537 (2^16+1). 
		These are Fermat primes and are chosen because they make the modular exponentiation operation faster. 
		Also, having chosen e, it is simpler to test whether gcd(e, p-1)=1 and gcd(e, q-1)=1 
		while generating and testing the primes in step 1. Values of p or q that fail this test can be rejected there and then. 
		(Even better: if e is prime and greater than 2 then you can do the less-expensive test (p mod e)!=1 
		instead of gcd(p-1,e)==1.)
		*/
		RSA_generate_key_ex(key, bytes, e, 0);
	}
	
	// generate a key of size 'bytes' with arbitrary e (MUST be an odd number)
	bool generate(int bytes, int exponent)
	{	if(exponent%2 == 0)
			return true;	// error - e can't be even
		char temp[20];
		BIGNUM* e = BN_new();
		BN_dec2bn(&e, itSforSSL(exponent, temp));
	
		RSA_generate_key_ex(key, bytes, e, 0);
		return false;
	}
	
	// generate a key of size 'bytes' with arbitrary hexadecimal number (in string form) e (MUST be an odd number)
	bool generate(int bytes, char* hexponent)
	{	BIGNUM* e = BN_new();
		BN_hex2bn(&e, hexponent);
	
		RSA_generate_key_ex(key, bytes, e, 0);
		return false;
	}
	
	bool loadPEMpub(char* keyFilename)
	{	FILE* keyfile = fopen(keyFilename, "r");
		if(keyfile==0)
			return true;
		
		RSA* tempkey;
		tempkey = PEM_read_RSA_PUBKEY(keyfile, 0, 0, 0);
		fclose(keyfile);
		if(tempkey == 0)
			return true;
		else
		{	key = tempkey;
			return false;
		}
	}
	
	bool loadPEMpriv(char* keyFilename)
	{	FILE* keyfile = fopen(keyFilename, "r");
		if(keyfile==0)
		{	return true;
		}
		
		RSA* tempkey;
		tempkey = PEM_read_RSAPrivateKey(keyfile, 0, 0, 0);
		fclose(keyfile);
		if(tempkey == 0)
		{	return true;
		}
		else
		{	key = tempkey;
			return false;
		}
	}
	
	bool savePEMpub(char* filename)
	{	FILE* keyfile = fopen(filename, "w");
		if(keyfile==0)
			return true;
		if(PEM_write_RSAPublicKey(keyfile,key) == 0)
			return true;	// fail
		fclose(keyfile);
		return false;
	}
	
	bool savePEMpriv(char* filename)
	{	FILE* keyfile = fopen(filename, "w");
		if(keyfile==0)
			return true;
		if(PEM_write_RSAPrivateKey(keyfile,key,0,0,0,0,0) == 0)
			return true;	// fail
		fclose(keyfile);
		return false;
	}
	
	// returns size of encrypted message
	// return -1 on fail - uses RSA_PKCS1_OAEP_PADDING which might be slower than others
	int encPub(char* message, int mlen, char* encryptedMessage)
	{	// the buffer 'back' must be at least the size of the return value of RSA_size(keys)
		// flen (first argument must be LESS than RSA_size(rsa) - 11 for the PKCS #1 v1.5 based padding modes, 
		// less than RSA_size(rsa) - 41 for RSA_PKCS1_OAEP_PADDING 
		// and exactly RSA_size(rsa) for RSA_NO_PADDING.
		return RSA_public_encrypt(mlen, (unsigned char*)message, (unsigned char*) encryptedMessage, key, RSA_PKCS1_OAEP_PADDING);
	}
	
	// returns size of encrypted message
	// return -1 on fail - uses RSA_PKCS1_OAEP_PADDING which might be slower than others
	int encPriv(char* message, int mlen, char* encryptedMessage)
	{	// the buffer 'back' must be at least the size of the return value of RSA_size(keys)
		// flen (first argument must be LESS than RSA_size(rsa) - 11 for the PKCS #1 v1.5 based padding modes, 
		// less than RSA_size(rsa) - 41 for RSA_PKCS1_OAEP_PADDING 
		// and exactly RSA_size(rsa) for RSA_NO_PADDING.
		return RSA_private_encrypt(mlen, (unsigned char*)message, (unsigned char*) encryptedMessage, key, RSA_PKCS1_OAEP_PADDING);
	}
	
	// return -1 on fail - uses RSA_PKCS1_OAEP_PADDING which might be slower than others
	bool decPub(char* encryptedMessage, int encryptedmlen, char* originalMessage)
	{	return RSA_public_decrypt(encryptedmlen, (unsigned char*)encryptedMessage, (unsigned char*)originalMessage, key, RSA_PKCS1_OAEP_PADDING);
	}
	
	// return -1 on fail - uses RSA_PKCS1_OAEP_PADDING which might be slower than others
	bool decPriv(char* encryptedMessage, int encryptedmlen, char* originalMessage)
	{	return RSA_private_decrypt(encryptedmlen, (unsigned char*)encryptedMessage, (unsigned char*)originalMessage, key, RSA_PKCS1_OAEP_PADDING);
	}
	
	// put public exponent into string
	char* hexE(char* a)
	{	ScopyforSSL(a, BN_bn2hex(key->e));
		return a;
	}
	
	// put private exponent into string
	char* hexD(char* a)
	{	ScopyforSSL(a, BN_bn2hex(key->d));
		return a;
	}
	
	// put modulus into string
	char* hexN(char* a)
	{	ScopyforSSL(a, BN_bn2hex(key->n));
		return a;
	}
	
	// set public exponent to hex number contained in string 'a'
	void setE(char* a)
	{	if(key->e != 0)
		{	BN_clear_free(key->e);
		}
		BN_hex2bn(&key->e, a);
	}
	
	// set private exponent to hex number contained in string 'a'
	void setD(char* a)
	{	if(key->d != 0)
		{	BN_clear_free(key->d);
		}
		BN_hex2bn(&key->d, a);
	}
	
	// set modulus to hex number contained in string 'a'
	void setN(char* a)
	{	if(key->n != 0)
		{	BN_clear_free(key->n);
		}
		BN_hex2bn(&key->n, a);
	}
};


// copies to = from
void ScopyforSSL(char* to, char* from)
{	int m;
	for(m=0; from[m]!=0; m++)
	{	to[m]=from[m];
	}
	to[m]=0;
}	

// integer to string
char* itSforSSL(int a, char* b)
{	if(a==0)
	{	b[0]='0';
		b[1]=0;
		return b;
	}
	
	int n=0;
	if(a<0)
	{	b[0]='-';
		a=-a;
		n++;
	}
	for(; a>0; n++)
	{	b[n] = '0' + a%10;
		a/=10;
	}
	b[n]=0;
	n-=1;
	
	// reverse b
	for(int m=0; n>m; m++, n--)
	{	char temp;
		temp = b[m];
		b[m] = b[n];
		b[n] = temp;
	}
	return b;
}

#endif	// the SSL_H
