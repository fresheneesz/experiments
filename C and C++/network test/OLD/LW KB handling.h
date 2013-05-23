#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
#	include <conio.h>
#elif defined(BSD) 		// ``classic'' (V7, BSD) Unix
#	include <stdio.h>
#	include <sgtty.h>
#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
#	include <stdio.h>
#	include <termio.h>
#endif



#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)	//Windows
	//nothing
#elif defined(BSD) 		// ``classic'' (V7, BSD) Unix
	static struct sgttyb savemodes;
	static int havemodes = 0;
#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
	static struct termio savemodes;
	static int havemodes = 0;
#endif
/*
int tty_break()
{
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)	//Windows
		return 0;
	#elif defined(BSD) 		// ``classic'' (V7, BSD) Unix
		struct sgttyb modmodes;
		if(ioctl(fileno(stdin), TIOCGETP, &savemodes) < 0)
			return -1;
		havemodes = 1;
		modmodes = savemodes;
		modmodes.sg_flags |= CBREAK;
		return ioctl(fileno(stdin), TIOCSETN, &modmodes);
	#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
		struct termio modmodes;
		if(ioctl(fileno(stdin), TCGETA, &savemodes) < 0)
			return -1;
		havemodes = 1;
		modmodes = savemodes;
		modmodes.c_lflag &= ~ICANON;
		modmodes.c_cc[VMIN] = 1;
		modmodes.c_cc[VTIME] = 0;
		return ioctl(fileno(stdin), TCSETAW, &modmodes);
	#endif
}

int tty_fix()
{
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return 0;
	#elif defined(BSD) 		// ``classic'' (V7, BSD) Unix
		if(!havemodes)
			return 0;
		return ioctl(fileno(stdin), TIOCSETN, &savemodes);
	#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
		if(!havemodes)
			return 0;
		return ioctl(fileno(stdin), TCSETAW, &savemodes);
	#endif
}
*/

int getchec()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return getche();
	#elif defined(BSD) 		// ``classic'' (V7, BSD) Unix
		int temp;
		struct sgttyb modmodes;
		if(ioctl(fileno(stdin), TIOCGETP, &savemodes) < 0)
			return -1;
		havemodes = 1;
		modmodes = savemodes;
		modmodes.sg_flags |= CBREAK;
		ioctl(fileno(stdin), TIOCSETN, &modmodes);
		
		temp = getchar();
		
		if(!havemodes || ioctl(fileno(stdin), TIOCSETN, &savemodes) < 0)
			return -1;
		return temp;
	#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
		int temp;
		struct termio modmodes;
		if(ioctl(fileno(stdin), TCGETA, &savemodes) < 0)
			return -1;
		havemodes = 1;
		modmodes = savemodes;
		modmodes.c_lflag &= ~ICANON;
		modmodes.c_cc[VMIN] = 1;
		modmodes.c_cc[VTIME] = 0;
		ioctl(fileno(stdin), TCSETAW, &modmodes);
		
		temp = getchar();
		
		if(!havemodes || ioctl(fileno(stdin), TCSETAW, &savemodes) < 0)
			return -1;
		return temp;
	#endif
	/*
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return getche();
	#else		// assume unix if not windows
		int temp;
		tty_break();
		temp = getchar();
		tty_fix();
		return temp;
	#endif
	*/
}

/*
int tty_break()
{
	struct sgttyb modmodes;
	if(ioctl(fileno(stdin), TIOCGETP, &savemodes) < 0)
		return -1;
	havemodes = 1;
	modmodes = savemodes;
	modmodes.sg_flags |= CBREAK;
	return ioctl(fileno(stdin), TIOCSETN, &modmodes);
}

int tty_fix()
{
	if(!havemodes)
		return 0;
	return ioctl(fileno(stdin), TIOCSETN, &savemodes);
}

int getchec()
{	int temp;
	tty_break();
	temp = getchar();
	tty_fix();
	return temp;
}






static struct termio savemodes;
static int havemodes = 0;

int tty_break()
{
	struct termio modmodes;
	if(ioctl(fileno(stdin), TCGETA, &savemodes) < 0)
		return -1;
	havemodes = 1;
	modmodes = savemodes;
	modmodes.c_lflag &= ~ICANON;
	modmodes.c_cc[VMIN] = 1;
	modmodes.c_cc[VTIME] = 0;
	return ioctl(fileno(stdin), TCSETAW, &modmodes);
}

int tty_getchar()
{
	return getchar();
}

int tty_fix()
{
	if(!havemodes)
		return 0;
	return ioctl(fileno(stdin), TCSETAW, &savemodes);
}

#endif

int keyhit()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return kbhit();
	#else
		int test;
		fd_set obscureFileDescriptorThing;
		FD_SET(0, &obscureFileDescriptorThing);
		struct timeval TimeZero;
		TimeZero.tv_sec=0;
		TimeZero.tv_usec=0;
		test=select(1,&obscureFileDescriptorThing,0,0,&TimeZero);
		if(test==1)
			return 1;
		else
			return 0;
	#endif
}





/*
#ifndef SYSV
struct sgttyb savetty, settty;

int set_term()
{	struct sgttyb SaveTTY, settty;
   ioctl(0, TIOCGETP, &SaveTTY);
   // saves original 
   ioctl(0, TIOCGETP, &settty); // get orig to modify 
   settty.sg_flags |= CBREAK; 
   settty.sg_flags &= ~ECHO;
   ioctl(0, TIOCSETP, &settty);
 }

 int reset_term()
 {	ioctl(0, TIOCSETP, &SaveTTY);
 }
 #else
 struct termio SaveTTY, settty;
 int set_term()
 {
   ioctl(0, TCGETA, &SaveTTY);
   ioctl(0, TCGETA, &settty);
   settty.c_lflag &= ~ICANON;
   settty.c_lflag &= ~ECHO;
   ioctl(0, TCSETAF, &settty);
 }

 int reset_term()
 {
   ioctl(0, TCSETAF, &SaveTTY);
 }
 #endif

char getchec()
{	set_term();
	return getchar();
	reset_term();	
}

char getchnec()
{	set_term();
	return getchar();
	reset_term();	
}

*/
