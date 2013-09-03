$(function() {
    //phantomLimb.start()

    var button = $('<div>button</div>')
    button.css('font-size', 40)
    button.css('font-size', 40)
    $("body").append(button)

    var over = false
    button.on('touchstart', function() {
        console.log('start')
        over = true
    })
    button.on('touchmove', function(e) {
        console.log('move')
        var touch = e.originalEvent.changedTouches[0]
        var elementRectangle = nodeToRectangle($(this))
        var touchpoint = {x:touch.pageX, y:touch.pageY}

        var inbounds = isInBounds(touchpoint, elementRectangle)
        if(!over && inbounds) {
            console.log("touchenter")
            over = true
        } else if(over && !inbounds) {
            console.log("touchleave")
            over = false
        }
    })
    
    /*
    events I want:
		anyTouchOver  - when one or more touches (that started over the element) are over the element
		allTouchesLeave - when the last touch touching an element (that started over the element) leaves or ends
		touchEndOver - when a touchend (that started over the element) happens over the element
		touchleave - when a touch (that started over the element) leaves the element
		touchenter - when a touch (that started over the element, but then left) enters the element
    */

    touch(button, "touchstart", function(e) {
        e.touch.on('touchend', function(e) {
            var anyOver = e.touches.target.reduce(function(acc, v) {acc|| v.overTarget()}, false)
            var allLeft = e.touches.target.reduce(function(acc, v) {acc && (!v.overTarget() || v.ended || v.cancelled)}, true)
            if(anyOver) { // touches, filtered by ones that started over the target, get if its currently over the target

            } else if(allLeft) {
                if(e.touch.overTarget()) {

                }
            }
        })
    })


    touch(button, "touchstart", function(e) {
        console.log("start")
        $(this).css({backgroundColor: 'red'})
        e.on("touchleave", function(event) {
            console.log("end")
            $(this).css({backgroundColor: 'transparent'})
        }).on("touchend", function(event) {
            console.log("end")
            $(this).css({backgroundColor: 'transparent'})
        })
    })
})

touch.isOver = function(touch, target) {
    isInbounds(touchToPoint(touch), nodeToRectangle($(target)))
}
touch.anyOver = function(touchlist) {
    return touchlist.reduce(function(acc, v) {acc|| touch.isOver(v, v.target)}, false)
}
touch.allLeft = function(touchlist) {
    return touchlist.reduce(function(acc, v) {acc|| touch.isOver(v, v.target)}, false)
}


function touchToPoint(touch) {
    return {x: touch.pageX, y: touch.pageY}
}
function nodeToRectangle(node) {
    var offset = node.offset()
    return {x: offset.left, y: offset.top, width: node.outerWidth(), height: node.outerHeight()}
}

// point should be like {x:x, y:y}
// rectangle should be like {x:x, y:y, height:height, width:width}
//   where x,y is the top left point of the rectangle
function isInBounds(point, rectangle) {
    return  point.x > rectangle.x && point.x < rectangle.x+rectangle.width &&
            point.y > rectangle.y && point.y < rectangle.y+rectangle.height
};

var supportedEvents = ['touchmove','touchend','touchcancel','touchenter','touchleave']

/* todo:
     * ability to remove touch handler
     * non-targeted touches:
		touchmove - when a touch (even if it didn't start over the element) moves
		touchenter
		touchleave
		touchend
     * consider this to detect mousemove events over objects the event didn't start over:
            document.elementFromPoint(event.clientX, event.clientY);
*/
function touch(element, eventTypes, handler) {
    element.on(eventTypes, function(pEvent) {
        var touches = pEvent.originalEvent.changedTouches
        for(var i=0; i < touches.length; i++) {
            var touch = touches[i]
            var touchEvent = newTouchEvent.call(this, touch, pEvent)
            handler.call(this, touchEvent)
        }
    })
}

function newTouchEvent(touch, event) {
    return _newTouchEvent(this, touch, event)
}

function _newTouchEvent(element, touch, event, on) {
    var eventHandlers = {}
    supportedEvents.forEach(function(eventType) {
        eventHandlers[eventType] = []
    })

    var touchEvent = {touch: touch}
    if(on) {
        touchEvent.on = on
    } else {
        touchEvent.on = function(eventTypes, subhandler) {
            var types = eventTypes.split(" ")
            supportedEvents.forEach(function(eventType){
                if(types.indexOf(eventType) != -1) {
                    eventHandlers[eventType].push(subhandler)
                }
            })
            return touchEvent
        }
    }

    var internalEventHandlers = {}
    supportedEvents.forEach(function(eventType) {
        internalEventHandlers[eventType] = function(subPEvent) {
            filterAndRun(element, touch, subPEvent,touchEvent.on, eventHandlers[eventType])
            if(eventType === 'touchend' || eventType === 'touchcancel') {
                supportedEvents.forEach(function(eventType) {
                    $(element).off(eventType, internalEventHandlers[eventType])
                })
            }
        }
    })

    supportedEvents.forEach(function(eventType) {
        $(element).on(eventType, internalEventHandlers[eventType])
    })

    return touchEvent
}

function filterAndRun(element, originalTouch, subPEvent, on, handlers) {
    var subtouches = subPEvent.originalEvent.changedTouches
    for(var n=0; n < subtouches.length; n++) {
        var subtouch = subtouches[n]
        if(subtouch.identifier === originalTouch.identifier) {
            handlers.forEach(function(handler) {
                handler.call(element, _newTouchEvent(element, originalTouch, subPEvent, on))
            })
        }
    }
}