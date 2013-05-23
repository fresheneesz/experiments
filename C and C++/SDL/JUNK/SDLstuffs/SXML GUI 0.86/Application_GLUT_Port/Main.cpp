#include "Headers.h"
#include <GL/glut.h>

EventsHandler handler;
FPSCounter    counter;
GUILabel     *fpsDisplay;
GUIFrame      guiFrame;

float         red   = 0.0f,
              blue  = 0.0f,
              green = 0.0f;

char          charBuffer[256];

int main(int argc, char **argv)
{
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGBA);
  glutInitWindowPosition(0, 0);
  glutInitWindowSize(700, 500);
  glutCreateWindow("GUI Test");

  initializeScene();

  // Keyboard
  glutKeyboardFunc(keyTyped);
  glutSpecialFunc(inputKey);

  // Display and Idle
  glutDisplayFunc(renderScene);
  glutIdleFunc(renderScene);

  glutReshapeFunc(setPerspective);

  // Mouse stuff
  glutMouseFunc(mouseClicked);
  glutMotionFunc(mouseDragged);
  glutPassiveMotionFunc(mouseMoved);

  glutMainLoop();
  TexturesManager::flushAllTextures();
  return(0);
}

void initializeScene()
{
  Logger::initialize();
  GLeeInit();
  MediaPathManager::registerPath("Data/Textures/");
  MediaPathManager::registerPath("Data/XML/");
  MediaPathManager::registerPath("Data/GUI/");
  guiFrame.GUIPanel::loadXMLSettings("GUILayout.xml");
  guiFrame.setGUIEventListener(&handler);

  fpsDisplay = (GUILabel*)guiFrame.getWidgetByCallbackString("fpsCounter");

  Logger::flush();

  glEnable(GL_DEPTH_TEST);
  glShadeModel(GL_SMOOTH);
  glEnable(GL_CULL_FACE);
  glCullFace(GL_BACK);
}

void renderScene()
{
  counter.markFrameStart();
  glClearColor(red, green, blue, 0.0f);
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  enter2DMode(guiFrame.getWidth(), guiFrame.getHeight());
  guiFrame.render(counter.getFrameInterval());
  exit2DMode();
 
  if(fpsDisplay)
  {
    sprintf(charBuffer, "Current FPS: %d", int(counter.getFPS()));
    fpsDisplay->setLabelString(charBuffer);
  }

  glutSwapBuffers();
  counter.markFrameEnd();
}

void EventsHandler::actionPerformed(GUIEvent &evt)
{
static int num  = 0;
  const std::string &callbackString  = evt.getCallbackString();
  GUIRectangle      *sourceRectangle = evt.getEventSource(),
                    *parent          = sourceRectangle ? sourceRectangle->getParent() : NULL;
  int                widgetType      = sourceRectangle->getWidgetType();

  if(widgetType == WT_SLIDER )
  {
    GUISlider  *slider = (GUISlider*)sourceRectangle;
    if(callbackString == "s1" || callbackString == "s2")
    {
      sprintf(charBuffer, "%s: %.2f",  (callbackString == "s1") ? "Slider 1" : "Slider 2",  slider->getProgress());
      slider->setLabelString(charBuffer);
    }

    if(callbackString == "red")   red   = slider->getProgress();
    if(callbackString == "blue")  blue  = slider->getProgress();
    if(callbackString == "green") green = slider->getProgress();
  }

  if(widgetType == WT_BUTTON)
  {
    GUIButton   *button = (GUIButton*)sourceRectangle;
    if(callbackString == "exit")
      if(button->isClicked())
        exit(0);
  }

  if(widgetType == WT_COMBO_BOX)
  {
    GUIComboBox  *comboBox = (GUIComboBox*)sourceRectangle;
    if(callbackString == "cb1")
    if(comboBox->getSelectedItem() == std::string("Select this item to exit"))
      exit(0);
  }

  if(widgetType == WT_RADIO_BUTTON)
  {
    GUIRadioButton   *radioButton = (GUIRadioButton*)sourceRectangle;
  }

}

void enter2DMode(GLint winWidth, GLint winHeight)
{
  Tuple4i  viewport;

  if(winWidth <= 0 || winHeight <= 0)
  {
    glGetIntegerv(GL_VIEWPORT, viewport);
    winWidth  = viewport.z;
    winHeight = viewport.w;
  }

  glMatrixMode(GL_MODELVIEW);
  glPushMatrix();
  glLoadIdentity();
  glMatrixMode(GL_PROJECTION);
  glPushMatrix();
  glLoadIdentity();
  gluOrtho2D(0, winWidth, winHeight, 0);
  glDisable(GL_DEPTH_TEST);
}

void exit2DMode()
{
  glMatrixMode(GL_PROJECTION);
  glPopMatrix();
  glMatrixMode(GL_MODELVIEW);
  glPopMatrix();
  glEnable(GL_DEPTH_TEST);
}

void setPerspective( int width, int height)
{
  float aspectRatio = 1.33f;
  height            = height <= 0 ? 1 : height;
  aspectRatio       = (float)width/height;

  glViewport(0, 0, width, height);
  glMatrixMode(GL_PROJECTION);

  glLoadIdentity();
  gluPerspective(90.0f, aspectRatio, 1.0f, 1500.0f);

  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();

  guiFrame.setDimensions(float(width), float(height));
  guiFrame.forceUpdate(true);
}

void mouseClicked(int button, int state, int x, int y)
{
  button  = (button == GLUT_LEFT_BUTTON ) ? MB_BUTTON1 :
            (button == GLUT_RIGHT_BUTTON) ? MB_BUTTON2 : MB_BUTTON3;

  MouseEvent event = MouseEvent(MB_BUTTON1, x, y, guiFrame.getHeight() - y);
  guiFrame.checkMouseEvents(event, (state == GLUT_DOWN) ? ME_CLICKED: ME_RELEASED);
}

void mouseDragged(int x, int y)
{
  MouseEvent event = MouseEvent(MB_UNKNOWN_BUTTON, x, y, guiFrame.getHeight() - y);
  guiFrame.checkMouseEvents(event, ME_DRAGGED);
}

void mouseMoved(int x, int y)
{
  MouseEvent event = MouseEvent(MB_UNKNOWN_BUTTON, x, y, guiFrame.getHeight() - y);
  guiFrame.checkMouseEvents(event, ME_MOVED);
}

void keyTyped(unsigned char key, int x, int y)
{
  guiFrame.checkKeyboardEvents(KeyEvent(key), KE_PRESSED);
  if (key == 27)
    exit(0);
}

void inputKey(int key, int x, int y)
{
}
