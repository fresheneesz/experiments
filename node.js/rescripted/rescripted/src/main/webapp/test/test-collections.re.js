import rescripted.collections._

module("Collections")

test("list sorting",{=>
  var numbers = List(10,100,1)
  var people = List({name:'albert',age:42},{name:'bert',age:65},{name:'john',age:25})
    
  equal(numbers.sort().toString(),"List(1,10,100)")
  equal(numbers.sort(null,"desc").toString(),"List(100,10,1)")
  equal(people.sort(_.name).map(_.name).toString(),"List(albert,bert,john)")
  equal(people.sort((_.name),"desc").map(_.name).toString(),"List(john,bert,albert)")
  equal(people.sort(_.age).map(_.name).toString(),"List(john,albert,bert)")
  equal(people.sort((_.age),"desc").map(_.name).toString(),"List(bert,albert,john)")
  
})

test("list flatten",{=>
  var deep = List(1,List(2,List(3,[4,List(5,[6,List(7,[8],9)])])))
  equal(deep.flatten().toString(),"List(1,2,3,4,5,6,7,8,9)")
})

/*

var list = new List('a','b','c')
output(list(1))
var list2 = new List('1','2')
output(list2(0))

for(item <- list){
  output("item: "+item)
}
for(item <- list if item > 'b'){
  output("item: "+item)  
}
for(item <- list){
  for(number <- list2){
    output("item: "+item+" number: "+number)
  }
}


var map = new Map({x:"X",y:"Y",z:"Zzzzz..."})
output('map("x"): '+map("x"))
output("Map for comprehensions")
output(for(item <- map if item.value.length > 1) yield item)
output(map.keys())
output(for(item <- map) yield {return item.key})
output(map.values())
output(for(item <- map) yield {return item.value})

output("List for comprehensions")
output(for(item <- list if item > 'a') yield item)
output(for(item <- list) yield {return item+":"+item.length})
output(for(item <- list if item < 'b') yield {return item+":"+item.length})

output(list.filter({_ > 'a'}))
output(list.filter({_ != 'b'}))
output(list.map({_.length}))
output(list.map({item => return "length:"+item.length}))
*/
