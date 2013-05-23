#include <stdio.h>

main()
{	int machine=0, numberOfSections, timeDateStamp, pointerToSymbolTable;
	int numberOfSymbols, sizeofOptionalHeader, characteristics;
	
	FILE* obj = fopen("libhello.a", "r");	
	//fread(&machine, 2, 1, obj);
	char a = fgetc(obj);
	char b = fgetc(obj);
	printf("Got: %d or %d\n", 256*a+b, 256*b+a);
	printf("Got: %d\n", machine);
	getchar();
}
