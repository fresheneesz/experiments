#include <stdio.h>
#include <openssl/pem.h>
#include <openssl/rsa.h>
#include <openssl/engine.h>
#include <openssl/err.h>
#include <string.h>

void print_error(char *string)
{
	fprintf(stderr, "%s\n", string);
	ERR_get_error();
}


int main(int argc, char *argv[])
{	char *plaintxt = "This is plaintext";
	char ciphertxt[2048];
	char plaintxt2[2048];
	int size = 0;

	OpenSSL_add_all_algorithms();

	RSA *rsa = NULL;
	RSA *rsa_pubkey = NULL;

	// Read the key from the keyfile
	//EVP_PKEY *privkey = NULL;

	FILE *fp = NULL;
	FILE *fp_pubkey = NULL;

	BIO *err_output = NULL;

	err_output = BIO_new_fp(stderr, BIO_NOCLOSE);

	memset(ciphertxt, 0, 1024);
	memset(plaintxt2, 0, 1024);

	fp = fopen("p1.private", "r");
	if (!fp){
		perror("fopen: private_key");
		exit(1);
	}	

	fp_pubkey = fopen("p1.public", "r");
	if (!fp_pubkey){
		perror("fopen: pubkey");
		exit(1);
	}	

	//rsa = RSA_new();
	if (PEM_read_RSAPrivateKey(fp,  &rsa, NULL, NULL) == NULL){
		print_error("Error during reading private key");
		exit(1);
	} 

#if 0
	rsa_pubkey = RSA_new();

	if ( PEM_read_RSA_PUBKEY(fp_pubkey,  &rsa_pubkey, NULL, NULL) == NULL){
		BIO_printf(err_output, "Error reading public key\n");
		ERR_print_errors(err_output);
		exit(1);
	} 

#endif
	if ( (size = (RSA_public_encrypt(strlen(plaintxt), (unsigned char*)plaintxt, (unsigned char*)ciphertxt, rsa, RSA_PKCS1_PADDING) ) == -1 ) ){
		BIO_printf(err_output, "Error during encryption\n");
		ERR_print_errors(err_output);
		exit(1);
	}

	fprintf(stderr, "plaintxt = %s\n", plaintxt);

	if ( RSA_private_decrypt(RSA_size(rsa), (unsigned char*)ciphertxt, (unsigned char*)plaintxt2, rsa, RSA_PKCS1_PADDING) == -1){
		BIO_printf(err_output, "Error during decryption\n");
		ERR_print_errors(err_output);
		exit(1);
	}

	fprintf(stderr, "decrypted message = %s\n", plaintxt2);


	/* Free the RSA */
	RSA_free(rsa);
	getchar();
}
