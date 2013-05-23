
	// generating raw random values

// uses rand out of the box
byte* generate_rawRand(int seed, byte* list) {
	srand(seed);
	
	int n, timesToIterate = bytesToGenerate/4; // generates an int (four-bytes) at a time
	for(n=0; n<timesToIterate; n++) {
		int value = rand(); // <-----
		((int*)list)[n] = rand();
	}	
	return list;
}

// uses the first two bytes of rand
byte* generate_twoBytes(int seed, byte* list) {
	srand(seed);
	
	int n, timesToIterate = bytesToGenerate/2; // generates two-bytes at a time
	for(n=0; n<timesToIterate; n++) {
		byte randVal = rand();
		byte value1 = grabFirst8Bits(randVal);  // <-----
		byte value2 = grabSecond8Bits(randVal); // <-----
		list[n] = value1;
		list[n+1] = value1;
	}	
	return list;
}

// uses each 15 bits of randomness that comes out of rand()
byte* generate_randomByte(int seed, byte* list) {
	srand(seed);
	
	int n, timesToIterate = bytesToGenerate; 
	for(n=0; n<timesToIterate; n++) {
		list[n] = getRandomByte();  // <-----
	}	
	return list;
}


	// generating constrained values

int valuesLessThan = 251;
	
byte* generate_remainder(int seed, byte* list) {
	srand(seed);
	
	int n, timesToIterate = bytesToGenerate; 
	for(n=0; n<timesToIterate; n++) {
		list[n] = getRandomByte()%(valuesLessThan+1);  // <-----
	}	
	return list;
}	

byte* generate_iterate(int seed, byte* list) {
	srand(seed);
	
	int n, timesToIterate = bytesToGenerate; 
	for(n=0; n<timesToIterate; n++) {
		byte val;
		do {
			val = getRandomByte();	// <-----
		} while(val > valuesLessThan);           // <-----
		list[n] = val;  
	}	
	return list;
}


/*void generateRandomString_finalB() {
	int n,m;
	for(m=0; m<100; m++) {
		srand(seed);	// seed it again
		seed++;		// incriment the seed
		for(n=0; n<1000; n++) {
			byte value = getRandomByte();
			fwrite(&value, sizeof(byte), 1, output);
		}	
	}
	fclose(output);		
}*/
