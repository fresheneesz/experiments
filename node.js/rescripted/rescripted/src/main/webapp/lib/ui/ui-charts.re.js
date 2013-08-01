//rescripted-settings:{"legacy":true}
import rescripted.collections._
import rescripted.xml.dom._

package rescripted.ui {
  class PieChart(settings) extends Component(settings){
    var data = []
    
    def add(label,value) = {
      data.push{label:label,value:value}
      return self
    }
    
    private def dataTable() = {
      var table = new google.visualization.DataTable()
      table.addColumn('string', 'Key');
      table.addColumn('number', 'Value');
      table.addRows(data.length);
      for(var i=0;i<data.length;i++ ){
        table.setValue(i,0,data[i].label)
        table.setValue(i,1,data[i].value)
      }
      return table
    }
    
    private def createChart(node){
      //http://code.google.com/apis/visualization/documentation/gallery/piechart.html
      //http://code.google.com/apis/visualization/documentation/gallery/imagepiechart.html
      return hasVectorSupport()? new google.visualization.PieChart(node):
                                 new google.visualization.ImagePieChart(node)
    }
    
    override def render(){ return {<div class="chart pie-chart">{|LoadingMessage()|}</div>} }
    
    domMeasured{ node => createChart(node).draw(dataTable(), self.settings) }
  }
  
  class LineChart(settings) extends Component(settings){
    var data = []
    
    def add(label,value) = {
      data.push{label:label,value:value}
      return self
    }
    
    private def dataTable() = {
      var table = new google.visualization.DataTable()
      
      //h-axis
      table.addColumn('string', data[0].label);
      //lines
      for(var i=1;i<data.length;i++)
        table.addColumn('number', data[i].label);
    
      table.addRows(data[0].value.length);
      //data points
      for(var i=0;i<data.length;i++ ){
        var j=0
        for(dataPoint <- data[i].value){
          table.setValue(j,i,dataPoint)
          j++
        }
      }
      return table
    }
    
    private def createChart(node){
      //http://code.google.com/apis/visualization/documentation/gallery/imagelinechart.html
      //http://code.google.com/apis/visualization/documentation/gallery/linechart.html
      return hasVectorSupport()? new google.visualization.LineChart(node):
                                 new google.visualization.ImageLineChart(node)
    }
    
    override def render(){ return {<div class="chart line-chart">{|LoadingMessage()|}</div>} }
    
    domMeasured{ node => createChart(node).draw(dataTable(), self.settings) }
  }
  
  class BarChart(settings) extends Component(settings){
    var data = []
    
    def add(label,value) = {
      data.push{label:label,value:value}
      return self
    }
    
    private def dataTable() = {
      var table = new google.visualization.DataTable()
      
      //h-axis
      table.addColumn('string', data[0].label);
      //lines
      for(var i=1;i<data.length;i++)
        table.addColumn('number', data[i].label);
    
      table.addRows(data[0].value.length);
      //data points
      for(var i=0;i<data.length;i++ ){
        var j=0
        for(dataPoint <- data[i].value){
          table.setValue(j,i,dataPoint)
          j++
        }
      }
      return table
    }
    
    def currentSettings() = {return settingsWithDefaults{isVertical:true,isStacked:false}}
    
    private def createChart(node){
      //http://code.google.com/apis/visualization/documentation/gallery/barchart.html
      //http://code.google.com/apis/visualization/documentation/gallery/columnchart.html
      //http://code.google.com/apis/visualization/documentation/gallery/imagebarchart.html
      var isVertical = currentSettings().isVertical
      return (!hasVectorSupport())? new google.visualization.ImageBarChart(node):
             ( isVertical        )? new google.visualization.ColumnChart(node):
                                    new google.visualization.BarChart(node)
                                 
    }
    
    override def render(){ return {<div class="chart bar-chart">{|LoadingMessage()|}</div>} }
    
    domMeasured{ node => createChart(node).draw(dataTable(), currentSettings()) }

  }
  
}
