#include <stdio.h>

void bumpcap()
{
	
J3: printf("nooper\n");
	goto J4;
	
J4:	return;
	
}
void rapjo()
{	
J3: printf("moose\n");
	goto J4;
J4: return;
}

main()
{ 	bumpcap();
	rapjo();
	
	getchar();
}
	
