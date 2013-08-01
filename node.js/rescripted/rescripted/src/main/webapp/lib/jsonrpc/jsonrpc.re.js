//rescripted-settings:{"legacy":true}
import rescripted.collections._

package rescripted.jsonrpc {
  
  class JsonRpcClient(path){
    
    var messageId = new Date().getTime() / 1000
    var globalErrorCallback = null
    
    def apply(completeCallback,errorCallback) = {
      globalErrorCallback = errorCallback;
      private def onMethodsAvailable(methods){
        self.methods = List.fromArray(methods)
        self.methods.foreach(bindMethod)
        if(completeCallback) completeCallback(self)      
      }
      method("system.listMethods")(onMethodsAvailable,{message,errorCode=> error("error initializing JsonRpcClient('"+path+"'): "+message) })
      return self;
    }
    
    private def bindMethod(fullMethodName){
      var parts = from(fullMethodName.split("."))
      var scopeNames = parts.take(parts.size() -1)
      var methodName = parts(parts.size() - 1)
      var context = self;
      for(name <- scopeNames){
        if(!(name in context)) context[name] = {}
        context = context[name]
      }
      context[methodName] = method(fullMethodName)
    }
    
    private def errorCodeMessage = {
      case null => "Unknown error (no error code provided)"
      case 0	 => "CODE_SUCCESS"
      case 490 => "CODE_REMOTE_EXCEPTION"
      case 590 => "CODE_ERR_PARSE"
      case 591 => "CODE_ERR_NOMETHOD"
      case 592 => "CODE_ERR_UNMARSHALL"
      case 593 => "CODE_ERR_MARSHALL"
      case 594 => "CODE_ERR_NOCONSTRUCTOR"
      case n => "Unknown error ("+n+")"
		}
      
    private def method(name) = {
      return {=>
        //prepare our args
        var rawArgs = List.fromArray(arguments)
        var methodArgs = rawArgs.filter(arg => typeOf(arg) != Function)
        var callbacks = rawArgs.collect{ case f:Function => f }
        var successCallback = callbacks.headOrNull()
        var errorCallback = callbacks.drop(1).headOrNull()
        var params = methodArgs.size() > 0? methodArgs.unwrap():null
        var requestBody = {method:name,params:methodArgs.unwrap(),id:(messageId++).toString()}
        
        var executeMethod = {successCallback,errorCallback=>
          Http.post(path).body(Json.toString(requestBody),"text/plain").json{ response =>
            if(response.error){
              var errorMessage = errorCodeMessage(response.error.code)+": "+response.error.msg
              var hasLocalHandler = errorCallback!=null
              if(hasLocalHandler) errorCallback(errorMessage,response.error.code)
              if(globalErrorCallback) globalErrorCallback(errorMessage,response.error.code,hasLocalHandler)
            } else{
              successCallback(response.result)
            }
          }
        }
        //determine if we need to send the request immediately, or handle it as a curried function
        if(successCallback == null) return executeMethod
        executeMethod(successCallback,errorCallback)
      }
    }
    
  }
}
