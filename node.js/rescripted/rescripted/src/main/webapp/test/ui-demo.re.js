
import rescripted.collections._
import rescripted.xml.dom._
import rescripted.ui._

object App{
  
  var animator = AnimationManager(1000/60) //30 fps
  
  def main(){
    mobileViewports()   
    SampleNavigator.appendTo(document.body)
    //controlsDemo().appendTo(document.body)
  }
  
  def controlsDemo(){
    var controls = {}
    var percent = false
    var count = 0
    var price = {}
    var formValidator = FormValidator()
    return TabContainer{classNames:"fill-area"}(
      ScrollableContainer{label:"Buttons Test",classNames:"fill-area"}(
        Button{label:"Animation Test"}.click{=>
          
          var fadeOutAnimation = {properties,element=>
            var opacity = parseFloat(element.style.opacity || 1)
            return {position => element.style.opacity = AnimationTools.denormalize(opacity,0,position) }
          }
          
          var x = Container{styles:"position:fixed;top:200px;right:200px;bottom:200px;left:200px;background:red;"}.domInserted{elem =>
            animator.start{
              name:"someAnimation",
              elements:elem,
              animation:fadeOutAnimation,
              duration:1.0, //seconds?
              properties:{},
              easing:Easing.easeInOutSine,
              complete:{=>
                println("animation complete")
                x.remove()
              }
            }      
          }.appendTo(document.body)
        },
        ToolTip{classNames:"right error",styles:{"max-width":"400px"}}("Url"),
        ToolTip{classNames:"bottom"}("Url"),
        testTooltip{classNames:"left"},
        testTooltip{classNames:"bottom right error"},
        SampleNavigator.lotsOfButtons("Track")
      ),
      Container{label:"Charts Demo",classNames:"fill-area"}(
        TabContainer{classNames:"fill-area"}(
          ScrollableContainer{label:"Bar Chart",classNames:"fill-area"}(
            SampleNavigator.lotsOfButtons("Track"),
            BarChart{label:"Bar Chart",title:"Company Performance",width: 400, height: 300}
              .add("Year",["2004","2005","2006","2007"])
              .add("Sales",[1000,1170,860,1030])
              .add("Expenses",[400,460,580,540])
          ),
          PieChart{label:"Pie Chart",title:"Daily Activities",width: 400, height: 300}
            .add("Work",11)
            .add("Eat",2)
            .add("Commute",2)
            .add("Watch TV",2)
            .add("Sleep",7),
          LineChart{label:"Line Chart",title:"Company Performance",width: 400, height: 300}
            .add("Year",["2004","2005","2006","2007"])
            .add("Sales",[1000,1170,860,1030])
            .add("Expenses",[400,460,580,540])
        )
      ),
      ScrollableContainer{label:"Map Test",classNames:"fill-area"}(
        {<h2>Map</h2>},
        GoogleMap{
          draggable: true,
          width: "400px",
          height: "300px",
          zoom: 8,
          center: new google.maps.LatLng(-34.397, 150.644),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        {<h2>Buttons</h2>},
        SampleNavigator.lotsOfButtons()
      ),
      TabContainer{label:"Controls",classNames:"fill-area"}(
        Container{label:"Progress bar and popups"}(
          {<h2>Progress Bar</h2>},
          Button{label:"Toggle Indeterminate"}.bindRef(controls,"test").click{=>
            percent = !percent
            if(percent) controls.progress.value(50,100)
            else controls.progress.indeterminate()
          },
          ProgressBar{width:"300px"}.indeterminate().bindRef(controls,"progress"),
          Container{height:200},
          Container()(
            Label{label:"Tooltips"},
            Button{label:"top-left"}.click(=> testTooltip().showFor(controls.progress,"top-left") ),
            Button{label:"top-center"}.click(=> testTooltip().showFor(controls.progress,"top-center") ),
            Button{label:"top-right"}.click(=> testTooltip().showFor(controls.progress,"top-right") ),
            Button{label:"center-left"}.click(=> testTooltip().showFor(controls.progress,"center-left") ),
            Button{label:"center-center"}.click(=> testTooltip().showFor(controls.progress,"center-center") ),
            Button{label:"center-right"}.click(=> testTooltip().showFor(controls.progress,"center-right") ),
            Button{label:"bottom-left"}.click(=> testTooltip().showFor(controls.progress,"bottom-left") ),
            Button{label:"bottom-center"}.click(=> testTooltip().showFor(controls.progress,"bottom-center") ),
            Button{label:"bottom-right"}.click(=> testTooltip().showFor(controls.progress,"bottom-right") )
          ),
          Container()(
            Label{label:"Popups"},
            Button{label:"center-center test"}.click(=> testPopup().showFor($("body > div"),"center-center") ),
            Button{label:"top-left"}.click(=> testPopup().showFor(controls.progress,"top-left") ),
            Button{label:"top-center"}.click(=> testPopup().showFor(controls.progress,"top-center") ),
            Button{label:"top-right"}.click(=> testPopup().showFor(controls.progress,"top-right") ),
            Button{label:"center-left"}.click(=> testPopup().showFor(controls.progress,"center-left") ),
            Button{label:"center-center"}.click(=> testPopup().showFor(controls.progress,"center-center") ),
            Button{label:"center-right"}.click(=> testPopup().showFor(controls.progress,"center-right") ),
            Button{label:"bottom-left"}.click(=> testPopup().showFor(controls.progress,"bottom-left") ),
            Button{label:"bottom-center"}.click(=> testPopup().showFor(controls.progress,"bottom-center") ),
            Button{label:"bottom-right"}.click(=> testPopup().showFor(controls.progress,"bottom-right") )
          )
        ),
        Container{label:"DataGrid"}(
          DataGrid{
            dataSource:List({name:"Dan",age:29},{name:"Alfredo",age:41}),
            columns:[{name:"Name",format:(_.name),sort:true},{name:"Age",format:(_.age),sort:true}]
          }.sortOn(1,"asc")
        )
      ),
      Container{label:"Bound Value Test"}(
        {<h2>Test 1</h2>},
        Button{label:"Change value 1"}.click{=> controls.bound1( Button{label:"count: "+(count++)} ) },
        BoundValue{value:"waiting..."}.bindRef(controls,"bound1"),
        {<h2>Test 2</h2>},
        Button{label:"Change value 2"}.click{=> controls.bound2( "count: "+(count++) ) },
        BoundValue{value:"waiting..."}.bindRef(controls,"bound2")
      ),
      Wizard{label:"Wizard Test"}(
        Container{title:"Step 1",validator:formValidator}(

          FileUploadButton{url:'/test/'}.change{file => println(Json.toString(file)); file.upload()}.complete{=> println("upload complete")},
          Label{label:"Url"},
          TextInput{}.format(Formatters.http),
          Label{label:"Some number"},
          TextInput{label:"Some number"}.validate(formValidator,Validation.isNumber,Validation.notEmpty,Validation.greaterThan(=>Math.round(Math.random()*1000)/10)),
          Label{label:"Price min"},
          ComboBox{label:"Price min"}({label:"Select a value",value:""},"100","200","300").bindTo(price,"min").validate(formValidator,Validation.isNumber,Validation.notEmpty),
          Label{label:"Price max"},
          ComboBox{label:"Price max"}({label:"Select a value",value:""},"100","200","300").validate(formValidator,Validation.isNumber,Validation.notEmpty,Validation.greaterThan(=>parseFloat(price.min) || 0)),
          Button{label:"Validate"}.click{=>
            println("Validation: ")
            formValidator.validationErrors().foreach(println)
          }
        ),
        Container{title:"Step 2"}(),
        Container{title:"Step 3",validator:formValidator}()
      ).finish{=>
        println("Wizard Done!")
      }
      
    )
  }
  
  def testPopup(settings) = {
    return Popup(settings)(
      TabContainer{width:400,height:150}(
        Container{label:"A"}(Button{label:"A"}),
        Container{label:"B"}(Button{label:"B"}),
        Container{label:"C"}(Button{label:"C"})
      )
    )
  }
  def testTooltip(settings) = {
    return ToolTip(settings)("asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf")
  }
}

object SampleNavigator extends StackNavigator({path:"#",classNames:"fill-area"}){
  def sampleData(label,count) = {return Range(1,count || 50).map(i => (label || "Item")+" #"+i)}
  def lotsOfButtons(label) = {return Container()(sampleData(label).map(text => Button{label:text,classNames:"full-width-button"}))}
  
