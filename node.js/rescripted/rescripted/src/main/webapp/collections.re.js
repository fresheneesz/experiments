//rescripted-settings:{"legacy":true,"immediate":true}

package rescripted.collections{
  
  class Pair(a,b){
    self[0] = self._1 = self.key = a
    self[1] = self._2 = self.value = b
    self.length = 2
    self.isPair = true
  }
  
  object List{
    def fromArray(array) = ( List.apply(null,array || []) )
    
    def unapply(list,wildcard,extractor) = {
      //convert arrays into lists
      if(Seq.isArrayLike(list)) list = fromArray(list)
      
      //fail on non-lists
      if(!isInstanceOf(list,List)) return null
      
      if(wildcard){
        //the list is too small to match the extractor
        if(list.size() < extractor.length - 1) return null
          
        //collect our params
        var params = list.take(extractor.length - 1).unwrap()
        //pass the wildcards as a List
        params.push(list.drop(extractor.length - 1))
        //we have a match, apply it
        return extractor.apply(null,params)
      } else {
        //list doesn't match the extractor
        if(list.size() != extractor.length) return null
          
        //we have a match, apply it
        return extractor.apply(null,list.unwrap())
      }
      
    }
  }
  
  object Seq{
    self.Break = {seqBreakObject:true}
    
    def mkStringArguments = {
      case Seq(prefix:String,delim:String,suffix:String) => {prefix:prefix,suffix:suffix,delim:delim}
      case Seq(delim:String) => {prefix:"",suffix:"",delim:delim}
      case Seq(named:Object) if "delim" in named => {prefix:named.prefix || "",suffix:named.suffix || "",delim:named.delim} 
      case Seq() => {prefix:"",suffix:"",delim:","}
      case Seq(args@_*) => error("invalid arguments: "+args.mkString(","))
    }
    
    def isArrayLike(value) = {
      if(value == null) return false
      if(typeOf(value) == Array) return true
      if(isArguments(value)) return true
      return false
    }
    
    def isArguments(value) = (
      !!(value && Object.prototype.hasOwnProperty.call(value, 'callee'))
    )
    def fromArray(array) = { return ArraySeq(array) }
    def fromString(value) = { return StringSeq(value || "") }
    def unapply(seq,wildcard,extractor) = {
      //convert arrays to Seq
      if(isArrayLike(seq)) seq = fromArray(seq)
      
      //fail on non-Seqs
      if(!isInstanceOf(seq,Seq)) return null
      
      //can't extract a seq with unknown size
      if(!("size" in seq)) return null
    
      if(wildcard){
        //the seq is too small to match the extractor
        if(seq.size() < extractor.length - 1) return null
          
        //collect our params
        var params = seq.take(extractor.length - 1).toArray()
        //pass the wildcards as a Seq
        params.push(seq.drop(extractor.length - 1))
        //we have a match, apply it
        return extractor.apply(null,params)
      } else {
        //seq doesn't match the extractor
        if(seq.size() != extractor.length) return null
          
        //we have a match, apply it
        return extractor.apply(null,seq.toArray())
      }
      
    }
  }
  
  class Seq(){
    self.isRescriptedEnhanced = true
    
    def foreach(func) = ???
    def finalizeResults(results) = {return ArraySeq(results)}

    def toArray() = {
      var results = []
      foreach{ item => results.push(item) }
      return results
    }
    
    def drop(n) = {
      var results = [];
      var index = 0
      foreach{ item => if(index++ >= n){ results.push(item) } }
      return finalizeResults(results);
    }
    
    def dropWhile(predicate) = {
      var results = [];
      var stillDropping = true
      foreach{ item =>
        if(stillDropping) stillDropping = predicate(item)
        if(!stillDropping) results.push(item)
      }
      return finalizeResults(results);
    }
    
    def take(n) = {
      var results = [];
      var index = 0
      foreach{ item =>
        if(index++ < n){ results.push(item) }
        else return Seq.Break;
      }
      return finalizeResults(results);
    }
    
    def takeWhile(predicate) = {
      var results = [];
      var stillTaking = true
      foreach{ item =>
        stillTaking = predicate(item)
        if(stillTaking) results.push(item)  
        else return Seq.Break
      }
      return finalizeResults(results);
    }
    
    def filter(predicate) = {
      var results = [];
      foreach{ item => if(predicate(item)){ results.push(item) } }
      return finalizeResults(results);
    }
    
    def map(func) = {
      var results = [];
      foreach{ item => results.push(func(item)) }
      return finalizeResults(results);
    }
    
    def collect(partialFunction) = { return filter(partialFunction.isDefinedAt).map(partialFunction) }
    
    def contains(value) = {
      var result = false
      foreach{ item =>
        if(item == value){
          result = true
          return Seq.Break;
        }
      }
      return result;
    }
    
    def exists(predicate) = {
      var result = false
      foreach{ item =>
        if(predicate(item)){
          result = true
          return Seq.Break;
        }
      }
      return result;
    }
    
    def flatten() = {
      var results = []
      private def append(item){
        if(item == null){
          results.push(null)
        } else if(Seq.isArrayLike(item)){
          Seq.fromArray(item).foreach(append)
        } else if(item.isRescriptedEnhanced) {
          item.foreach(append)
        } else {
          results.push(item)
        }
      }
      foreach(append)
      return finalizeResults(results)
    }
    
    def reverse() = {
      var results = []
      foreach{item => results.push(item)}
      results.reverse()
      return finalizeResults(results)
    }
    
    def head() = {
      var result = headOption()
      return result.isDefined? result.get() : error("attempted to access head on an empty Seq")
    }
    
    def headOrNull() = {
      var result = null
      foreach{ item =>
        result = item
        return Seq.Break
      }
      return result
    }
    
    def headOption() = {
      var result = None
      foreach{ item =>
        result = Some(item)
        return Seq.Break
      }
      return result
    }
    
    def last() = {
      var result = lastOption()
      return result.isDefined? result.get() : error("attempted to access last on an empty Seq")
    }
    
    def lastOrNull() = {
      var result = null
      foreach{ item => result = item }
      return result
    }
    
    def lastOption() = {
      var result = null
      var found = false
      foreach{ item =>
        found = true
        result = item
      }
      if(!found) return None
      return Some(result)
    }
   
    def mkString() = {
      var args = Seq.mkStringArguments(arguments)
      return args.prefix+self.toArray().join(args.delim)+args.suffix
    }
    
    def foldLeft(init) = {
      return {func =>
        var current = init
        foreach{ item => current = func(current,item) }
        return current
      }
    }
    
    def reduceLeft(func) = {
      var current = null
      var first = true
      foreach{ item =>
        if(first){
          current = item
          first = false
        } else {
          current = func(current,item)
        }
      }
      return current
    }
    
    def min(func) = { return reduceLeft(func || (a,b=> (a<=b)? a:b ) ) }
    def max(func) = { return reduceLeft(func || (a,b=> (a>=b)? a:b ) ) }
    def sum(func) = { return reduceLeft(func || (a,b=> a+b ) ) }
    
    override def toString() = { return mkString("Seq(",",",")") }
  }
  
  class ArraySeq(source) extends Seq(){
    if(source == null) source = [];
    
    override def foreach(func) = {
      for(var i=0;i<source.length;i++)
        if(func(source[i]) == Seq.Break)
          return;
    }
    override def finalizeResults(results) = {return ArraySeq(results)}
    override def toArray() = { return source }
    override def toString() = { return mkString("ArraySeq(",",",")") }
    
    override def last() = {
      if(source.length == 0) error("attempted to access last on an empty Seq")
      return source[source.length - 1]
    }
    
    override def lastOrNull() = {
      if(source.length == 0) return null
      return source[source.length - 1]
    }
    
    def unwrap() = { return source }
    
    def apply(index) = { return source[index] }
    def update(index,value){source[index] = value}
    def push(value) = {
      var length = source.length
      source[length] = value
      source.length = length + 1
      return self
    }
    def append(value) = {return push(value)}
    
    def size() = {return source.length}
    
    def sort(func,direction) = {
      var defaultSort = {a,b =>
        if(a == null && b == null) return 0;
        if(a == null) return -1;
        if(b == null) return 1;
        return (a < b)? -1: (a > b)? 1: 0;
      }
      var sortFunc = func || defaultSort
      var isDescending = direction == "desc" || direction == "desc" || direction < 0
      if(sortFunc.length == 1){
        if(isDescending){
          source.sort(a,b => defaultSort(func(b),func(a)))
        } else {
          source.sort(a,b => defaultSort(func(a),func(b)))
        }
      } else {
        if(isDescending){
          source.sort(a,b => sortFunc(b,a))
        } else {
          source.sort(sortFunc)
        }
      }
      return self;
    }
  }
  
  class List() extends ArraySeq(__rescripted.util.toArray(arguments)){
    override def finalizeResults(results) = {return List.fromArray(results)}
    override def toString() = {return mkString("List(",",",")")}
  }
  
  object Stack{
    def fromArray(array) = {return Stack.apply(null,array || []);}
  }
  
  class Stack() extends ArraySeq(__rescripted.util.toArray(arguments)){
    def pop() = {
      var raw = unwrap()
      var result = raw[raw.length-1]
      raw.length--;
      return result
    }
    def peek() = {
      var raw = unwrap()
      return raw[raw.length-1]
    }
    
    override def finalizeResults(results) = {return Stack.fromArray(results)}
    override def toString() = {return mkString("Stack(",",",")")}    
  }
  
  //5 to 1 by -1 == Range(5,1,-1).inclusive()
  //5 until 1 by -1 == Range(5,1,-1)
  
  class Range(start,end,by) extends Seq(){
    by = by || 1
    //if(by == 0) error("Range error: 'by' must be non-zero")
    override def foreach(func) = {
      if(by == 0) return
      if(end > start && by < 0) return
      if(end < start && by > 0) return
      if(by > 0)
        for(var i=start;i<end;i+=by) func(i)
      else
        for(var i=start;i>end;i+=by) func(i)
    }
    override def toString() = {return mkString("Range(",",",")")}
    
    def inclusive() = {
      return Range(start,end + ((by > 0)? 1:-1),by)
    }
  }
  
  class StringSeq(source) extends Seq(){
    override def foreach(func) = {
      for(var i=0;i<source.length;i++)
        if(func(source.charAt(i)) == Seq.Break)
          return;
    }
    override def finalizeResults(results) = {
      if(results.length == 0)
        return StringSeq("")
      //assume the list is homogenous
      var isString = typeOf(results[0]) == String
      return (isString)?
                StringSeq(results.join("")):
                Seq.fromArray(results)
    }
    override def toString() = (source)
    def size() = (source.length)
    
    override def last() = {
      if(source.length == 0) error("attempted to access last on an empty StringSeq")
      return source.charAt(source.length - 1)
    }
    
    override def lastOrNull() = {
      if(source.length == 0) return null
      return source.charAt(source.length - 1)
    }
  }
  
  class Map(initData){
    self.isRescriptedEnhanced = true
    
    var data = __rescripted.util.merge(initData || {},{});
    
    def keys() = {return map(_.key)}
    def values() = {return map(_.value)}
    
    def apply(key) = { return data[key] }
    def update(key,value){data[key] = value;}
    
    def foreach(func) = {
      for(var key in data)
        if(data.hasOwnProperty(key))
          func(Pair(key,data[key]))
      return self;
    }
    
    def contains(key) = (data.hasOwnProperty(key))
    
    def filter(func) = {
      var results = Map();
      foreach{item => if(func(item)) results.update(item.key,item.value) }
      return results;
    }

    def map(func) = {
      var results = [];
      var isResultAMap = true
      for(item <- self){
        var result = func(item)
        results.push(result)
        if(!result || !(result.isPair)){ isResultAMap = false; }
      }

      if(!isResultAMap || results.length == 0)
        return List.fromArray(results);
      
      var map = Map();
      for(var i=0;i<results.length;i++){
        var item = results[i];
        map.update(item.key,item.value);
      }
      return map;
    }
    
    def mkString() = {
      return map({item => return item.key+" -> "+item.value}).mkString.apply(null,arguments)
    }
    
    override def toString() = {return mkString("Map(",",",")")}

    def unwrap() = {return data;}
  }  
  
  def Option(value) = { return (value == null)? None : Some(value) }
  
  class Optional(){
    self.isRescriptedEnhanced = true
    
    self.isEmpty = true  
    self.isDefined = false
  
    def get() = ???

    def getOrElse(defaultValue) = { return isEmpty? defaultValue : get() }
    def orNull() = {return getOrElse(null) }
    def map(f) = { return isEmpty? None : Some(f(get())) }
    def flatMap(f /*: A => Option[B]*/) = { return isEmpty? None : f(get()) }
    def filter(p) = { return (isEmpty || p(get()))? self : None }
    def exists(p) = { return isDefined && p(get()) }
    def foreach(f) = { if(isDefined) f(get()) }
    def collect(pf) = { return (isDefined && pf.isDefinedAt(get()))? Some(pf(get())) : None }
    def orElse(alternative /*: => Option[B]*/ ) = {return isEmpty? alternative : self}
  }
  
  class Some(x) extends Optional() {
    self.isEmpty = false
    self.isDefined = true
    def get() = { return x }
    override def toString() = {return "Some("+x+")"}
  }
  
  object Some{
    def unapply(obj,wildcard,extractor) = {
      if(isInstanceOf(obj,Some) && extractor.length == 1 && wildcard == false)
        return extractor(obj.get())
      return null;
    }
  }
  
  object None extends Optional() {
    def get() = {error("No Such Element 'None.get'")}
    override def toString() = {return "None"}
    
    def unapply(obj,wildcard,extractor) = {
      if(obj == None && extractor.length == 0 && wildcard == false)
        return extractor();
      return null;
    }
  }
  
}
