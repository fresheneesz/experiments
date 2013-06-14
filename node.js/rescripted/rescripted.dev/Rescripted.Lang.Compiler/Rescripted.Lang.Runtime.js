Rescripted("Rescripted.Lang.Runtime",function(){
	var $$$ = {
		Any:{
			Eq:function(a,b){},
			Ne:function(a,b){},
			HashCode:function(value){},
			ToString:function(value){},
			Match:function(value,partialFunction){return partialFunction(value)},
			ForEach:function(value,func){
				if(value == null)
					return null;
				if(value.ForEach)
					return value.ForEach(func)
				return func(value)
			},
			Filter:function(value,func){
				if(value == null)
					return null;
				if(Array.isArray(value))
					Array.prototype.filter.call(value,func)
				if(value.Filter)
					return value.Filter(func)
				return func(value)
			},
			Map:function(value,func){
				if(value == null)
					return null;
				if(Array.isArray(value))
					Array.prototype.map.call(value,func)
				if(value.Map)
					return value.Map(func)
				return func(value)
			},
			FlatMap:function(value,func){
				if(value == null)
					return null;
				if(Array.isArray(value))
					throw new Error("FlatMap isn't supported on arrays yet")
				if(value.FlatMap)
					return value.FlatMap(func)
				return func(value)
			},
			Zero:function(value){
				if(value == null)
					return null;
				if(value.Zero)
					return value.Zero()
				return null;
			},
			IsInstanceOf:function(value,type){},	//returns boolean
			AsInstanceOf:function(value,type){},	//throws exception when cast fails?
			Is:function(value,type){},						//returns boolean
			As:function(value,type){}							//should this be supported? should it work like (x as string) in c#?
		},
		True:function(x){
			if(x == null)
				return null;
			else if(x === true)
				return true;
			else if(x === false)
				return false;
			else
				throw new Error("Value is not a valid boolean");
		},
		False:function(x){
			if(x == null)
				return null;
			else if(x === false)
				return true;
			else if(x === true)
				return false;
			else
				throw new Error("Value is not a valid boolean");
		},
		RegisterType:function(){
		
		},
		PartialFunction:function $$PartialFunction(){
			var cases = $$$.ToArray(arguments);
			var func = function(arg){
				for(var i=0;i<cases.length;i++){
					var caseBody = cases[i](arg)
					if(caseBody != null)
						return caseBody();
				}
				error("MatchError: "+arg)
			}
			
			func.Attempt = function(arg){
				for(var i=0;i<cases.length;i++){
					var caseBody = cases[i](arg)
					if(caseBody != null)
						return caseBody();
				}
				return null;
			}
			
			func.IsDefinedAt = function(arg){
				for(var i=0;i<cases.length;i++)
					if(cases[i](arg) != null)
						return true;
				return false;
			}
			
			return func;
		}
	}
	return $$$;
})
