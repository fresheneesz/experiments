import web
import sys

urls = (
    '/(.*)', 'hello'
)

sys.argv[1:] = ['128.0.0.1', 80]
app = web.application(urls, globals())

class hello:        
    def GET(self, name):
        if not name: 
            name = 'World'
        return 'Hello, ' + name + '!'

app.run()


