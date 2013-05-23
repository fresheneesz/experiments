#include <iostream.h>
//#include <windows.h>

typedef int va_list;
//#include <stdarg.h>
#include <windef.h>
#include <winbase.h>
#include <time.h>

main()
{
  LARGE_INTEGER ticksPerSecond;
  LARGE_INTEGER tick;   // A point in time
  LARGE_INTEGER time;   // For converting tick into real time

	int a, b;
	
	QueryPerformanceFrequency(&ticksPerSecond);

	QueryPerformanceCounter(&tick);

	time.QuadPart = tick.QuadPart/ticksPerSecond.QuadPart;

	cout << time.QuadPart/60/60 << "   " << ticksPerSecond.QuadPart;

  getchar();
}
