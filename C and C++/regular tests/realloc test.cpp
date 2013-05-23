#include <stdio.h>
#include "theStrings v080123.h"

main()
{	char* mo, *temp;

	mo = (char*) malloc(5*sizeof(char));
	Scopy(mo, "jack");
	
	printf("The:%s:\n");
	
	mo = (char*) realloc(mo, 10000*sizeof(char));
	if(mo==0)
		printf("WTF HAPPENED??\n");
	
	printf("The:%s:\n", mo);
	getchar();
}
