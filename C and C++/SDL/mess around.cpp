// Headers
#include <SDL/SDL.h>
#include <stdlib.h>
#include <windows.h>
#include <winbase.h>

// Main function
main( )
{   FreeConsole();
	SDL_Surface *screen, *screen2;

//    if( SDL_Init(SDL_INIT_VIDEO) < 0 ) 
	{
        fprintf(stderr,
                "Couldn't initialize SDL: %s\n", SDL_GetError());
        SDL_Quit();
	//	exit(1);
	}

    screen = SDL_SetVideoMode(640, 480, 8, SDL_SWSURFACE); SDL_Delay( 2000 );
    screen= SDL_SetVideoMode(640, 480, 16, SDL_SWSURFACE); SDL_Delay( 2000 );
   
    
    if ( screen == NULL ) {
        fprintf(stderr, "Couldn't set 640x480x8 video mode: %s\n",
                        SDL_GetError());
        SDL_Quit();
		exit(1);
        
    }
}
