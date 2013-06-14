#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> Method(const Arguments& args) {
  HandleScope scope;
  try {
	ThrowException(Exception::TypeError(String::New("Argument must be a function")));
  	throw 1;
    assert(1==2);
  	return scope.Close(String::New("world"));
  } catch(int a) {
 	return scope.Close(Number::New(a));
  } 
}

void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("hello"), 
  			   FunctionTemplate::New(Method)->GetFunction());
}

NODE_MODULE(hello, init)