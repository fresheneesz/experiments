#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
#	include <conio.h>
	//nothing
/*#elif defined(BSD) 		// ``classic'' (V7, BSD) Unix
#	include <stdio.h>
#	include <sgtty.h>
#	include <unistd.h>
#	include <sys/time.h>
	static struct sgttyb savemodes;
*/
#else	//#elif defined(SYSV) || defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
#	include <stdio.h>
#	include <termios.h>
#	include <unistd.h>
#	include <sys/time.h>
	//static struct termio savemodes;
#endif


//#	include <ncurses.h>		// must link with -lncurses

/*
int getchec()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return getche();
	/*#elif defined(BSD) 		// ``classic'' (V7, BSD) Unix
		int temp;
		struct sgttyb modmodes;
		if(ioctl(fileno(stdin), TIOCGETP, &savemodes) < 0)
			return -1;
		modmodes = savemodes;
		modmodes.sg_flags |= CBREAK;
		ioctl(fileno(stdin), TIOCSETN, &modmodes);
		
		temp = getchar();
		
		if(ioctl(fileno(stdin), TIOCSETN, &savemodes) < 0)
			return -1;
		return temp;
	*/
/*	#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
		int temp;
		struct termio modmodes;
		if(ioctl(fileno(stdin), TCGETA, &savemodes) < 0)
			return -1;
		modmodes = savemodes;
		modmodes.c_lflag &= ~ICANON;
		modmodes.c_cc[VMIN] = 1;
		modmodes.c_cc[VTIME] = 0;
		ioctl(fileno(stdin), TCSETAW, &modmodes);
		
		temp = getchar();
		
		if(ioctl(fileno(stdin), TCSETAW, &savemodes) < 0)
			return -1;
		return temp;
	#endif
}
*/


int getchnec()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return getch();
	/*#elif defined(BSD) 		// ``classic'' (V7, BSD) Unix
		int temp;
		struct sgttyb modmodes;
		if(ioctl(fileno(stdin), TIOCGETP, &savemodes) < 0)
			return -1;
		modmodes = savemodes;
		modmodes.sg_flags |= CBREAK;
		modmodes.sg_flags |= ~ECHO;
		ioctl(fileno(stdin), TIOCSETN, &modmodes);
		
		temp = getchar();
		
		if(ioctl(fileno(stdin), TIOCSETN, &savemodes) < 0)
			return -1;
		return temp;
	*/
	#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
		/*
		int temp;
		struct termio modmodes;
		if(ioctl(fileno(stdin), TCGETA, &savemodes) < 0)
			return -1;
		modmodes = savemodes;
		modmodes.c_lflag &= ~ICANON;
		modmodes.c_lflag &= ~ECHO;
		modmodes.c_cc[VMIN] = 1;
		modmodes.c_cc[VTIME] = 0;
		ioctl(fileno(stdin), TCSETAW, &modmodes);
		
		temp = getchar();
		
		if(ioctl(fileno(stdin), TCSETAW, &savemodes) < 0)
			return -1;
		return temp;	//*/
		//*
		int temp;
		if (tcgetattr(STDIN_FILENO,&term_settings))
			return -1;
		term_settings_saved=term_settings;
		term_settings.c_lflag &= ~ICANON ;
		term_settings.c_lflag &= ~ECHO ;
		term_settings.c_cc[VMIN]=1;
		term_settings.c_cc[VTIME]=0;
		temp = getchar();
		tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
			return temp;
		//*/
	#endif
}



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
