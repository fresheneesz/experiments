#include <SDL/SDL.h>
#include <gl/gl.h>
#include <gl/glu.h>

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <windows.h>

static GLboolean should_rotate = GL_TRUE;

void EXIT(int);
static void setup_opengl( int width, int height );
static void handle_key_down( SDL_keysym* keysym );
static void process_events( void );
static void draw_screen( void );

int WINAPI WinMain(	HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow )
{   const SDL_VideoInfo* info = NULL;
    int width = 640;		// ..
    int height = 480;		// Dimensions of our window.
    int bpp;		// Color depth in bits of our window.
    int flags;		// Flags we will pass into SDL_SetVideoMode.
	int ticks, n=0;
	
	//MessageBox(NULL,"BAh","MessageBox",MB_OK | MB_ICONINFORMATION);
	FreeConsole(); //closes the console windows
	
    if( SDL_Init( SDL_INIT_EVERYTHING ) < 0 )    // First, initialize SDL's video subsystem.
    {   fprintf( stderr, "Video initialization failed: %s\n", SDL_GetError() );
        EXIT(1);      // Failed, exit.
    }

    info = SDL_GetVideoInfo( );    // Let's get some video information.
    if( !info )         // This should probably never happen. 
    {   fprintf( stderr, "Video query failed: %s\n", SDL_GetError() );
        EXIT(1);
    }
	
    bpp = info->vfmt->BitsPerPixel; // get the bpp (bits per pixel)

    SDL_GL_SetAttribute( SDL_GL_RED_SIZE, 5 );		// at least 5 bits of red..
    SDL_GL_SetAttribute( SDL_GL_GREEN_SIZE, 5 ); 	// greee ..
    SDL_GL_SetAttribute( SDL_GL_BLUE_SIZE, 5 );  	// and blue ..
    SDL_GL_SetAttribute( SDL_GL_DEPTH_SIZE, 16 );	// 16 bit depth buffer
    SDL_GL_SetAttribute( SDL_GL_DOUBLEBUFFER, 1 );  // double buffering 0/1 off/on

	// flags for video mode
    flags = SDL_OPENGL|SDL_RESIZABLE ;//| SDL_FULLSCREEN;
    if( SDL_SetVideoMode( width, height, bpp, flags ) == 0 )     // Set the video mode
	{   fprintf( stderr, "Video mode set failed for a variety of possible reasons, including DISPLAY not being set, ");
		fprintf( stderr, "the specified resolution not being available, etc. \nERROR: %s\n", SDL_GetError() );
        EXIT(1);
    }

    setup_opengl(width, height);

	// MAIN LOOP
	ticks=0;
    while(1)
    {	if(clock()-ticks>1)
		{	ticks=clock();
			process_events();
	    	draw_screen();
	    	//n++;
	    	
		}
		else
			SDL_Delay(1);
    }

    /* EXERCISE:  Record timings using SDL_GetTicks() and print out frames 
	 * per second at program end.
     */
	 return 0;     // Never reached.
}

void EXIT(int a)
{   SDL_Quit();
    exit(a);
}

static void handle_key_down( SDL_keysym* keysym )
{

    /* 
     * We're only interested if 'Esc' has
     * been presssed.
     *
     * EXERCISE: 
     * Handle the arrow keys and have that change the
     * viewing position/angle.
     */
    switch( keysym->sym ) {
    case SDLK_ESCAPE:
        EXIT( 0 );
        break;
    case SDLK_SPACE:
        should_rotate = !should_rotate;
        break;
    default:
        break;
    }

}

static void process_events( void )
{   SDL_Event event; // Our SDL event placeholder. 

    while( SDL_PollEvent(&event) )     // Grab all the events off the queue.
	{	switch(event.type)
		{case SDL_KEYDOWN:
            handle_key_down( &event.key.keysym ); // Handle key presses.
            break;
         case SDL_VIDEORESIZE:
			setup_opengl(event.resize.w, event.resize.h);
			break;
		 case SDL_QUIT:
            EXIT(0);         // Handle quit requests (like Ctrl-c). 
        }
    }
}

