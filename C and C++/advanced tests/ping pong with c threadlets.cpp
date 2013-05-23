#include <stdio.h>

//typedef void* (*vv)(void* args);

class printClass
{public:
	int state;
	int n;
	void reset()
	{	state=0;
	}
	void print(char* moose)
	{	switch(state)
		{case 0:
			n=0;
			while(1)
			{	printf("%s%d",moose, n);
				state=1;return;
		 case 1:
				n+=1;
			}
		}
	}
};

class scheduler
{public:
	printClass* queue[10];
	char* queue2[10];
	int n;
	scheduler()
	{	n=0;
	}
	void add(printClass* in, char* args)
	{	queue[n]=in;
		queue2[n]=args;
		(*(queue[n])).reset();
		n+=1;
	}
	void run()
	{	while(1)
		{	(*(queue[0])).print(queue2[0]);
			(*(queue[1])).print(queue2[1]);
			getchar();
		}
	}
};

main()
{	printClass ping, pong;
	scheduler a;
	a.add(&ping, "ping ");
	a.add(&pong, "pong  ");
	a.run();
	getchar();
}
