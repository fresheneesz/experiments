package {
	import flash.desktop.NativeApplication;
	import flash.display.Shape;
	import flash.events.Event;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.ui.Multitouch;
	import flash.ui.MultitouchInputMode;
	import mx.core.ButtonAsset;
	import org.gestouch.events.GestureEvent;
	import org.gestouch.gestures.PanGesture;
	import org.gestouch.gestures.PanGestureDirection;
	import org.gestouch.gestures.SwipeGesture;
	import org.gestouch.gestures.SwipeGestureDirection;
	import org.gestouch.gestures.TapGesture;
	import org.gestouch.gestures.ZoomGesture;
	
	/**
	 * ...
	 * @author elimak
	 */
	public class Main extends Sprite {
		
		public function Main():void {
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			stage.addEventListener(Event.DEACTIVATE, deactivate);
			
			// touch or gesture?
			
			Multitouch.inputMode = MultitouchInputMode.TOUCH_POINT;
			
			// entry point
			// tracing the gestures:
			
			var pan:PanGesture = new PanGesture(stage);
			pan.maxNumTouchesRequired = 2;
			pan.addEventListener(GestureEvent.GESTURE_BEGAN, onPan);
			pan.addEventListener(GestureEvent.GESTURE_CHANGED, function() {
				trace("gesture changed")
			});
			pan.addEventListener(GestureEvent.GESTURE_CHANGED, function(e) {
				child.x += e.target.offsetX
				child.y += e.target.offsetY
			});
			
			pan.addEventListener(GestureEvent.GESTURE_STATE_CHANGE, function() {
				trace("gesture state changed")
			});
			pan.addEventListener(GestureEvent.GESTURE_POSSIBLE, function() {
				trace("gesture possible")
			});
			pan.addEventListener(GestureEvent.GESTURE_FAILED, function() {
				trace("gesture failed")
			});
			pan.addEventListener(GestureEvent.GESTURE_RECOGNIZED, function() {
				trace("gesture recognized")
			});
			pan.addEventListener(GestureEvent.GESTURE_BEGAN, function() {
				trace("gesture began")
			});
			pan.addEventListener(GestureEvent.GESTURE_CHANGED, function() {
				trace("gesture changed")
			});
			pan.addEventListener(GestureEvent.GESTURE_ENDED, function() {
				trace("gesture ended")
			});
			
			
			var child:Shape = new Shape();
			child.graphics.beginFill(0xFFCC00);
			child.graphics.lineStyle(1, 0xFFCC00);
			child.graphics.drawCircle(40, 20, 50);
			child.graphics.endFill();
			
			stage.addChild(child)
			
			child.y = 60
			child.x = 70
			
			var zoom = new ZoomGesture(stage)
			on(zoom, [GestureEvent.GESTURE_BEGAN, GestureEvent.GESTURE_CHANGED] , function(e) {
				trace("zoom: "+e.target.scaleY+", "+e.target.scaleX)
				child.scaleY *= e.target.scaleY
				child.scaleX *= e.target.scaleX
				log(e)
			});
			
			/*
			var tapGesture : TapGesture= new TapGesture(stage);
			tapGesture.numTapsRequired = 1;
			tapGesture.addEventListener(GestureEvent.GESTURE_RECOGNIZED, onTap);
				
			var swipeDown: SwipeGesture = new SwipeGesture(stage);
			swipeDown.addEventListener(GestureEvent.GESTURE_RECOGNIZED, onSwipeDown);
			swipeDown.direction = SwipeGestureDirection.DOWN;

			var swipeUp : SwipeGesture= new SwipeGesture(stage);
			swipeUp.addEventListener(GestureEvent.GESTURE_RECOGNIZED, onSwipeUp);
			swipeUp.direction = Swipe
			GestureDirection.UP;
			
			pan.requireGestureToFail(swipeDown);
			pan.requireGestureToFail(swipeUp);
			
			//*/
		}
		
		private function log(object) {
			for (var x in object) {
				trace(x + ": " + object[x])
			}
		}
		
		private function on(object, events, handler) {
			for (var n = 0; n < events.length; n++) {
				object.addEventListener(events[n], handler)
			}
		}
		
		private function onTap(e:GestureEvent): void{
			var gesture:TapGesture = e.target as TapGesture;
			trace("onTap");
			trace("x: " + gesture.location.x + " y: " + gesture.location.y);
		}
		
		private function onPan(e:GestureEvent) : void{
			var gesture:PanGesture = e.target as PanGesture;
			trace("PanGesture");
			var dir : String = (gesture.direction == PanGestureDirection.VERTICAL)? "vertical" : "horizontal";
			trace(dir);
			trace("offsetX "+gesture.offsetX+" offestY: "+gesture.offsetY);
		}
		
		private function onSwipeUp(e:GestureEvent) : void {
			var gesture:SwipeGesture = e.target as SwipeGesture;
			trace("Swipe Gesture Up");
			trace("offestY: "+gesture.offsetY);
		}		
		
		private function onSwipeDown(e:GestureEvent) : void {
			var gesture:SwipeGesture = e.target as SwipeGesture;
			trace("Swipe Gesture Down");
			trace("offestY: "+gesture.offsetY);
		}
		
		private function deactivate(e:Event):void {
			// make sure the app behaves well (or exits) when in background
			//NativeApplication.nativeApplication.exit();
		}
	
	}

}