#include <iostream.h>
#include <time.h>

int thing1(int & a);
int* thing2(int* a);
int thing3(int* a);
int& thing4(int a);
int& thing5(int & a);

main()
{	int a, b; 
	int length=10000000;
	
	getchar();
	b=0;
	for(int m=0; m<length; m++)
	{	a=clock();
		thing1(a);	
		b+=clock()-a;
	}
	cout << "\nfirst: " << b;
	
	b=0;
	for(int m=0; m<length; m++)
	{	a=clock();
		thing2(&a);	
		b+=clock()-a;
	}
	cout << "\nsecond: " << b;

	b=0;
	for(int m=0; m<length; m++)
	{	a=clock();
		thing3(&a);	
		b+=clock()-a;
	}
	cout << "\nthird: " << b;

	b=0;
	for(int m=0; m<length; m++)
	{	a=clock();
		thing4(a);	
		b+=clock()-a;
	}
	cout << "\nfirst: " << b;

	b=0;
	for(int m=0; m<length; m++)
	{	a=clock();
		thing5(a);	
		b+=clock()-a;
	}
	cout << "\nfirst: " << b;

	getchar();
	
}


int thing1(int & a)
{	return a;
	
}

int* thing2(int* a)
{	return a;

}

int thing3(int* a)
{	
	return *a;
}



int& thing4(int a)
{	return a;

}

int& thing5(int& a)
{	return a;
	
}
