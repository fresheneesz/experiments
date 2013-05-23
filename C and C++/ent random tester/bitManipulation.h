// bit manipulation

byte grabFirst8Bits(unsigned int value) {
	return value & 0x00FF;
}
byte grabSecond8Bits(unsigned int value) {
	return grabFirst8Bits(value>>8);
}

bit getBit(byte value, int index) {
	return (value>>index) & 1;
}

void setBit(byte* bitList, int index, bit value) {
	*bitList = (*bitList) | (value<<index);	
}