  def resolve = {
    case Path() => Libraries()
    case Path("artists") => Artists()
    case Path("artists","albums") => Albums()
    case Path("artists","albums","tracks") => Tracks()
    case Path(Command("artists",whatever)) => Artists()
    case Path(Command("artists",whatever),"test") => Albums()
  }
}

class Libraries() extends StackChild(){
  label("Libraries")

  def button() = {return Button{label:"Show Artists"}.click{=>SampleNavigator.navigateTo("/artists:999/test")}}
  var small = Container()(Label{label:"small"},button(),SampleNavigator.lotsOfButtons("Library"))
  var large = Container()(Label{label:"large"},button())
  
  def createView = {
    case State(1,totalWidth,availableWidth) => {control:small,width:200}
    case State(any,totalWidth,availableWidth) => large
  }
}

class Artists() extends StackChild({type:"canvas"}){
  label("Artists")
  
  def button() = {return Button{label:"Show Albums"}.click{=>SampleNavigator.navigateTo("/artists/albums")}}
  var small = Container()(
    {<h1>Artists</h1>},
    ScrollableContainer{classNames:"fill-area",styles:{top:"41px"}}(
      ListView{
        label:"Artists",
        dataSource:SampleNavigator.sampleData("Artist"),
        itemRenderer:twoLineRenderer( (x => x), (x => x) )
      }
    )
  )
  var large = Container()(Label{label:"large"},button())
  
