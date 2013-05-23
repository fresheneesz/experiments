#include <iostream.h>
#include <SDL/SDL.h>

void DrawPixel(SDL_Surface *screen, int x, int y, Uint8 R, Uint8 G, Uint8 B);
void Slock(SDL_Surface *screen);
void Sulock(SDL_Surface *screen);

int main(int argc, char *argv[])
{	int sound, done;
	atexit(SDL_Quit);
	
	if( SDL_Init(SDL_INIT_VIDEO|SDL_INIT_AUDIO) <0 )
	{	cout << "Unable to init SDL: " << SDL_GetError();
		return 1;
	}
	
	SDL_Surface *screen;
	
	if ( ( screen = SDL_SetVideoMode(640, 480, 32, SDL_HWSURFACE|SDL_DOUBLEBUF) )== NULL )
	{	cout << "Unable to set 640x480 video: " << SDL_GetError();
		return 1;
	}
	
	unsigned int init = SDL_WasInit(SDL_INIT_AUDIO);
	if(init & SDL_INIT_AUDIO)
	{	sound = 1;  // Audio init sucessful, use sound
	}
	else 
	{	sound = 0;  // Audio init unsucessful, don't use sound
	}
	
	done=1;
	while(done)
	{
		Slock(screen);
		for(int x=0;x<640;x++)
		{
		  for(int y=0;y<480;y++)
		  {
		    DrawPixel(screen, x,y,y/2,y/2,x/3);
		  }
		}

	
	/*
	DrawPixel(screen,5,3,40,140,200);
	DrawPixel(screen,4,3,40,140,200);
	DrawPixel(screen,5,4,40,140,200);
	DrawPixel(screen,5,5,40,140,200);
	DrawPixel(screen,3,3,40,140,200);*/
	Sulock(screen);
	SDL_Flip(screen);
	}
//	getchar();
	
}

void DrawPixel(SDL_Surface *screen, int x, int y, Uint8 R, Uint8 G, Uint8 B)
{
  Uint32 color = SDL_MapRGB(screen->format, R, G, B);
  switch (screen->format->BytesPerPixel)
  {
    case 1: // Assuming 8-bpp
      {
        Uint8 *bufp;
        bufp = (Uint8 *)screen->pixels + y*screen->pitch + x;
        *bufp = color;
      }
      break;
    case 2: // Probably 15-bpp or 16-bpp
      {
        Uint16 *bufp;
        bufp = (Uint16 *)screen->pixels + y*screen->pitch/2 + x;
        *bufp = color;
      }
      break;
    case 3: // Slow 24-bpp mode, usually not used
      {
        Uint8 *bufp;
        bufp = (Uint8 *)screen->pixels + y*screen->pitch + x * 3;
        if(SDL_BYTEORDER == SDL_LIL_ENDIAN)
        {
          bufp[0] = color;
          bufp[1] = color >> 8;
          bufp[2] = color >> 16;
        } else {
          bufp[2] = color;
          bufp[1] = color >> 8;
          bufp[0] = color >> 16;
        }
      }
      break;
    case 4: // Probably 32-bpp
      {
        Uint32 *bufp;
        bufp = (Uint32 *)screen->pixels + y*screen->pitch/4 + x;
        *bufp = color;
      }
      break;
  }
}

void Slock(SDL_Surface *screen)
{
  if ( SDL_MUSTLOCK(screen) )
  {
    if ( SDL_LockSurface(screen) < 0 )
    {
      return;
    }
  }
}

void Sulock(SDL_Surface *screen)
{
  if ( SDL_MUSTLOCK(screen) )
  {
    SDL_UnlockSurface(screen);
  }
}

