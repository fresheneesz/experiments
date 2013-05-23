#include "bitManipulation.h"

bit bitList[8];
byte bitListLength = 0;
void populateBitList(byte sevenBits) {
	int n;
	for(n=0; n<7; n++) {
		bitList[n] = getBit(sevenBits, n);
	}
	bitListLength = 7;
}

byte next7Bits;
bool next7BitsPopulated = 0;

// requires seeding have already happened
byte getRandomByte() {
	if(next7BitsPopulated && bitListLength > 0) {
		bit nextBit = bitList[bitListLength-1];
		bitListLength--;
		
		byte nextByte = next7Bits;
		next7BitsPopulated = false;
		setBit(&nextByte, 7, nextBit);
		return nextByte;
	} else {
		unsigned int randomValue = rand();	
		
		if(next7BitsPopulated == false) {
			next7Bits = grabSecond8Bits(randomValue);
			next7BitsPopulated = true;
		} else if(bitListLength == 0) {
			populateBitList(grabSecond8Bits(randomValue));	
		} else {
			printf("Something went wrong\n");	// this should never happen	
		}
		
		return grabFirst8Bits(randomValue);
	}
}