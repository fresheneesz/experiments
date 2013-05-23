#include <stdio.h>

main()
{	int a;
	int setB(int c);
	void setA(int b);

	void setA(int b)
	{	if(setB(5))
			return;
		else
			a=4;
	}
	int setB(int c)
	{	return c-2;
	}
	a=6;
	setA(1);
	printf("%d",a);
	getchar();

}