  def createView = {
    case State(0,totalWidth,availableWidth) => {control:large,width:500}
    case State(any,totalWidth,availableWidth) => {control:small,width:200}
  }
}

class Albums() extends StackChild({type:"canvas"}){
  label("Albums")
  
  private def printDuration(label){
    return {func =>
      var start = new Date().getTime()
      var result = func()
      var end = new Date().getTime()
      var duration = end - start
      println(label+": "+(duration)+" ("+(duration/1000)+"s)")
      return result
    }
  }
  
  private def refresh(){
    printDuration("listview refresh")(self.listview.refresh)
  }
  
  def button() = {return Button{label:"Show Tracks"}.click{=>SampleNavigator.navigateTo("/artists/albums/tracks")}}
  var small = Container()(
    {<h1>Albums {|Button{label:'refresh'}.click(refresh)|}</h1>},
    ScrollableContainer{classNames:"fill-area",styles:{top:"41px"}}(
      ListView{
        label:"Albums",
        dataSource:SampleNavigator.sampleData("Album",250),
        itemRenderer:twoLineRenderer( (x => x), (x => x) )
      }.bindRef(self#listview)
    )
  )
  
  
  //Container()(Label{label:"small"},button(),SampleNavigator.lotsOfButtons("Album"))
  var large = Container()(Label{label:"large"},button())
  
  def createView = {
    case State(0,totalWidth,availableWidth) => {control:large,width:500}
    case State(any,totalWidth,availableWidth) => {control:small,width:200}
  }
  
}

class Tracks() extends StackChild({type:"canvas"}){
  var ref = {};
  
  label("Tracks List, this is a really long title")
  controls(
    Container()(
      Button{label:"Absolute Popup",classNames:"highlight pulse"}.click{=> App.testPopup().showAt(50,50,true) },
      Button{label:"Absolute Tooltip",classNames:"highlight pulse"}.click{=> App.testTooltip().showAt(50,50,true) },
      Button{label:"Popup",classNames:"highlight pulse"}.bindRef(ref,"buttonA").click{=> App.testPopup().showFor(ref.buttonA,"top-right") },
      Button{label:"Tooltip",classNames:"highlight pulse"}.bindRef(ref,"buttonB").click{=> App.testTooltip().showFor(ref.buttonB,"top-right") },
      TextInput()
    )
  )
  
  var control = App.controlsDemo()
  def createView(state) = { return {control:control,width:750} }
}


