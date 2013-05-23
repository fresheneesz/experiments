#include <stdio.h>

main()
{	union
	{	int jackass;
		char boo[40];
	};
	
	for(int n=0; n<40; n++)
		printf("%c",boo[n]);
	printf("\n");
	jackass=34;
	
	for(int n=0; n<40; n++)
		printf("%c",boo[n]);
	
	//printf("\nsize: %d", sizeof(a));
	getchar();
}
