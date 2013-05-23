#include <stdio.h>

main()
{	FILE* moose = fopen("the.txt", "rb+");
	printf("NOW: %d\n", ftell(moose));
	fputc('z', moose);
	printf("NOW: %d\n", ftell(moose));
	fseek(moose, 0, SEEK_END);
	printf("End?: %d\n", ftell(moose));
	
	getchar();
}
