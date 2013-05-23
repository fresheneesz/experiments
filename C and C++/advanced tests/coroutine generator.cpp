#include <stdio.h>

class countClass
{public:
	int state;
	int n;
	void reset()
	{	state=0;
	}
	int count()
	{	switch(state)
		{case 0:
			n=0;
			state=1;return n;case 1:
			n+=1;
			state=2;return n;case 2:
			n+=1;
			while(1)
			{	state=3;return n;case 3:
				n+=1;
			}
		}
	}
};

main()
{	countClass a;
	a.reset();
	while(1)
	{	printf("Now: %d\n", a.count());
		getchar();
	}
}

/*
main
[	co a=count.set
	df 1
	[	a.run
	]
]

count
[	int n=0
	yield n
	n+=1
	yield n
	n+=1
	df 1
	[	yield n
		n+=1
	]
]
*/
