import rescripted.xml.dom._
import rescripted.collections._            

object Test{
  
  object System{
    var canGC = true
    def gc(){
      if(canGC){
        try{
          window.gc() 
        } catch(e) {
          println("manual GC is disabled")
          canGC = false
        }
      }
    }
    
    def currentTimeMillis() = { return new Date().getTime() }
  }

  def profile(label,batchCount,batchSize) = {
    return {action =>
      
      function runBatch(i){
        System.gc()
        return duration{=>
          Range(0,batchSize).foreach(action)
        }
      }
      
      //warmup
      runBatch(0)
      
      var stats = Range(0,batchCount).map(runBatch)
      var totalDuration = stats.sum()
      var results = {
        label: label,
        min: stats.min(),
        max: stats.max(),
        mean: totalDuration / stats.size(),
        batchTimes: stats.sort().mkString(","),
        totalDuration: totalDuration
      }
      
      println("Profile:        "+label)
      println("Min:            "+results.min)
      println("Max:            "+results.max)
      println("Mean:           "+results.mean)
      println("Batch Times:    "+results.batchTimes)
      println("Total Duration: "+totalDuration)
    }
  }
  
  def duration(action) = {
    var start = System.currentTimeMillis()
    action()
    var end = System.currentTimeMillis()
    var duration = end - start
    return duration
  }
  
  def printDuration(label){
    return {func =>
      var start = new Date().getTime()
      var result = func()
      var end = new Date().getTime()
      var duration = end - start
      println(label+": "+(duration)+" ("+(duration/1000)+"s)")
      return result
    }
  }
  
  def elements() = {    
    return {
      <div class='whoa'>
        {|
          Range(0,500).map(i =>
            {
              <div>
              {|
                Range(0,10).map(j =>
                  {<span>Item {|i+j|}</span>}
                )
              |}
              </div>
            }
          )
        |}
      </div>
    }
  }  

  def xmlTest(){
    $("#test").empty()
    
    //printDuration("building elements manually"){=>
    //  var doc = document;
    //  var root = doc.createElement("div")
    //  //frag.appendChild(root);
    //  for(var i=0;i<1000;i++){
    //    var a = doc.createElement("div")
    //    root.appendChild(a)
    //    for(var j=0;j<10;j++){
    //      var b = doc.createElement("span")
    //      a.appendChild(b)
    //      var text = doc.createTextNode("Item "+(i+j))
    //      b.appendChild(text)
    //    }
    //  }
    //  doc.getElementById("test").appendChild(root)
    //}
    
    $("#test").empty()
    
    var elems = printDuration("generating elements")(elements)
   
    printDuration("appending elems"){=>
      document.getElementById("test").appendChild(elems)
      //elems.appendTo("test")
    }
    
  }
  
  class A(){
    def a(){}
  }
  class B() extends A(){
    def b(){}
  }
  class C() extends B(){
    def c(){}
  }
  class D() extends C(){
    def d(){}
  }
  
  
  def constructorTest(){
    //profile("constructing ArraySeqs",5,10000)(ArraySeq)
    queue(
      (=> profile("constructing A",5,5000)(A)),
      (=> profile("constructing B",5,5000)(B)),
      (=> profile("constructing C",5,5000)(C)),
      (=> profile("constructing D",5,5000)(D))
    )
  }
  
  def queue(){
    if(arguments.length == 0)
      return;
    var action = arguments[0];
    var remaining = Seq.fromArray(arguments).drop(1).toArray()
    setTimeout({=>
      action();
      queue.apply(null,remaining)
    },10);
  }
  
  def main(){
    println("starting up...")
  }
}

