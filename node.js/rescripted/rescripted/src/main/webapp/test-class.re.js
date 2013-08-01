import rescripted.collections._
import rescripted.xml._

private def output(item) = { {<div class='log'>{|(""+item)|}</div>}.appendTo("output") }

package a.b.c {

  def packageMethod(a,b) = {
    output("hola! a: "+a+" b: "+b)
  }

  class Y(arg1){
    self.publicProperty = "a"
    
    private def hola()={
      output("hola from y")
    }

    def sayArg(){
      output("Y.sayArg")
      hola()
      output("arg1 from Y: "+arg1)
      self.publicProperty = "b"
    }
    

    self.basePublic = 23
    
    def baseMutate(){
      self.basePublic = 32
    }
    
    
  }
  
  class X(arg1,arg2) extends Y(arg1){
    
    private def hola(){
      output("hola from x")
    }
    
    def method(argA,argB) = {
      hola()
      output("arg1:"+arg1+" arg2:"+arg2)
      output("argA:"+argA+" argB:"+argB)
      base.sayArg()
      try {
        base.hola()
      } catch (e) {
        output("private method base.hola not found, as expected: "+e.toString())
      }
    }
    
    def apply(a,b,c){
      output("APPLY!!!"+[a,b,c].join("|"));
    }
    
    override def sayArg(){
      output("not really saying arg...")
    }
  }
    
}

a.b.c.packageMethod("A","B")
var x = new a.b.c.X("1","2")
x(1,2,3);
output(x.publicProperty)
x.method("a","b")
x.sayArg()
output(x.publicProperty)   
output(x.basePublic)
x.baseMutate()
output(x.basePublic)
try{
  x.hola()
} catch (e) {
  output("private method x.hola not found, as expected: "+e.toString())
}

from("s")
from([])
from({})
from(x)
