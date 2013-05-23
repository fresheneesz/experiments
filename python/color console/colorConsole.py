"""
Colors text in console mode application (win32).
Uses ctypes and Win32 methods SetConsoleTextAttribute and
GetConsoleScreenBufferInfo.

$Id: color_console.py 534 2009-05-10 04:00:59Z andre $
"""

from ctypes import windll, Structure, c_short, c_ushort, byref

SHORT = c_short
WORD = c_ushort

class COORD(Structure):
  """struct in wincon.h."""
  _fields_ = [
    ("X", SHORT),
    ("Y", SHORT)]

class SMALL_RECT(Structure):
  """struct in wincon.h."""
  _fields_ = [
    ("Left", SHORT),
    ("Top", SHORT),
    ("Right", SHORT),
    ("Bottom", SHORT)]

class CONSOLE_SCREEN_BUFFER_INFO(Structure):
  """struct in wincon.h."""
  _fields_ = [
    ("dwSize", COORD),
    ("dwCursorPosition", COORD),
    ("wAttributes", WORD),
    ("srWindow", SMALL_RECT),
    ("dwMaximumWindowSize", COORD)]

# winbase.h
STD_INPUT_HANDLE = -10
STD_OUTPUT_HANDLE = -11
STD_ERROR_HANDLE = -12

# wincon.h
BLACK     = 0x0000
BLUE      = 0x0001
GREEN     = 0x0002
CYAN      = 0x0003
RED       = 0x0004
MAGENTA   = 0x0005
YELLOW    = 0x0006
GREY      = 0x0007
INTENSITY = 0x0008 # foreground color is intensified.

stdout_handle = windll.kernel32.GetStdHandle(STD_OUTPUT_HANDLE)
SetConsoleTextAttribute = windll.kernel32.SetConsoleTextAttribute
GetConsoleScreenBufferInfo = windll.kernel32.GetConsoleScreenBufferInfo

def get_text_attr():
  """Returns the character attributes (colors) of the console screen
  buffer."""
  csbi = CONSOLE_SCREEN_BUFFER_INFO()
  GetConsoleScreenBufferInfo(stdout_handle, byref(csbi))
  return csbi.wAttributes

default_colors = get_text_attr()
default_bg = default_colors & 0x0070
default_fg = default_colors & 0x0007

currentForeground = default_fg
currentBackground = default_bg

def set_text_attr(color):
  """Sets the character attributes (colors) of the console screen
  	buffer. Color is a combination of foreground and background color,
  	foreground and background intensity."""
  SetConsoleTextAttribute(stdout_handle, color)
  
def setColors(fg,bg):
	global currentBackground, currentForeground	
	set_text_attr(fg | bg)
	currentBackground = bg	
	currentForeground = fg

def setFg(color): 
	setColors(color, currentBackground)
def setBg(color): 
	setColors(currentForeground, color*16)
def setIntenseFg(color): 
	setColors(color | INTENSITY, currentBackground)
def setIntenseBg(color): 
	setColors(currentForeground, color*16 | INTENSITY*16)
	
def resetBg():
	setColors(currentForeground, default_bg)
def resetFg():
	setColors(default_fg, currentBackground)
def resetColors():
	resetBg()
	resetFg()
