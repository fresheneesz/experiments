/*
 * This program waits for a character.  It then outputs that character
 * repeatedly until another character is input, and then outputs that
 * character repeatedly until and so on.
 */

#include <stdio.h>
#include <sys/types.h>
#include <termios.h>
#include <unistd.h>

int getchnec()
{
}

int main(void)
{
  int            count;
  int            jndex;
  int            result;
  int            virgin;

  char           echoed_data;

  char           in_buffer[80];

  struct termios tp1;
  struct termios tp2;

  //virgin=1;
  echoed_data='X';

  printf("Type a space character to exit.\n");

  tcgetattr(0,&tp1);

  tp2=tp1;

  tp2.c_iflag&=~ICRNL;
  tp2.c_lflag&=~ICANON;
  tp2.c_lflag&=~ECHO;
  tp2.c_cc[VMIN ]=1;
  tp2.c_cc[VTIME]=0;
  tp2.c_cc[VINTR]=0xFF;
  tp2.c_cc[VSUSP]=0xFF;
  tp2.c_cc[VQUIT]=0xFF;

  tcsetattr(0,TCSANOW,&tp2);

  do
  {
    //in_buffer[0]=0;

    in_buffer[0]=getchar();//count=read(0,in_buffer,1);

    /*if(virgin)
    {
      virgin=0;

      tp2.c_cc[VMIN]=0;

      tcsetattr(0,TCSANOW,&tp2);
    }*/

    if(in_buffer[0]>=0)//count>0)
    {	echoed_data = in_buffer[0];
		printf("Character pressed was: %c\n",echoed_data);
	}

    

    //fflush(stdout);

  } while(echoed_data!='O');

  printf("\n");

  tcsetattr(0,TCSANOW,&tp1);

} /* main(void) */
