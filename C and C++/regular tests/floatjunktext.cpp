#include <iostream.h>
main()
{
	float tempin;
	((char*)&tempin)[0]=115;
	((char*)&tempin)[1]=-12;
	((char*)&tempin)[2]=-86;
	((char*)&tempin)[3]=64;
	cout << tempin;
	getchar();
}
