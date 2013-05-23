#include <stdio.h>
#include "KB handling.h"

main()
{	int i=0;
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

