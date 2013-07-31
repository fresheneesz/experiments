
//comments
//comment
/*
  comment
*/

//import syntax
import a.b._
import a.b.c

//package syntax
package a.b.c {}

//class syntax
class A
class A{}
class A()
class A(){}
class A(a,b,c)
class A(a,b,c){}
class A(a,b,c) extends B
class A(a,b,c) extends B{}
class A(a,b,c) extends B()
class A(a,b,c) extends B(){}
class A(a,b,c) extends B(a,b,c)
class A(a,b,c) extends B(a,b,c){}
case class A
case class A{}
case class A()
case class A(){}
case class A(a,b,c)
case class A(a,b,c){}
case class A(a,b,c) extends B
case class A(a,b,c) extends B{}
case class A(a,b,c) extends B()
case class A(a,b,c) extends B(){}
case class A(a,b,c) extends B(a,b,c)
case class A(a,b,c) extends B(a,b,c){}

//object syntax
object A
object A{}
object A extends B
object A extends B{}
object A extends B()
object A extends B(){}
object A extends B(a,b,c)
object A extends B(a,b,c){}

//method syntax
def a = 10
def a() = 10
def a(b) = 10 * b
def a() = {}
def a(){}

//variable / value syntax
var x = 123
val y = 123

//for comprehensions
for(a <- b) println(a)
for(a <- b) {println(a)}
for(a <- b if a > 10) println(a)
for(a <- b if a > 10) {println(a)}
for(a <- b) yield a
for(a <- b) yield {a}
for(a <- b if a > 10) yield a
for(a <- b if a > 10) yield {a}

//while loop
while(false){ println() }
while(false) println()
do{ println() } while(false)
do println() while(false)

//try catch finally
try{ x() } catch {e => }
try{ x() } catch {e => } finally { println("done") }
try{ x() } finally { println("done") }
try x() catch errorHandler
try x() catch something.buildErrorHandler() finally println("done")
try x() finally println("done")

//if, else if, else
if(x) x
if(x) x else if(y) y
if(x) x else if(y) y else z
if(x) x else z

if(x){ x } 
if(x){ x } else if(y) { y }
if(x){ x } else if(y) { y } else { z }
if(x){ x } else { z }


//lambdas
{=> println()}
{a => a+1}
{a,b => a+b}
{_ + _}
{_.length}
(=> )
(a => )
(a,b => )
(_ + _)
(_.length)

//partial functions
{
  case a => a
  case b if b < 200 =>
    val x = b+10
    x*2
  case c:SomeClass =>
  case name@Extractor(a,b,bla@_*) => a
}



//literals: numbers, booleans, strings, json, xml
0
0.0
.0
0.


//operators, are they different than methods? how are they desugared, how is += handled, how are unary operators handled?
a == b
a += b
a = a+b
a = __rsu.operator("+",a,b)
__rsu.operator("+=",a,b)
!a
-a
+a
a++
a || b
__rsu.or(a,b)


def test(){
  val x = 10
  var y = 20
  println(x+y)  
}

__rsu.method("test",function(){
  var __rsu_test_variables = {}
  __rsu._val(__rsu_test_variables,"x",10)
  __rsu._var(__rsu_test_variables,"y",20)
  
  var method = eval("""
    javascript goes here
    """)
  
  println(x+y)    
})






//misc thoughts
def a(){
  10
}

def test() = {
  for(a <- b if a > 10) yield {
    if(a > 10)
      return b
    a+1
  }
}



def test() = {
  try{
    for(a <- b if a > 10) yield {
      if(a > 10)
        throw new NonLocalReturn(b)
      a+1
    }
  } catch {
    r:NonLocalReturn =>
      return r.value
  }
}



