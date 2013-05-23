#include <iostream.h>
#include <time.h>

void thing1(void);
void thing2(void);



main()
{	int a, b; 
	int length=100000000;
	
	//getchar();
	a=clock();
	for(int m=0; m<length; m++)
	{	thing1();	
	}
	b=clock()-a;
	cout << "\nfirst: " << b;
	
	a=clock();
	for(int m=0; m<length; m++)
	{	thing2();
	}
	b=clock()-a;
	cout << "\nsecond: " << b;

	getchar();
	
}


void thing1(void)
{	
	char a[10]={1,2,3,4,5,8};
}

void thing2(void)
{	
	char a[10];
		a[0]=1;
		a[1]=2;
		a[2]=3;
		a[3]=4;
		a[5]=5;
		a[6]=8;	
		a[7]=0;
		a[8]=0;
		a[9]=0;
}
