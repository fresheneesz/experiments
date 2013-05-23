#include <ncurses.h>

main()
{
  initscr();
  refresh();
  char temp;
  noecho();
  for(int n=0; n<10; n++)
  {
    temp = getchar();
    printf("You pressed: %c\n\r",temp);		//must have the carriage return for some weird reason (probbaly cause newline isn't really a newline, but is just moving the cursor down one line
    refresh();
  }
  getchar();
  endwin();
}


//output for input "abcde"
/*

You pressed: a
You pressed: b
You pressed: c
You pressed: d
You pressed: e



*/
