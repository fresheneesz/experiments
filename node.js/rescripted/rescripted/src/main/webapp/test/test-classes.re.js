/*

// inner class / inner object tests
class BaseClass(){
  var x = "baseMethod"
  def baseMethod(){ return x }

  object InnerObject{
    def test() = { return "inner" }
  }
  class InnerClass(){
    def test() = {return baseMethod()+":test"}
  }
}

class Sub() extends BaseClass(){
  override def baseMethod() = { return "subMethod" }
}

var b = new BaseClass()
var i = new b.InnerClass()
println("i: "+i.test())
println(b.InnerObject.test())

var s = new Sub()
var si = new s.InnerClass()
println("si: "+si.test())
println(s.InnerObject.test())


//abstract method / overide tests
object Test{
  def c = ???
}

class Test(){
  def a = ???
  def b(a,b,c) = ???
}

try{ new Test().a() } catch(e){println(e)}
try{ new Test().b() } catch(e){println(e)}
try{ Test.c() } catch(e){println(e)}

class Base(){
  def concrete(){}
  def m = ???
}

class Sub() extends Base(){
  def concrete(){}
  def m(){alert('m')}
}

new Sub().m()

*/
