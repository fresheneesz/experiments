#include <time.h>
#include <iostream.h>
#include <conio.h>

main()
{
	cout << "The. time. IS: " << time(0) << "\n";
	cout << "CLOCK: " << clock() << "\n";
	cout << "CLOCK: " << clock(); 
	 
	int a, theClock=0, theTime=0;
	while(1)
	{
		if(time(0)> theTime)
		{	theTime=time(0);
			cout << theTime << "\t" << clock() << "\t" << CLOCKS_PER_SEC << "\n";
		}
	}
}
