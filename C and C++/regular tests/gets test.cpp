#include <stdio.h>

main()
{	char string[100];
	printf("Type something\n");
	gets(string);
	printf("string: '%s'\n", string);
	getchar();
}
