/*	compile with:
gcc -DBUILD_DLL -shared -o _DLLname_.dll -Wl,--out-implib,lib_LIBname_.a make_dll.c
	_DLLname_ and _LIBname_ being changable.
*/

#include <stdio.h>
#include "dll.h"

EXPORT void dllfunc(void)
{	printf ("Hello TWO\n");
	getchar();
}
