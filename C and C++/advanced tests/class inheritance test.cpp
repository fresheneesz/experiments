#include <stdio.h>

class a {
 public:	
	int n;
	
	a() {
		n = 5;	
	}
	
	int getn() {
		return n;
	}		
};


class b : public a {
 public:
	int n;
	b() {
		n=9;
	}
	
};

main()
{	a anA;
	b aB;
	
	printf("%d and %d", anA.getn(), aB.getn());
	getchar();
}
