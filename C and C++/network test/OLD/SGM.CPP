#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <termios.h>

#include <sys/ioctl.h>	/* ioctl FIONREAD ICANON ECHO */

int getch(void);   // wait for next keystroke (no echo)
int keyhit(void);  // check for pending keystrokes (no echo)

int main () 
{
  int key=0;
  int n=0;
    while (key!='O') 
	{	if(keyhit())
		{	key = getch();
			printf("Key %d is: %c\n",n, key);
		}
		n++;
	}
}

int getch(void) {
  struct termios term_settings,term_settings_saved;
  int x;
  if (tcgetattr(STDIN_FILENO,&term_settings))
    return -1;
  term_settings_saved=term_settings;
  term_settings.c_lflag &= ~ICANON ;
  term_settings.c_lflag &= ~ECHO ;
  term_settings.c_cc[VMIN]=1 ;
  term_settings.c_cc[VTIME]=0;
  if (tcsetattr (STDIN_FILENO, TCSANOW, &term_settings) < 0)
  x=getchar();
  tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
  return x;
}



static int initialized = 0;
static struct termios original_tty;




/* Call this just when main() does its initialization. */
/* Note: kbhit will call this if it hasn't been done yet. */
void kbinit()
{
  struct termios tty;
  tcgetattr(fileno(stdin), &original_tty);
  tty = original_tty;

  /* Disable ICANON line buffering, and ECHO. */
  tty.c_lflag &= ~ICANON;
  tty.c_lflag &= ~ECHO;
  tcsetattr(fileno(stdin), TCSANOW, &tty);

  /* Decouple the FILE*'s internal buffer. */
  /* Rely on the OS buffer, probably 8192 bytes. */
  setbuf(stdin, NULL);
  initialized = 1;
}

/* Call this just before main() quits, to restore TTY settings! */
void kbfini()
{
  if(initialized)
  {
    tcsetattr(fileno(stdin), TCSANOW, &original_tty);
    initialized = 0;
  }
}

int keyhit() 
{
  if(!initialized)
  {
    kbinit();
  }

  int bytesWaiting;
  ioctl(fileno(stdin), TCSANOW, &bytesWaiting);
  kbfini();
  return bytesWaiting;
}
