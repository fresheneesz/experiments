#include <dirent.h>
#include <stdio.h>
main()
{	DIR* d;
	struct dirent* f;
	d = opendir("./timing");
	f=readdir(d);
	while(f)
	{	printf("\n%s", (*f).d_name);
		f=readdir(d);
	}	
	getchar();
}
