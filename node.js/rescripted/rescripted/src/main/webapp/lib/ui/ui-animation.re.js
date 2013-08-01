//rescripted-settings:{"legacy":true}
package rescripted.ui {
  
  object Easing{
    /*
      Easing Equations v1.5
      May 1, 2003
      (c) 2003 Robert Penner, all rights reserved.
      This work is subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html.
    
      These tweening functions provide different flavors of
      math-based motion under a consistent API.
    
      Types of easing:
    
        Linear
        Quadratic
        Cubic
        Quartic
        Quintic
        Sinusoidal
        Exponential
        Circular
        Elastic
        Back
        Bounce
    
      Changes:
      1.5 - added bounce easing
      1.4 - added elastic and back easing
      1.3 - tweaked the exponential easing functions to make endpoints exact
      1.2 - inline optimizations (changing t and multiplying in one step)--thanks to Tatsuo Kato for the idea
    
      Discussed in Chapter 7 of
      Robert Penner's Programming Macromedia Flash MX
      (including graphs of the easing equations)
    
      http://www.robertpenner.com/profmx
      http://www.amazon.com/exec/obidos/ASIN/0072223561/robertpennerc-20
    */
    
    
    // simple linear tweening - no easing
    // t: current time, b: beginning value, c: change in value, d: duration
    def linearTween(t, b, c, d) = ( c*t/d + b )
    
    
    ///////////// QUADRATIC EASING: t^2 ///////////////////
    
    // quadratic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be in frames or seconds/milliseconds
    def easeInQuad(t, b, c, d) = ( c*(t/=d)*t + b )
    
    // quadratic easing out - decelerating to zero velocity
    def easeOutQuad(t, b, c, d) = ( -c *(t/=d)*(t-2) + b )
    
    // quadratic easing in/out - acceleration until halfway, then deceleration
    def easeInOutQuad(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
    }
    
    
    ///////////// CUBIC EASING: t^3 ///////////////////////
    
    // cubic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be frames or seconds/milliseconds
    def easeInCubic(t, b, c, d) = ( c*(t/=d)*t*t + b )
    
    // cubic easing out - decelerating to zero velocity
    def easeOutCubic(t, b, c, d) = ( c*((t=t/d-1)*t*t + 1) + b )
    
    // cubic easing in/out - acceleration until halfway, then deceleration
    def easeInOutCubic(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
    }
    
    
    ///////////// QUARTIC EASING: t^4 /////////////////////
    
    // quartic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be frames or seconds/milliseconds
    def easeInQuart(t, b, c, d) = ( c*(t/=d)*t*t*t + b )
    
    // quartic easing out - decelerating to zero velocity
    def easeOutQuart(t, b, c, d) = ( -c * ((t=t/d-1)*t*t*t - 1) + b )
    
    // quartic easing in/out - acceleration until halfway, then deceleration
    def easeInOutQuart(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
    }
    
    
    ///////////// QUINTIC EASING: t^5  ////////////////////
    
    // quintic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be frames or seconds/milliseconds
    def easeInQuint(t, b, c, d) = ( c*(t/=d)*t*t*t*t + b )
    
    // quintic easing out - decelerating to zero velocity
    def easeOutQuint(t, b, c, d) = ( c*((t=t/d-1)*t*t*t*t + 1) + b )
    
    // quintic easing in/out - acceleration until halfway, then deceleration
    def easeInOutQuint(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
      return c/2*((t-=2)*t*t*t*t + 2) + b;
    }
    
    
    ///////////// SINUSOIDAL EASING: sin(t) ///////////////
    
    // sinusoidal easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in position, d: duration
    def easeInSine(t, b, c, d) = ( -c * Math.cos(t/d * (Math.PI/2)) + c + b )
    
    // sinusoidal easing out - decelerating to zero velocity
    def easeOutSine(t, b, c, d) = ( c * Math.sin(t/d * (Math.PI/2)) + b )
    
    // sinusoidal easing in/out - accelerating until halfway, then decelerating
    def easeInOutSine(t, b, c, d) = ( -c/2 * (Math.cos(Math.PI*t/d) - 1) + b )
    
    
    ///////////// EXPONENTIAL EASING: 2^t /////////////////
    
    // exponential easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in position, d: duration
    def easeInExpo(t, b, c, d) = ( (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b )
    
    // exponential easing out - decelerating to zero velocity
    def easeOutExpo(t, b, c, d) = ( (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b )
    
    // exponential easing in/out - accelerating until halfway, then decelerating
    def easeInOutExpo(t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
    
    
    /////////// CIRCULAR EASING: sqrt(1-t^2) //////////////
    
    // circular easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in position, d: duration
    def easeInCirc(t, b, c, d) = ( -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b )
    
    // circular easing out - decelerating to zero velocity
    def easeOutCirc(t, b, c, d) = ( c * Math.sqrt(1 - (t=t/d-1)*t) + b )
    
    // circular easing in/out - acceleration until halfway, then deceleration
    def easeInOutCirc(t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    }
    
    
    /////////// ELASTIC EASING: exponentially decaying sine wave  //////////////
    
    // t: current time, b: beginning value, c: change in value, d: duration, a: amplitude (optional), p: period (optional)
    // t and d can be in frames or seconds/milliseconds
    
    def easeInElastic(t, b, c, d, a, p) {
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    }
    
    def easeOutElastic(t, b, c, d, a, p) {
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    }
    
    def easeInOutElastic(t, b, c, d, a, p) {
      if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    }
    
    
    /////////// BACK EASING: overshooting cubic easing: (s+1)*t^3 - s*t^2  //////////////
    
    // back easing in - backtracking slightly, then reversing direction and moving to target
    // t: current time, b: beginning value, c: change in value, d: duration, s: overshoot amount (optional)
    // t and d can be in frames or seconds/milliseconds
    // s controls the amount of overshoot: higher s means greater overshoot
    // s has a default value of 1.70158, which produces an overshoot of 10 percent
    // s==0 produces cubic easing with no overshoot
    def easeInBack(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*(t/=d)*t*((s+1)*t - s) + b;
    }
    
    // back easing out - moving towards target, overshooting it slightly, then reversing and coming back to target
    def easeOutBack(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }
    
    // back easing in/out - backtracking slightly, then reversing direction and moving to target,
    // then overshooting target, reversing, and finally coming back to target
    def easeInOutBack(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }
    
    
    /////////// BOUNCE EASING: exponentially decaying parabolic bounce  //////////////
    
    // bounce easing in
    // t: current time, b: beginning value, c: change in position, d: duration
    def easeInBounce(t, b, c, d) = ( c - easeOutBounce (d-t, 0, c, d) + b )
    
    // bounce easing out
    def easeOutBounce(t, b, c, d) {
      if ((t/=d) < (1/2.75)) {
        return c*(7.5625*t*t) + b;
      } else if (t < (2/2.75)) {
        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
      } else if (t < (2.5/2.75)) {
        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
      } else {
        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
      }
    }
    
    // bounce easing in/out
    def easeInOutBounce(t, b, c, d) {
      if (t < d/2) return easeInBounce (t*2, 0, c, d) * .5 + b;
      return easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
  
  }
  
  object AnimationTools{
    def get(items) = {
      if(items.constructor == String)
        return document.getElementById(items);
    
      var result					= [];
      for(var i=0;i<items.length;i++){
        result.push(document.getElementById(items[i]));
      }
      return result;
    }
  
    def now() = ( new Date().getTime() )
  
    def merge(a,b) = {
      for(var property in b){
        if(a[property])
          continue;
        a[property] = b[property];
      }
      return a;
    }
    
    //Take a value that is between start and end, and convert it to a value between 0 and 1
    def normalize(start, end, position) = ( AnimationTools.clamp(0,1, ((position - start)/(end - start)) ) )
    
    //Take a value between 0 and 1 and extrapolate the position it represents between start and end
    def denormalize(start, end, normal) = ( AnimationTools.clamp(start,end, (start+((end - start) * normal)) ) )
    
    def clamp(a,b,value) = {
      return (a < b)? Math.min(b,Math.max(a,value)):
                      Math.min(a,Math.max(b,value));
    }
    def roundToXPlaces(number, places) = {
      var multiplier = Math.pow(10,places);
      return Math.round(number*multiplier)/multiplier;
    }
  }
  
  class AnimationManager(timerResolution){
    var animationQueue = {}
    var timerHandle = -1
    var animationId = 0
    
    def start(settings){
      
      var animation = AnimationTools.merge(settings,{
        elements:[],
        functions:[],
        animation:null,
        duration:5,
        properties:{},
        easing:Easing.linearTween,
        complete:{=>},
        update:{=>},
        position:0,
        start:AnimationTools.now(),
        end:-1,
        name:"UnnamedAnimation"+(animationId++),
        paused:false
      });
    
      if(self.isActive(animation.name))
        return;
    
      //Required parameters
      if(animation.animation == null)
        error("AnimationManager: The animation parameter must be specified");
      if(animation.elements == null)
        error("AnimationManager: The elements parameter must be specified");
    
      //Allow single elements to be passed
      if(animation.elements.constructor != Array){
        animation.elements = [animation.elements];
      }
    
      //Don't allow empty lists
      if(animation.elements.length == 0)
        error("AnimationManager: The elements parameter must not be empty");
    
      //Prepare our properties
      animation.end = animation.start + animation.duration*1000;
    
      //Build our animation functions
      for(var i=0;i<animation.elements.length;i++){
        var element = animation.elements[i];
        animation.functions.push(animation.animation(animation.properties,element));
      }
    
      //Queue up our animation
      animationQueue[animation.name]	= animation;
    
      //Start animating
      startTimer();
    }
    def startTimer(){
      //Start timer updates if it isn't running
      if(timerHandle == -1)
        timerHandle = setInterval(function(){onUpdateAnimation()},timerResolution);
    }
    def pause(name){
      var animation = animationQueue[name];
      if(!animation)
        return;
      animation.paused = true;
    }
    def resume(name){
      var animation = animationQueue[name];
      if(!animation)
        return;
    
      //Perform time fixup
      fixupTime(animation);
    
      //Mark as playing
      animation.paused = false;
    
      //Ensure that the timer is running
      startTimer();
    }
    def seek(name,position){
      var animation = animationQueue[name];
      if(!animation)
        return;
    
      //Seek
      updateAnimation(animation,AnimationTools.clamp(0,1,position));
    
      //Perform time fixup
      fixupTime(animation);
    
      //Ensure that the timer is running
      startTimer();
    }
    private def fixupTime(animation){
      //Translate the time values to match now, and change the flag to unpaused
      var duration      = animation.end - animation.start;
      var offset        = duration*animation.position;
      animation.start   = AnimationTools.now() - offset;
      animation.end     = animation.start + duration;
    }
    def stop(name){
      delete animationQueue[name];
    }
    def isActive(name){
      var animation = animationQueue[name];
      return animation != null;
    }
    def isPaused(name){
      var animation = animationQueue[name];
      return animation != null && animation.paused;
    }
    def isPlaying(name,currentTime){
      var animation = animationQueue[name];
      return animation != null &&
          !animation.paused &&
          (currentTime == null || currentTime < animation.end);
    }
    private def onUpdateAnimation(){
      var hasActiveAnimations = false;
      var currentTime = AnimationTools.now();
    
      for(var name in animationQueue){
        var animation = animationQueue[name];
    
        //Skip paused animations
        if(animation.paused)
          continue;
    
        //Skip animations that haven't started yet, but keep the timer alive
        if(currentTime < animation.start){
          hasActiveAnimations = true;
          continue;
        }
    
        //Update our non paused animations before we check to remove them
        //	this will ensure that they finish animating all the way to 100%
    
        //Calculate a value between 0 and 1 based on the time elapsed between the start and end
        updateAnimation(animation,AnimationTools.normalize(animation.start, animation.end, currentTime));
    
        //Remove the animation if it is no longer playing
        if(!self.isPlaying(name,currentTime)){
          //If we have a complete event, queue it to run later
          //	(fixes problems with effects starting in the complete handler
          //	just as the timer is being killed due to lack of work)
          if(animation.complete!=null)
            setTimeout(animation.complete,10);
          delete animationQueue[name];
          continue;
        }
    
        //The animation was active, keep the timer alive
        hasActiveAnimations = true;
      }
    
      //Stop updates for the time being
      if(!hasActiveAnimations && timerHandle!=-1){
        clearInterval(timerHandle);
        timerHandle = -1;
      }
    }
    private def updateAnimation(animation,position){
      var easing = animation.easing(position,0,1,1);
      /*
      var duration				= animation.end - animation.start;
      var easing					= animation.easing(duration*position,0,1,duration);
      */
    
      animation.position = position;
      for(var i=0;i<animation.functions.length;i++){
        animation.functions[i](easing);
      }
      animation.update(animation);
    }
  }

}
