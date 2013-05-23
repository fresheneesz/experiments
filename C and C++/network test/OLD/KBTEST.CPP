#include <stdio.h>
#include "KBinput handling.h"

main()
{	init();
	int i=0;
	int n=0;
	while(i!='O')
	{	if(keyhit())
		{	
			printf("Tiger goes %d times: %c\n", n, (i=getchnec()));
		}
		else
			n++;	
	}
}

