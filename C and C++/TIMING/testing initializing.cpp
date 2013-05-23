#include <iostream.h>
#include <time.h>

void thing1(void);

main()
{		int a, b; 
	
	getchar();
	a=clock();
	thing1();	
	b=clock()-a;
		
	cout << "\nfirst: " << b;
	/*
	a=clock();
	for(int m=0; m<length; m++)
	{	char a[10]={1,2,3,4,5,8};
	}
	b=clock()-a;
	
	cout << "\nsecond: " << b;
	
	a=clock();
	for(int m=0; m<length; m++)
	{	char a[10]={1,2,3,4,5,8};
	}
	b=clock()-a;
	
	cout << "\nthird: " << b;
	
	
		a=clock();
	for(int m=0; m<length; m++)
	{	char a[10];
		a[0]=1;
		a[1]=2;
		a[2]=3;
		a[3]=4;
		a[5]=5;
		a[6]=8;
	}
	b=clock()-a;
	
	cout << "\nfourth: " << b;
//*/	
	getchar();
	
}


void thing1(void)
{	int length=100000000;
	char c[]="WAHHHEIO";
	char *ptr;
	
	
	class bird
	{ public:
		int garth;
		
		void death(void)
		{	int f;
			// do nothing
		}
		
	//	bird() : garth(9){	}
	};
	
	for(int m=0; m<length; m++)
	{	bird a;
		a.garth=9;
	}	
}
