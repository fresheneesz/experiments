#include <stdio.h>


// never completed. Do it now?
main()
{	FILE* moose = fopen("the.txt", "rb+");
	fwrite(
	printf("NOW: %d\n", ftell(moose));
	fseek(moose, 0, SEEK_END);
	printf("End?: %d\n", ftell(moose));
	
	getchar();
}
