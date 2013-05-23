#include<dos.h>
#include<conio.h>
#include<stdio.h>

struct Mouse	//Construct a new structure
{
	int x;		//The x coordinate of mouse
	int y;		//The y coordinate
	int button;	//The button status
};

void start_show_mouse()
{
	_AX=0;
	geninterrupt(0x33);	//Start mouse
	_AX=1;
	geninterrupt(0x33);	//Show mouse
}

Mouse GetMouse()
{
	Mouse t;
	_AX=3;
	geninterrupt(0x33);	//Get Button and coordinates
	t.x=_CX;
	t.y=_DX;
	t.button=_BX;
	return t;
}

void main()
{
	Mouse m;
	start_show_mouse();
	printf("Press left mouse button to quit");
	while(1)
	{
		m=GetMouse();
		gotoxy(65,1);
		printf("(%d,%d)",m.x,m.y);
		if(m.button==1)	//If left button is pressed
			break;			//then quit
	}
}
