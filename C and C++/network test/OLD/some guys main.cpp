#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <termios.h>
#include <iostream.h>

int getchp(void);  // check for pending keystrokes (no echo)

int keyhit();

int main () 
{
  int key=0;
  int n=0;
    while (key!='O') 
	{	if(keyhit())
		{	key = getchp();
			printf("Key %d is: %c\n",n, key);
		}
		n++;
	}
}

struct termios term_settings, term_settings_saved;
int getchp(void) {
  
		int temp;
		if (tcgetattr(STDIN_FILENO,&term_settings))
			return -1;
		//do
		//{	
		cout << "orig: " << (int)term_settings.c_lflag << ", " << (int)term_settings.c_cc[VMIN] << ", " << (int)term_settings.c_cc[VTIME];
		term_settings_saved=term_settings;
		term_settings.c_lflag &= ~ICANON ;
		term_settings.c_lflag &= ~ECHO ;
		term_settings.c_cc[VMIN]=1;
		term_settings.c_cc[VTIME]=0;
		//if (tcsetattr (STDIN_FILENO, TCSANOW, &term_settings) < 0)
		//	return -1;
		cout << "  Before: " << (int)term_settings.c_lflag << ", " << (int)term_settings.c_cc[VMIN] << ", " << (int)term_settings.c_cc[VTIME];
		tcsetattr (STDIN_FILENO, TCSANOW, &term_settings);
		tcgetattr(STDIN_FILENO,&term_settings);
		cout << "  After: " << (int)term_settings.c_lflag << ", " << (int)term_settings.c_cc[VMIN] << ", " << (int)term_settings.c_cc[VTIME];
		//} while(term_settings.c_lflag & ECHO != 0);
		
		temp = getchar();
		tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
		return temp;
}


int keyhit()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return kbhit();
	#else
		tcgetattr(STDIN_FILENO,&term_settings);

		term_settings_saved=term_settings;
		term_settings.c_lflag &= ~ICANON ;
		term_settings.c_lflag &= ~ECHO ;
		term_settings.c_cc[VMIN]=1;
		term_settings.c_cc[VTIME]=0;
		tcsetattr (STDIN_FILENO, TCSANOW, &term_settings);
		
		
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
