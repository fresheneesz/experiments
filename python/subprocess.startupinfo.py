import subprocess
import pprint

startupinfo = subprocess.STARTUPINFO()
print(startupinfo.dwFlags)
print(subprocess.STARTF_USESHOWWINDOW)
pprint.PrettyPrinter(indent=4).pprint(startupinfo)