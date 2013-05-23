#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
#	include <conio.h>
#else
#	include <ncurses.h>		// must link with -lncurses
#	include <unistd.h>
#	include <sys/time.h>
#endif


// MUST BE PLACED AT THE BEGGINING OF MAIN \/ \/ \/ \/
void init()
{
#if !defined(_WIN32) && !defined(WIN32) && !defined(__CYGWIN__)
	initscr(); // should be ended with endwin();
	refresh();
#endif
}

char getchec()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return getche();
	#else
		echo();
		return getch();
	#endif
}

char getchnec()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return getch();
	#else
		noecho();
		return getch();
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