#include <stdio.h>

struct moo
{	int n;
	
	int moose(void)
	{	return 5;
	}
};

main()
{	struct moo a;
	
	a.n=4;
	
	
	
	printf("%d and %d", a.n, a.moose());
}
