"""
Test module color_console (Python 3.0). Does not work with Python 2.6.
$Id: test_color_console_py30.py 535 2009-05-11 02:48:29Z andre $
"""

import colorConsole as cons
import color_console as bleh
import sys

def wout(text):
	print(text,end='')
	sys.stdout.flush() # Force writing

def test():
  """Simple Pyton 3.0 test for color_console."""
  cons.setIntenseFg(cons.BLUE)
  print('===========================================')
  
  cons.setIntenseFg(cons.BLUE)
  cons.setIntenseBg(cons.GREY)
  wout('And Now for Something')
  
  cons.setIntenseFg(cons.RED)
  cons.setIntenseBg(cons.GREY)
  print('Completely Different!')
  
  cons.resetBg() 
  cons.resetFg()
  cons.setIntenseFg(cons.RED)
  print('===========================================')
  
  cons.resetColors()

test()
input()
