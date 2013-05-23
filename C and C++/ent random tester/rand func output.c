#include <stdio.h>
#include <stdlib.h>
typedef char bool;
bool true = 1;
bool false = 0;

typedef unsigned char byte;
typedef unsigned char bit;

#include "randomByteGenerator.h"
int bytesToGenerate = 100000;
#include "randomByteArrayGenerators.h"
void unitTests();
void populateFile(char*, byte*, int);

main() {	
	unitTests();
	printf("\n");
	printf("Rand Max: %d\n", RAND_MAX);
	
	int seed = time(0);
	byte list[bytesToGenerate];
	
	
	populateFile("rawRand.txt", generate_rawRand(seed, list), bytesToGenerate);
	populateFile("twoBytes.txt", generate_twoBytes(seed, list), bytesToGenerate);
	populateFile("randomByte.txt", generate_randomByte(seed, list), bytesToGenerate);
	
	populateFile("remainderMethod.txt", generate_remainder(seed, list), bytesToGenerate);
	populateFile("iterateMethod.txt", generate_iterate(seed, list), bytesToGenerate);
	
	getchar();
}

// Random



void populateFile(char* fileName, byte* list, int length) {	
	FILE* output = fopen(fileName, "wb");
	if(output == NULL) {
		printf("Couldn't open output file\n");	
	}
	
	int n;
	for(n=0; n<length; n++) {
		int value = list[n];
		fwrite(&value, sizeof(byte), 1, output);
	}	
	
	fclose(output);
}




// unit test related stuff

void test(bool result, char* message) {
	if(result) {
		printf("Success - %s", message);
	} else {
		printf("FAILED - %s", message);
	}
}
void unitTests() {
	//printf("%d, %d, %d, %d\n", grabFirst8Bits(4), grabSecond8Bits(4), grabFirst8Bits(258), grabSecond8Bits(258));
	
	test(grabFirst8Bits(4) == 4, "grabFirst8Bits(4) == 4\n");
	test(grabSecond8Bits(4) == 0, "grabSecond8Bits(4) == 0\n");
	test(grabFirst8Bits(258) == 2, "grabFirst8Bits(258) == 2\n");
	test(grabSecond8Bits(258) == 1, "grabSecond8Bits(258) == 1\n");
	
	byte x = 4;
	test(getBit(x, 0) == 0, "getBit(x, 0) == 0\n");
	test(getBit(x, 2) == 1, "getBit(x, 2) == 1\n");

	setBit(&x, 0, 1);
	test(x == 5, "x == 5\n");
	/*printf("x: %d\n", x);
	
	printf("((0xFE&value)<<index): %d\n", 4|(1<<0));
	printf("getBit(0xFFF7, 0): %d\n", getBit(0xFE, 0));
	printf("0xFFFF: %d\n", 0xFFFF);
	*/
	
	test(getBit(x, 0) == 1, "getBit(x, 1) == 1\n");
	test(getBit(x, 1) == 0, "getBit(x, 1) == 0\n");
}
