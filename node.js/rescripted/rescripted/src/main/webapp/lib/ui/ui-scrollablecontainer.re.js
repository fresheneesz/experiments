//rescripted-settings:{"legacy":true}
import rescripted.collections._
import rescripted.xml.dom._

package rescripted.ui{

  //based in part on glovebox: http://code.google.com/p/glovebox/
  class ScrollableContainer(settings) extends Container(settings){

    var startX = 0
    var startY = 0
    
    var lastX = 0
    var lastY = 0
	
    var xVel = 0
    var yVel = 0
    
    var currentX = 0
    var currentY = 0
    
    var scrollY = true
    var scrollX = false
    
    var isDragging = false
	
    var container = null
    var content = null
    
    var state = null
    
    var _dragThreshold = 10
    
    var throttle = FrequencyThrottle(50)
    
    var isTouchScroll = isMobileBrowser() && !($("body").hasClass("use-body-scroll"))
    
    
    self.domInserted{node=>
      container = node
      content = document.getElementById(self.componentId+"-content")
      if(isTouchScroll){
        document.addEventListener("touchmove", {e => e.preventDefault()}, false)
        
        container.addEventListener('touchstart', touchStart, false);
        container.addEventListener('click', {e=>
            if(isDragging){
              e.preventDefault()
              e.stopPropagation()
            }
          }, true)

        content.addEventListener("webkitTransitionEnd", transitionEnd, true );
        content.style.webkitTransition = "none";
      }
    }
    
    var disabledFormElements = null
    private def disableInputs(){
     // disabledFormElements = ArraySeq()
     // var toDisable = ArraySeq(
     //   document.getElementsByTagName("select"),
     //   document.getElementsByTagName("input"),
     //   document.getElementsByTagName("textarea")
     //   ).flatten()
     // 
     // for(elem <- toDisable if !elem.disabled){
     //   elem.disabled = true
     //   disabledFormElements.append(elem)
     // }
    }
    
    private def reenableInputs(){
     // if(disabledFormElements != null)
     //   disabledFormElements.foreach{_.disabled = false}
     // disabledFormElements = null
    }
    
    private def addTouchListeners(){
      container.addEventListener('touchmove', touchMove, false);
      container.addEventListener('touchend', touchEnd, false);
      container.addEventListener('touchcancel', touchEnd, false);
    }
    
    private def removeTouchListeners(){
      container.removeEventListener('touchmove', touchMove, false);
      container.removeEventListener('touchend', touchEnd, false);
      container.removeEventListener('touchcancel', touchEnd, false);
    }
    
    private def updateTransform(){
      if(isTouchScroll) {
        if(content) content.style.webkitTransform =  "translate3d("+currentX+"px,"+currentY+"px,0px) scale(1.0)";
      } else {
        jquery().scrollLeft(currentX).scrollTop(currentY)
      }
    }
    
    private def touchStart(e){
      if(e.targetTouches.length != 1) return false
        
      content.style.webkitTransition = "none";  
        
      state = "starting";
        
      e.stopPropagation()
      startX = e.targetTouches[0].pageX
      startY = e.targetTouches[0].pageY
      lastX = startX
      lastY = startY
      xVel = 0
      yVel = 0
      addTouchListeners()
    }

    private def touchMove(e){
      // Don't track motion when multiple touches are down in this element (that's a gesture)
      if (e.targetTouches.length != 1) return false;
      if(disabledFormElements == null) disableInputs();

      state = "moving";
      
      // Prevent the browser from doing its default thing (scroll, zoom)
      e.preventDefault();
      //e.stopPropagation()
      
      var x = e.targetTouches[0].pageX;
      var y = e.targetTouches[0].pageY;
      
      var dX = x - lastX;
      var dY = y - lastY;
      
      if(!isDragging && ( Math.abs(dX) > _dragThreshold || Math.abs(dY) > _dragThreshold ) ){
        isDragging = true;
      }
      // it may have been changed by the statement above
      if(isDragging){
        // poor-man's input filter 
        xVel = (dX + xVel * 10 ) / 10;
        yVel = (dY + yVel * 10 ) / 10;
        
        updateScrollPosition(
          scrollX ? ( currentX + dX ) : currentX,
          scrollY ? ( currentY + dY ) : currentY
          );
        
        lastX = x;
        lastY = y;
      }
    }

    private def touchEnd(e){
      if(!isDragging) return false;
      
      content.style.webkitTransition = "-webkit-transform 300ms ease-out";
      
      setTimeout({=>isDragging = false; reenableInputs()} ,1000);
      // Prevent the browser from doing its default thing (scroll, zoom)
      removeTouchListeners()
      
      // pass on our mock event
      touchMove{targetTouches:e.changedTouches,preventDefault:{=>e.preventDefault()},stopPropagation:{=>e.stopPropagation()}}
      
      state = "ending";
      // magic number 2 is a projection of how far we will throw the scroll content before
      // snapping it back, this will take the length of the afterTrans, and is a poor-man's
      // interpretation of momentum
      updateScrollPosition(
        Math.round(scrollX ? ( currentX + (2 * xVel) ) : currentX),
        Math.round(scrollY ? ( currentY + (2 * yVel) ) : currentY)
        )

      return false;
    }
    
    private def finishScrolling(){
      state = "done";
      isDragging = false;
      scrollTo(currentX,currentY)
    }
    
    private def transitionEnd(){ if(state == "ending"){ finishScrolling() } }
    
    def scrollIntoView(elem){
      //ensure that elem is a jquery object, detect its offset, and scroll to it
      if(isTouchScroll) {
        scrollToY(currentY-UiTools.jquery(elem).position().top);
      } else {
        scrollToY(jquery().scrollTop() + UiTools.jquery(elem).position().top);
      }
    }
    
    def scrollTo(x,y){

      //clamp the position on touch scroll devices      
      if(isTouchScroll){
        // get updated x position
        var containerWidth = container.offsetWidth;
        var scrollWidth = content.scrollWidth;// * scale;
        var maxX = ( scrollWidth - containerWidth ) / 2; // div 2 beacause we scale from the center ( 50% )
        var minX = ( containerWidth - scrollWidth ) / 2;
        
        x = Math.min(maxX,Math.max(x,minX));
        
        // get updated y
        var containerHeight = container.offsetHeight;
        var scrollHeight = content.scrollHeight// * scale;
        var maxY = 0;
        var minY = containerHeight - scrollHeight
        
        y = Math.min(maxY,Math.max(y,minY))
      }
      
      updateScrollPosition(x,y)
    }
    
    def scrollToX(x){ scrollTo(x,currentY) }
    def scrollToY(y){ scrollTo(currentX,y) }
    
    private def updateScrollPosition(x,y){
      currentX = x
      currentY = y
      updateTransform()
    }
      
    def scrollableContent() = {return $(".scrollable-content",jquery())}
    
    override def render() = {
      return {<div class='container scrollable'><div id={|self.componentId+"-content"|} class='scrollable-content'>{|self.children|}</div></div>}
    }
  }
  
}
