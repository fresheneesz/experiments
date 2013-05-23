
#include "SDL/SDL.h"
#include <string>

const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;      //Screen attributes
const int SCREEN_BPP = 32;

const int FRAMES_PER_SECOND = 20;   //The frame rate

const int CLIP_MOUSEOVER = 0;       //The button states in the sprite sheet
const int CLIP_MOUSEOUT = 1;
const int CLIP_MOUSEDOWN = 2;
const int CLIP_MOUSEUP = 3;

SDL_Surface *buttonSheet = NULL;    //The surfaces
SDL_Surface *screen = NULL;

SDL_Event event;         //The event structure

SDL_Rect clips[ 4 ];    //The clip regions of the sprite sheet

class Button            //The button
{   private:
    
    SDL_Rect box;       //The attributes of the button
    SDL_Rect* clip;     //The part of the button sprite sheet that will be shown
    
    public:
        
    Button( int x, int y, int w, int h );    //Initialize the variables
    void handle_events();                    //Handles events and set the button's sprite region
    void show();                            //Shows the button on the screen
};


SDL_Surface *load_image( std::string filename ) 
{
    SDL_Surface* loadedImage = NULL;                    //The image that's loaded
    SDL_Surface* optimizedImage = NULL;                 //The optimized surface that will be used
    
    loadedImage = SDL_LoadBMP( filename.c_str() );      //Load the image

    if( loadedImage != NULL )                                     //If the image loaded
    {   optimizedImage = SDL_DisplayFormat( loadedImage );        //Create an optimized surface
        SDL_FreeSurface( loadedImage );                 //Free the old surface

        if( optimizedImage != NULL )                    //If the surface was optimized
        {   //Color key surface
            SDL_SetColorKey( optimizedImage, SDL_RLEACCEL | SDL_SRCCOLORKEY, SDL_MapRGB( optimizedImage->format, 0, 0xFF, 0xFF ) );
        }
    }

    return optimizedImage;                              //Return the optimized surface
}

void apply_surface( int x, int y, SDL_Surface* source, SDL_Surface* destination, SDL_Rect* clip = NULL )
{   SDL_Rect offset;        //Holds offsets
    
    offset.x = x;           //Get offsets
    offset.y = y;

    SDL_BlitSurface( source, clip, destination, &offset );    //Blit
}

bool init()
{   if( SDL_Init( SDL_INIT_EVERYTHING ) == -1 )         //Initialize all SDL subsystems
    {   return false;    
    }
    screen = SDL_SetVideoMode( SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_BPP, SDL_SWSURFACE );    //Set up the screen
    
    if( screen == NULL )                         //If there was in error in setting up the screen
    {   return false;    
    }
    SDL_WM_SetCaption( "Button Test", NULL );    //Set the window caption
    
    return true;                            //If everything initialized fine
}

bool load_files()
{    buttonSheet = load_image( "background.bmp" );    //Load the button sprite sheet
    
    if( buttonSheet == NULL )    //If there was a problem in loading the button sprite sheet
    {   return false;    
    }
    
    return true;        //If everything loaded fine
}

void clean_up()
{   SDL_FreeSurface( buttonSheet );    //Free the surface
    SDL_Quit();    //Quit SDL
}

void set_clips()
{

    clips[ CLIP_MOUSEOUT ].x = 320;
    clips[ CLIP_MOUSEOUT ].y = 0;
    clips[ CLIP_MOUSEOUT ].w = 320;
    clips[ CLIP_MOUSEOUT ].h = 240;

    clips[ CLIP_MOUSEDOWN ].x = 0;
    clips[ CLIP_MOUSEDOWN ].y = 240;
    clips[ CLIP_MOUSEDOWN ].w = 320;
    clips[ CLIP_MOUSEDOWN ].h = 240;
    
    clips[ CLIP_MOUSEUP ].x = 320;
    clips[ CLIP_MOUSEUP ].y = 240;
    clips[ CLIP_MOUSEUP ].w = 320;
    clips[ CLIP_MOUSEUP ].h = 240;    
}

Button::Button( int x, int y, int w, int h )
{
    //Set the button's attributes
    box.x = x;
    box.y = y;
    box.w = w;
    box.h = h;
    
    //Set the default sprite
    clip = &clips[ CLIP_MOUSEOUT ];
}
    
void Button::handle_events()
{
    //The mouse offsets
    int x = 0, y = 0;
    
    //If a mouse button was pressed
    if( event.type == SDL_MOUSEBUTTONDOWN )
    {
        //If the left mouse button was pressed
        if( event.button.button == SDL_BUTTON_LEFT )
        {
            //Get the mouse offsets
            x = event.button.x;
            y = event.button.y;
        
            //If the mouse is over the button
            if( ( x > box.x ) && ( x < box.x + box.w ) && ( y > box.y ) && ( y < box.y + box.h ) )
            {
                //Set the button sprite
                clip = &clips[ CLIP_MOUSEDOWN ];
            }
        }
    }
    //If a mouse button was released
    if( event.type == SDL_MOUSEBUTTONUP )
    {
        //If the left mouse button was released
        if( event.button.button == SDL_BUTTON_LEFT )
        { 
            //Get the mouse offsets
            x = event.button.x;
            y = event.button.y;
        
            //If the mouse is over the button
            if( ( x > box.x ) && ( x < box.x + box.w ) && ( y > box.y ) && ( y < box.y + box.h ) )
            {
                //Set the button sprite
                clip = &clips[ CLIP_MOUSEUP ];
            }
        }
    }
}
    
void Button::show()
{
    //Show the button
    apply_surface( box.x, box.y, buttonSheet, screen, clip );
}


int main( int argc, char* args[] )
{
    //Quit flag
    bool quit = false;
    
    
    //Initialize
    if( init() == false )
    {
        return 1;
    }
    
    //Load the files
    if( load_files() == false )
    {
        return 1;    
    }
    
    //Clip the sprite sheet
    set_clips();
    
    //Make the button
    Button myButton( 170, 120, 320, 240 );
    
    //While the user hasn't quit
    while( quit == false )
    {
        
        //If there's events to handle
        if( SDL_PollEvent( &event ) )
        {
            //Handle button events
            myButton.handle_events();
            
            //If the user has Xed out the window
            if( event.type == SDL_QUIT )
            {
                //Quit the program
                quit = true;
            }    
        }

        //Fill the screen white
        //SDL_FillRect( screen, &screen->clip_rect, SDL_MapRGB( screen->format, 0xFF, 0xFF, 0xFF ) );
        
        //Show the button
        myButton.show();
        
        //Update the screen
        if( SDL_Flip( screen ) == -1 )
        {
            return 1;    
        }
        
    }
    
    //Clean up
    clean_up();
    
    return 0;    
}