static void draw_screen( void )
{   static float angle = 0.0f; // Our angle of rotation.

    /* EXERCISE: Replace this awful mess with vertex arrays and a call to glDrawElements.
     *
     * EXERCISE: After completing the above, change it to use compiled vertex arrays.
     *
     * EXERCISE: Verify my windings are correct here ;).
     */
    static GLfloat v0[] = { -1.0f, -1.0f,  1.0f };
    static GLfloat v1[] = {  1.0f, -1.0f,  1.0f };
    static GLfloat v2[] = {  1.0f,  1.0f,  1.0f };
    static GLfloat v3[] = { -1.0f,  1.0f,  1.0f };
    static GLfloat v4[] = { -1.0f, -1.0f, -1.0f };
    static GLfloat v5[] = {  1.0f, -1.0f, -1.0f };
    static GLfloat v6[] = {  1.0f,  1.0f, -1.0f };
    static GLfloat v7[] = { -1.0f,  1.0f, -1.0f };
    
    
    static GLubyte red[]    = { 255,   0,   0, 255 };
    static GLubyte green[]  = {   0, 255,   0, 255 };
    static GLubyte blue[]   = {   0,   0, 255, 255 };
    static GLubyte white[]  = { 255, 255, 255, 255 };
    static GLubyte yellow[] = {   0, 255, 255, 255 };
    static GLubyte black[]  = {   0,   0,   0, 255 };
    static GLubyte orange[] = { 255, 255,   0, 255 };
    static GLubyte purple[] = { 255,   0, 255,   0 };

    glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT ); // Clear the color and depth buffers.

	glMatrixMode( GL_MODELVIEW ); 			// We don't want to modify the projection matrix.
    glLoadIdentity( );

    glTranslatef( 0.0, 0.0, -5.0 );			// Move down the z-axis.

    glRotatef( angle, 0.1, 1.0, 0.0 );		// Rotate.

    if( should_rotate )
    {	angle += .5;
		if( angle > 360.0f )
			angle = 0.0f;
		
    }

    glBegin( GL_TRIANGLES );    // Send our triangle data to the pipeline.

    glColor4ubv( red 	);
    glVertex3fv( v0 	);
    glColor4ubv( green 	);
    glVertex3fv( v1 	);
    glColor4ubv( blue 	);
    glVertex3fv( v2 	);

    glColor4ubv( red 	);
    glVertex3fv( v0 	);
    glColor4ubv( blue 	);
    glVertex3fv( v2 	);
    glColor4ubv( white 	);
    glVertex3fv( v3 	);

    glColor4ubv( green 	);
    glVertex3fv( v1 	);
    glColor4ubv( black 	);
    glVertex3fv( v5 	);
    glColor4ubv( orange );
    glVertex3fv( v6 	);

    glColor4ubv( green 	);
    glVertex3fv( v1 	);
    glColor4ubv( orange );
    glVertex3fv( v6 	);
    glColor4ubv( blue 	);
    glVertex3fv( v2 	);

    glColor4ubv( black 	);
    glVertex3fv( v5 	);
    glColor4ubv( yellow );
    glVertex3fv( v4 	);
    glColor4ubv( purple );
    glVertex3fv( v7 	);

    glColor4ubv( black );
    glVertex3fv( v5 );
    glColor4ubv( purple );
    glVertex3fv( v7 );
    glColor4ubv( orange );
    glVertex3fv( v6 );

    glColor4ubv( yellow );
    glVertex3fv( v4 );
    glColor4ubv( red );
    glVertex3fv( v0 );
    glColor4ubv( white );
    glVertex3fv( v3 );

    glColor4ubv( yellow );
    glVertex3fv( v4 );
    glColor4ubv( white );
    glVertex3fv( v3 );
    glColor4ubv( purple );
    glVertex3fv( v7 );

    glColor4ubv( white );
    glVertex3fv( v3 );
    glColor4ubv( blue );
    glVertex3fv( v2 );
    glColor4ubv( orange );
    glVertex3fv( v6 );

    glColor4ubv( white );
    glVertex3fv( v3 );
    glColor4ubv( orange );
    glVertex3fv( v6 );
    glColor4ubv( purple );
    glVertex3fv( v7 );

    glColor4ubv( green );
    glVertex3fv( v1 );
    glColor4ubv( red );
    glVertex3fv( v0 );
    glColor4ubv( yellow );
    glVertex3fv( v4 );

    glColor4ubv( green );
    glVertex3fv( v1 );
    glColor4ubv( yellow );
    glVertex3fv( v4 );
    glColor4ubv( black );
    glVertex3fv( v5 );

    glEnd( );

    /* EXERCISE: Draw text telling the user that 'Spc' pauses the rotation and 'Esc' quits.
     * Do it using vetors and textured quads.
     */

    /* Swap the buffers. This this tells the driver to render the next frame from the contents of the
     * back-buffer, and to set all rendering operations to occur on what was the front-buffer.
     *
     * Double buffering prevents nasty visual tearing from the application drawing on areas of the
     * screen that are being updated at the same time.
     */
    SDL_GL_SwapBuffers( );
}

static void setup_opengl( int width, int height )
{
    float ratio = (float) width / (float) height;

    glShadeModel( GL_SMOOTH );  	// Our shading model--Gouraud (smooth).

    glCullFace( GL_BACK ); 			// Culling.
    glFrontFace( GL_CCW );
    glEnable( GL_CULL_FACE );
    
    glClearColor( 0, 0, 0, 0 );		// Set the clear color.

    glViewport( 0, 0, width, height );		// Setup our viewport.

    glMatrixMode( GL_PROJECTION );		    // Change to the projection matrix and set our viewing volume.
    glLoadIdentity( );

    gluPerspective( 60.0, ratio, 1.0, 1024.0 );    // EXERCISE: Replace this with a call to glFrustum.
}
