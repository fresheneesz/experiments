import codecs, sys

print("This is an ??amp?? testing Unicode support using Arabic, Latin, Cyrillic, Greek, Hebrew and CJK code points.\n")

print(sys.getdefaultencoding())

sys.setdefaultencoding('utf-8')

print(sys.getdefaultencoding())

// none of this works : (