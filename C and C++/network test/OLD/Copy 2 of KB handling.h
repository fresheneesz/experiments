#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
#	include <conio.h>
	//nothing
#else	//#elif defined(SYSV) || defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
//#	include <sys/time.h>
#	include <stdio.h>
#	include <stdlib.h>
#	include <unistd.h>
#	include <termios.h>
	struct termios term_settings,term_settings_saved;
#endif

int getchec()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		char a;
		a = getche();
		if(a == '\r')
		{	a='\n';
			printf("\n");
		}
		else if(a == '\b')
		{	printf(" \b");
		}
		return a;
	#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
		int temp;
		if (tcgetattr(STDIN_FILENO,&term_settings))
			return -1;
		term_settings_saved=term_settings;
		term_settings.c_lflag &= ~ICRNL;
		term_settings.c_lflag &= ~ICANON ;
		term_settings.c_cc[VMIN]=1;
		term_settings.c_cc[VTIME]=0;
		term_settings.c_cc[VINTR]=0xFF;
  		term_settings.c_cc[VSUSP]=0xFF;
  		term_settings.c_cc[VQUIT]=0xFF;
		if (tcsetattr (STDIN_FILENO, TCSANOW, &term_settings) < 0)
		{	tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
			return -1;
		}
		temp = getchar();
		tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
		return temp;
	#endif
}

int getchnec()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		char a;
		a = getch();
		if(a == '\r')
		{	a='\n';
		}
		return a;
	#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
		int temp;
		if (tcgetattr(STDIN_FILENO,&term_settings))
			return -1;
		term_settings_saved=term_settings;
		term_settings.c_lflag &= ~ICRNL;
		term_settings.c_lflag &= ~ICANON ;
		term_settings.c_lflag &= ~ECHO ;
		term_settings.c_cc[VMIN]=1;
		term_settings.c_cc[VTIME]=0;
		term_settings.c_cc[VINTR]=0xFF;
  		term_settings.c_cc[VSUSP]=0xFF;
  		term_settings.c_cc[VQUIT]=0xFF;
		if (tcsetattr(STDIN_FILENO, TCSANOW, &term_settings) < 0)
		{	tcsetattr(STDIN_FILENO, TCSANOW, &term_settings_saved);
			return -1;
		}
		temp = getchar();
		tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
		return temp;
	#endif
}



int keyhit()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return kbhit();
	#else
		if (tcgetattr(STDIN_FILENO,&term_settings))
			return false;
		term_settings_saved=term_settings;
		term_settings.c_lflag &= ~ICRNL;
		term_settings.c_lflag &= ~ICANON ;
		term_settings.c_cc[VMIN]=0;
		term_settings.c_cc[VTIME]=0;
		term_settings.c_cc[VINTR]=0xFF;
  		term_settings.c_cc[VSUSP]=0xFF;
  		term_settings.c_cc[VQUIT]=0xFF;
		if (tcsetattr (STDIN_FILENO, TCSANOW, &term_settings) < 0)
		{	tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
			return false;
		}
		fd_set obscureFileDescriptorThing;
		FD_SET(STDIN_FILENO, &obscureFileDescriptorThing);
		struct timeval TimeZero;
		TimeZero.tv_sec=0; TimeZero.tv_usec=0;
		int test=select(1,&obscureFileDescriptorThing,0,0,&TimeZero);
		
		tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
		if(test==1)
			return true;
		else
			return false;
	#endif
}
