import os
import BaseHTTPServer


class SimplestWebHandler(
    BaseHTTPServer.BaseHTTPRequestHandler):
  def do_GET(self):
    self.send_response(200)
    self.end_headers()
    self.wfile.write('Hello, you requested '
      + self.path)


def main():
  server = BaseHTTPServer.HTTPServer(('localhost', 80),
      SimplestWebHandler)
  print 'Server is looping.'
  server.serve_forever()
  
main()

