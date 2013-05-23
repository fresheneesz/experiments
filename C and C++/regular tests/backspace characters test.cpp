#include <stdio.h>

main()
{	FILE* file = fopen("the.txt", "r+");
	fgetc(file);
	fgetc(file);
	fgetc(file);
	//fflush(file);
	char moose[50];
	//fread(moose, 1, 3, file);
	fseek (file, 3, SEEK_SET);
	
	printf("WTF: %d\n", fwrite("\b", 1, 1, file));
	
	fclose(file);
	
	getchar();
	
	
}
