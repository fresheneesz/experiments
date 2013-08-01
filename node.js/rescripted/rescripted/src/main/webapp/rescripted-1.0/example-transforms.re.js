def printNumber(n) = println(n)
becomes:
function printNumber(n){
  return println(n);
}

def printNumber(n){println(n)}
becomes:
function printNumber(n){
  var _$m_ = {};
  (println(n));
}

def printNumber(n) = {println(n)}
becomes:
function printNumber(n){
  var _$m_ = {};
  return (println(n));
}

def method(a,b,c) = {
  val x = a + b
  val y = b + c
  for(z <- x to y) yield {
    val n = z * z
    println(z)
    if(z < 10)
      z
    else
      n
  }
}
becomes:
function method(a,b,c){
  var _$m_ = {};
  return (
    _$_._val(_$m_,"x",a + b),
    _$_._val(_$m_,"y",b + c),
    Range(_$m_["x"],_$m_["y"]).map(function(z){
      _$_._block(_$m_,0);
      return (
        _$_._val(_$m_[0],"n", z*x),
        println(z),
        (z < 10)? z : _$m_[0]["n"]
      );
    })
  );
}

while(true){
  val y = 10
  val x = 20
  println(y + x)
}
becomes:
while(true){
  _$_._block(_$m_,0);
  (
    _$_._val(_$m_[0],"y",10),
    _$_._val(_$m_[0],"x",20),
    println(_$m_[0]["y"] + _$m_[0]["x"])
  )
}

while(true) println("hello")
becomes:
while(true){
  println("hello");
}

while(true){ println("hello") }
becomes:
while(true){
  _$_._block(_$m_,0);
  (
    println("hello")
  );
}

