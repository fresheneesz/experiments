#include <stdio.h>
#include "basicDynamicTypesv080206.h"

main()
{	BDArr<BDArr<int> > a;

	a[0][0] = 4;
	printf("It: %d\n", a[0][0]);
	getchar();
}
