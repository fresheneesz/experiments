#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
#	include <conio.h>
#else
#	include <ncurses.h>		// must link with -lncurses
#	include <unistd.h>
#	include <sys/time.h>
#endif

// MUST BE PLACED AT THE BEGGINING OF MAIN \/ \/ \/ \/
/*
#if !defined(_WIN32) && !defined(WIN32) && !defined(__CYGWIN__)
	initscr(); // should be ended with endwin();
	refresh();
#endif
*/

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
/*
#include <fcntl.h>
#include <sys/types.h>
#include <unistd.h>
#include <curses.h>
#include <termios.h>

#ifndef SYSV
struct sgttyb savetty, settty;

int set_term()
{	struct sgttyb savetty, settty;
   ioctl(0, TIOCGETP, &savetty);
   // saves original 
   ioctl(0, TIOCGETP, &settty); // get orig to modify 
   settty.sg_flags |= CBREAK; 
   settty.sg_flags &= ~ECHO;
   ioctl(0, TIOCSETP, &settty);
 }

 int reset_term()
 {	ioctl(0, TIOCSETP, &savetty);
 }
 #else
 struct termio savetty, settty;
 int set_term()
 {
   ioctl(0, TCGETA, &savetty);
   ioctl(0, TCGETA, &settty);
   settty.c_lflag &= ~ICANON;
   settty.c_lflag &= ~ECHO;
   ioctl(0, TCSETAF, &settty);
 }

 int reset_term()
 {
   ioctl(0, TCSETAF, &savetty);
 }
 #endif


main()
{	//make the terminal unbuffered
	set_term();
	while (1) 
	{	char a;

		if ((a=getchar())!=EOF) 
		{	//we are going to get a char, print it out, followed by 2 dots
      		putchar(a);
      		fflush(stdout);
			printf("..");
		} else 
		{	//set the terminal like we got it
			reset_term();
			exit(1);
    	}
	}
}
*/
