import wx 
import wx.html 

class MyHtmlFrame(wx.Frame): 
    def __init__(self, parent, title, txt): 
        wx.Frame.__init__(self, parent, -1, title) 
        html = wx.html.HtmlWindow(self) 
        if "gtk2" in wx.PlatformInfo: 
            html.SetStandardFonts() 
        html.SetPage( txt)
            #"Here is some <b>formatted</b> <i><u>text</u></i> " 
            #"loaded from a <font color=\"red\">string</font>."
            #'<img src="body.jpg">') 

fH = open("G:\\billy's file\\programming\\python\\a.txt")#'Incorporating HTML into wxPython _ Part 1 - Python Programming Portal.html','r')
fString = fH.read()

app = wx.PySimpleApp() 
frm = MyHtmlFrame(None, "Simple HTML", fString) 
frm.Show() 
app.MainLoop()
