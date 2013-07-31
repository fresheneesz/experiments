(function(){var self = this;var _rs260_ = {};with(this){with(_rs260_){(function(){var __rsu = __rescripted.util;var from = __rsu.from;var match = __rsu.match;var typeOf = __rsu.typeOf;var isInstanceOf = __rsu.isInstanceOf;__rsu._import('rescripted.collections',rescripted.collections,'_',_rs260_)

__rsu._package('rescripted.jsonrpc',this,function(){var self = this;with(this){(function(){
  
  __rsu._class('JsonRpcClient',this,self,JsonRpcClient,JsonRpcClient$class);function JsonRpcClient(){return __rsu._construct(this,'JsonRpcClient',JsonRpcClient$class,arguments.callee,arguments);};function JsonRpcClient$class(path){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function JsonRpcClient$ctor(){
    
    var messageId = new Date().getTime() / 1000
    var globalErrorCallback = null
    
    __rsu._method('apply',this,self,false,function(completeCallback,errorCallback){
      globalErrorCallback = errorCallback;
      function onMethodsAvailable(methods){
        self.methods = List.fromArray(methods)
        self.methods.foreach(bindMethod)
        if(completeCallback) completeCallback(self)      
      }
      method("system.listMethods")(onMethodsAvailable,(function(message,errorCode){ error("error initializing JsonRpcClient('"+path+"'): "+message) }))
      return self;
    });
    
    function bindMethod(fullMethodName){
      var parts = from(fullMethodName.split("."))
      var scopeNames = parts.take(parts.size() -1)
      var methodName = parts(parts.size() - 1)
      var context = self;
      from(scopeNames).foreach(function(name){
        if(!(name in context)) context[name] = {}
        context = context[name]
      })
      context[methodName] = method(fullMethodName)
    }
    
    var _rs2636_ = (__rsu._partialFunction(
      function(_rs2637_){return ((_rs2637_ === null))?function(){return ( "Unknown error (no error code provided)")}:null}
      ,function(_rs2638_){return ((_rs2638_ === 0))?function(){return ( "CODE_SUCCESS")}:null}
      ,function(_rs2639_){return ((_rs2639_ === 490))?function(){return ( "CODE_REMOTE_EXCEPTION")}:null}
      ,function(_rs2640_){return ((_rs2640_ === 590))?function(){return ( "CODE_ERR_PARSE")}:null}
      ,function(_rs2641_){return ((_rs2641_ === 591))?function(){return ( "CODE_ERR_NOMETHOD")}:null}
      ,function(_rs2642_){return ((_rs2642_ === 592))?function(){return ( "CODE_ERR_UNMARSHALL")}:null}
      ,function(_rs2643_){return ((_rs2643_ === 593))?function(){return ( "CODE_ERR_MARSHALL")}:null}
      ,function(_rs2644_){return ((_rs2644_ === 594))?function(){return ( "CODE_ERR_NOCONSTRUCTOR")}:null}
      ,function(n){return function(){return ( "Unknown error ("+n+")"
		)}}));function errorCodeMessage(_rs2635_){ return _rs2636_(_rs2635_) };errorCodeMessage.isDefinedAt = _rs2636_.isDefinedAt;
      
    function method(name){
      return (function(){
        /*prepare our args*/
        var rawArgs = List.fromArray(arguments)
        var methodArgs = rawArgs.filter(function(arg){return ( typeOf(arg) != Function)})
        var callbacks = rawArgs.collect(__rsu._partialFunction( function(f){return (isInstanceOf(f,Function))?function(){return ( f )}:null}))
        var successCallback = callbacks.headOrNull()
        var errorCallback = callbacks.drop(1).headOrNull()
        var params = methodArgs.size() > 0? methodArgs.unwrap():null
        var requestBody = {method:name,params:methodArgs.unwrap(),id:(messageId++).toString()}
        
        var executeMethod = (function(successCallback,errorCallback){
          Http.post(path).body(Json.toString(requestBody),"text/plain").json(function(response){
            if(response.error){
              var errorMessage = errorCodeMessage(response.error.code)+": "+response.error.msg
              var hasLocalHandler = errorCallback!=null
              if(hasLocalHandler) errorCallback(errorMessage,response.error.code)
              if(globalErrorCallback) globalErrorCallback(errorMessage,response.error.code,hasLocalHandler)
            } else{
              successCallback(response.result)
            }
          })
        })
        /*determine if we need to send the request immediately, or handle it as a curried function*/
        if(successCallback == null) return executeMethod
        executeMethod(successCallback,errorCallback)
      })
    }
    
  }).apply(this,[])}}
}).apply(this,[])}})}).apply(__rescripted.script.root,[]);}}}).apply(__rescripted.script.root,[]);