import rescripted.collections._
import rescripted.xml._

module("Partial Functions")

var f1 = {
  case List(List("a","b"),"c") => "abc"
  case outer@List(List(inner@List("a","b"),List("c","d")),List(List("e","f"),List("g","h"),"i"),"j") => "abcdefghij"
}

var f2 = {
  case List("abc","def",remainder@_*) => remainder.mkString(",")
  case List() => "empty"
}

var f3 = {
  case List(remainder@_*) => "pass"
}

var f4 = {
  case 7 => "seven"
  case null => "null"
  case false => "false"
  case true => "true"
  case `f1` => "f1"
}

var f5 = {
  case 5 => { return 5 }
  case 10 => { return 10 }
}

var f6 = {
  case n:Number if n > 20 => n
  case n:Number => n*2
  case s:String => "string"
}

test("extraction tests",{=>
  var a = List(List("a","b"),"c")
  var b = List(List(List("a","b"),List("c","d")),List(List("e","f"),List("g","h"),"i"),"j")
  equal(f1(a),"abc")
  equal(f1(b),"abcdefghij")
})

test("match failure",{=>
  raises({=> f1(5)})
  raises({=> f5(20)})
})

test("wild card extraction",{=>
  var a = List("abc","def","a","b")
  equal(f2(a),"a,b")
  equal(f3(a),"pass")
})

test("empty list matching",{=>
  equal(f2(List()),"empty")
  equal(f3(List()),"pass")
})

test("type matching",{=>
  equal(f6(5),10)
  equal(f6(""),"string")
})

test("value matching",{=>
  equal(f4(7),"seven")
  equal(f4(null),"null")
  equal(f4(false),"false")
  equal(f4(true),"true")
  equal(f4(f1),"f1")
})

test("case guards",{=>
  equal(f6(25),25)
})

test("case bodies",{=>
  equal(f5(5),5)
  equal(f5(10),10)
})

test("isDefinedAt",{=>
  equal(f1.isDefinedAt(5),false)
  equal(f2.isDefinedAt(List()),true)
  equal(f3.isDefinedAt(List()),true)
  equal(f3.isDefinedAt(List(1)),true)
  equal(f3.isDefinedAt(List(1,2)),true)
  equal(f3.isDefinedAt(10),false)
  equal(f3.isDefinedAt(""),false)
  equal(f4.isDefinedAt({}),false)
  equal(f4.isDefinedAt([]),false)
  equal(f4.isDefinedAt(""),false)
  equal(f5.isDefinedAt(5),true)
  equal(f5.isDefinedAt(10),true)
  equal(f5.isDefinedAt(20),false)
})

/*
fixed single line comments in the middle of partial functions they generated bad code, add test to verify fix

import rescripted.collections._
var f = {
  //test
  case List(1,2,3) => "123"
  //test
  case List("a") => "a"

//  case Test() => 123
//  case Bla() => abc

}

println(f(List(1,2,3)))
println(f(List("a")))

add a test for {case pattern => {}} to make sure it can disambiguate between an empty object and a block that returns

*/

