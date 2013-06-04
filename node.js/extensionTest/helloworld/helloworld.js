HelloWorldJs = function() {
  this.m_count = 0;
};


HelloWorldJs.prototype.hello = function()
{
  this.m_count++;
  return "Hello World";
};

exports.HelloWorldJs = HelloWorldJs;