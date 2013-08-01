//rescripted-settings:{"legacy":true}
import rescripted.collections._
import rescripted.xml.dom._

package rescripted.ui{
  
  class ListView(settings) extends Component(settings){

    var dataSource = DataSource(self.settings.dataSource)
    var renderer = self.settings.itemRenderer
    var isSelectedItem = self.settings.isSelectedItem || {=>false}
    
    self.change = Event(self)
    
    self.data = List()
    self.filterPredicate = null
    self.sortFunction = null
    self.sortDirection = null
    
    var dataCache = null
    
    def sort(func,dir){
      dataCache = null
      self.sortFunction = func
      self.sortDirection = dir || "desc"
      self.refresh()
      return self
    }
    
    def filter(predicate) = {
      dataCache = null
      self.filterPredicate = match(predicate){
        case search:String => buildPredicate(search)
        case func:Function => func
        case other => null
      }
      refresh()
      return self
    }
    
    private def buildPredicate(searchString) = {
      var searchValues = Seq.fromArray(searchString.toLowerCase().split(/\s+/)).filter(_!='')
      return { item =>
        if(searchValues.size() == 0) return true;
        var matchCount = 0;
        var itemValue = renderer(item).toString().toLowerCase()
        searchValues.foreach{value =>
          if(itemValue.indexOf(value) != -1)
            matchCount++            
        }
        return matchCount >= searchValues.size();
      }
    }
    
    private def itemClick(item) = {
      return {e =>
        jquery(".listview-item").removeClass("selected")
        $(this).addClass("selected")
        self.change.invoke(item)
      }
    }

    def refresh(){ replaceBody(responseBody()) }
    
    def responseBody() = {
      if(dataCache == null){
        dataCache = (self.filterPredicate == null)? self.data:self.data.filter(self.filterPredicate);
        if(self.sortFunction != null && self.sortDirection != null)
          dataCache.sort(self.sortFunction,self.sortDirection);
      }
      
      if(dataCache.size() == 0)
        return noResultsMessage()
      
      var index = 0;
      return dataCache.map{item => 
        var className = List('listview-item',isSelectedItem(item)?"selected":"",(index%2==0?'odd':'even'),'row'+(index++)).mkString(" ")
        return XmlSetAttribute(itemWrapper(renderer(item),item),'class',className)
      }
    }
    
    def itemWrapper(rendered,item) = {<a href="javascript:void(0)" onclick={|itemClick(item)|}>{|rendered|}</a>}
    
    def listWrapper(value) = { <div class='listview-body'>{|value|}</div> }
    
    def replaceBody(value){
      jquery("> .listview-body").remove()
      var target = jquery()
      if(target.length > 0) target.append(listWrapper(value))
    }
    
    def reload() = {
      replaceBody(loadingMessage())
      dataSource{data =>
        dataCache = null
        self.data = from(data)
        setTimeout(refresh,10);
      }
    }
    
    def loadingMessage() = (LoadingMessage())
    def noResultsMessage() = { <span class='no-results-message'>No Results.</span> }
    
    self.domInserted(self.reload)

    override def render() = { <div class='listview'>{|listWrapper(loadingMessage())|}</div> }
  }
  
  def ListViewSimpleRenderer(item) = {<div>{|item|}</div>}
  
  def twoLineRenderer(line1,line2) = (item => ListViewTwoLineRenderer(item,line1,line2))

  def ListViewTwoLineRenderer(item,line1,line2) = {
    if(item == null)
      return {<div>Empty</div>}
    else 
      return {
        <div class='listview-two-line-renderer'>
          <div class='line1'>{|line1(item)|}</div>
          <div class='line2'>{|line2(item)|}</div>
        </div>
      }
  }

  class DataGrid(settings) extends Component(settings){

    var columns = List.fromArray(self.settings.columns || []).flatten()
    var dataSource = DataSource(self.settings.dataSource)
    
    self.data = List()
    self.filterPredicate = null
    self.sortFunction = null
    self.sortDirection = null
    self.sortColumnIndex = -1
    
    private def columnLowerCaseValue(column) = {
      return {item =>
        var result = column.format(item);
        return result == null?null:result.toString().toLowerCase()
      }
    }
    
    private def columnSortFunction(column) = {
      var sortFunction = column.sort;
      if(typeOf(sortFunction) == Boolean)
        sortFunction = columnLowerCaseValue(column);
      return sortFunction;
    }
    
    private def buildSortHandler(index,dir) = {
      var column = columns(index)
      
      if(!column.sort)
        return null;
      
      var sortFunction = columnSortFunction(column);
      
      return {=> 
        self.sortColumnIndex = index
        
        sort(sortFunction,dir)
        //show the correct indicator and sort
        jquery("> table > thead > tr > td .sort").removeClass("active-sort")
        if(self.sortDirection == "asc")
          $(".sort.ascending",jquery("> table > thead > tr > td").get(index)).addClass("active-sort")
        else
          $(".sort.descending",jquery("> table > thead > tr > td").get(index)).addClass("active-sort")
      }
    }
    
    def sort(func,dir){
      if(self.sortFunction == func && dir == null)
        self.sortDirection = self.sortDirection == "asc"? "desc":"asc"
      else
        self.sortDirection = dir || "desc"

      self.sortFunction = func
      self.refresh()
      return self
    }
    
    def sortOn(columnIndex,dir){
      buildSortHandler(columnIndex,dir)()
      return self;
    }
    
    def header() = {
      var index = 0
      return {
        <tr>
        {|
          columns.map{column =>
            var ascendingActive = index == self.sortColumnIndex && self.sortDirection == 'asc'? ' active-sort':'';
            var descendingActive = index == self.sortColumnIndex && self.sortDirection == 'desc'? ' active-sort':'';
            var sortEvent = buildSortHandler(index++)
            var className = List('datagrid-column-heading',sortEvent != null?'can-sort':'').filter(_!='').mkString(" ")
            return {
              <td class={|className|} onclick={|sortEvent|} width={|column.width|}>
                <span>{|column.name|}</span>
                <span class={|'sort ascending'+ascendingActive|}><span class='symbol'>&#9650;</span></span>
                <span class={|'sort descending'+descendingActive|}><span class='symbol'>&#9660;</span></span>
              </td>
            }
          }
        |}
        </tr>
      }
    }
    
    private def buildPredicate(searchString) = {
      var values = List.fromArray(searchString.toLowerCase().split(/\s+/)).filter({_!=''})
      return { item =>
        if(values.size() == 0) return true;
        var matchCount = 0;
        for(value <- values){
          var matched = false
          for(column <- columns){
            var columnValue = columnLowerCaseValue(column)(item)
            if(columnValue != null && columnValue.toString().indexOf(value) != -1)
              matched = true;
          }
          if(matched)
            matchCount++
        }
        return matchCount >= values.size();
      }
    }
    
    def filter(predicate) = {
      switch(typeOf(predicate)){
        case String:
          self.filterPredicate = buildPredicate(predicate)
          break;
        case Function:
          self.filterPredicate = predicate
          break;
        default:
          self.filterPredicate = null
      }
      refresh();
      return self;
    }

    def refresh(){
      var target = jquery("> table")
      if(target.length > 0){
        jquery("> table > tbody").remove();
        target.append(createBody())
      }
    }
    
    def createBody() = {
      var matchingData = (self.filterPredicate == null)? self.data:self.data.filter(self.filterPredicate);
      if(self.sortFunction != null && self.sortDirection != null)
        matchingData.sort(self.sortFunction,self.sortDirection);
      
      if(matchingData.size() == 0)
        return noResultsMessage()
      
      var index = 0;
      return {
        <tbody class='datagrid-body'>
        {|
          for(value <- matchingData) yield {
            var className = List('datagrid-row',(index%2==0?'odd':'even'),'row'+(index++)).mkString(" ")
            return { <tr class={|className|}>{| for(column <- columns) yield { return {<td class='datagrid-column'>{|column.format(value)|}</td>} } |}</tr> }
          }
        |}
        </tbody>
      }
    }
    
    def reload() = {      
      jquery("> table > tbody").remove()
      jquery("> table").append(loadingMessage())
      dataSource({data =>
        self.data = from(data)
        setTimeout(refresh,10);
      })
    }
    
    def loadingMessage() = {
      <tbody class='datagrid-body'>
        <tr>
          <td colspan={|columns.size()|} class='datagrid-loading-message'>{|LoadingMessage()|}</td>
        </tr>
      </tbody>
    }

    
    def noResultsMessage() = {
      <tbody class='datagrid-body'>
        <tr>
          <td colspan={|columns.size()|} class='no-results-message'>No Results.</td>
        </tr>
      </tbody>
    }
    
    self.domInserted(self.reload)

    override def render() = {
      return {
        <div class='datagrid'>
          <table class='ui-table'>
            <thead class='datagrid-header'>{|self.header()|}</thead>
            {|loadingMessage()|}
          </table>
        </div>
      }
    }
  }
  
}
