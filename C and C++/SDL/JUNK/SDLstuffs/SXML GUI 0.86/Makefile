# Temporary makefile!

DEBUG =

CPPFLAGS = $(DEBUG)#
CFLAGS = $(DEBUG)

all : lib/libsxmlgui.a Application_GLUT_Port/sxmlapp

GUI_OBJECTS = GUI/GUIButton.o GUI/GUICheckBox.o GUI/GUIClippedRectangle.o GUI/GUIComboBox.o GUI/GUIEvent.o GUI/GUIFont.o GUI/GUIFontManager.o GUI/GUIFrame.o GUI/GUILabel.o GUI/GUIPanel.o GUI/GUIRadioButton.o GUI/GUIRectangle.o GUI/GUISeparator.o GUI/GUISlider.o GUI/GUITabbedPanel.o GUI/GUITexCoordDescriptor.o GUI/GUIText.o GUI/GUITextBox.o GUI/GUIAlphaElement.o

TOOL_OBJECTS = Tools/Font.o Tools/GLee.o Tools/GenUtils.o Tools/TextureUtils.o Tools/TimeUtils.o  Tools/XMLUtils.o

OBJECTS = $(GUI_OBJECTS) $(TOOL_OBJECTS) 

lib/libsxmlgui.a : $(OBJECTS)
	ar -r lib/libsxmlgui.a $(OBJECTS)

APP_OBJECTS = Application_GLUT_Port/Main.o

Application_GLUT_Port/sxmlapp : $(APP_OBJECTS)
	g++ $(DEBUG) -o Application_GLUT_Port/sxmlapp $(APP_OBJECTS) Tools/XMLUtils.o -Llib -lsxmlgui -lGL -lGLU -lglut -lglpng

.PHONY : clean

clean :
	rm $(OBJECTS) $(APP_OBJECTS) lib/libsxmlgui.a Application_GLUT_Port/sxmlapp
