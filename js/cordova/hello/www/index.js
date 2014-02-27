require(['jquery', 'proto', /*'touch.amd.min', 'phantomLimb', */'jquery.gsap.min','jquery-transit', 'jquery.easing', 'zepto'], function($, proto, touch, phantomLimb) {
    //phantomLimb.start()

    // options can contain: classes, setup, on, off
    var View = proto(function() {
        // create the view
        this.init = function(options) {
            var classes = ['view']
            if(options.classes)
                classes = classes.concat(options.classes.split(" "))

            this.element = div('', classes.join(" ")).css({position: 'absolute'})

            this.options = options

            return this
        }

        // initialize the view
        this.setup = function() {
            if(this.options.setup) {
                this.options.setup.call(this)
            }
            this.initialized = true
        }

        // show the view
        this.show = function() {
            if(!this.initialized) {
                this.setup()
            }

            if(this.options.show) {
                this.options.show.call(this)
            }
            this.element.show()
            return this
        }
        // hide the view
        this.hide = function() {
            this.element.hide()
            if(this.options.hide) {
                this.options.hide.call(this)
            }
            return this
        }

        // turn on view behavior
        this.on = function() {
            if(this.options.on) {
                this.options.on.call(this)
            }
            this.isOn = true
            return this
        }
        // turn off view behavior
        this.off = function() {
            this.behind()
            if(this.options.off) {
                this.options.off.call(this)
            }
            this.isOn = false
            return this
        }

        this.top = function() {
            this.element.addClass("top")
            return this
        }
        this.behind = function() {
            this.element.removeClass("top")
        }
    })

    var transition = fadeInAction

    $(function() {
        var images = ["000001.BMP", "000002.BMP","000003.BMP","000004.BMP","000005.BMP","00002.BMP","1 trophy.bmp","2 trophy.bmp","3 trophy.bmp","42.BMP","82.GIF","85.GIF","About Me Metal Oval.gif","About Us Metal Oval.gif","ALRRROW.GIF","ANCHOR.GIF","Aphex.bmp","arrow left.jpg","arrow right.JPG","ArtilleryBronze.bmp","ArtilleryGold.bmp","artilleryOFF.bmp","artilleryON.bmp","ArtillerySilver.bmp","ATOM.GIF","A_SENSOR.GIF","Back dark.gif","Back Metal Oval.gif","Back Wooden.gif","BACK.GIF","Back2.gif","BELL.GIF","BG3D.BMP","bg3d.icl, 1.JPG","BIBLE.GIF","Black Cross.bmp","BLON.BMP","BONES.BMP","Bosnia.bmp","BUFFALO.BMP","Building Government.gif","Bullet Square blue.gif","Bullet Square dark.gif","Bullet Square green.gif","Bullet Square red.gif","BULLETS.BMP","Business Human Resources.gif","BUTT1.GIF","BUTT10.GIF","BUTT11.GIF","BUTT12.GIF","BUTT13.GIF","BUTT14.GIF","BUTT15.GIF","BUTT16.GIF","BUTT17.GIF","BUTT18.GIF","BUTT19.GIF","BUTT2.GIF","Butterfly.gif","camcorder 3.gif","camcorder.gif","camcorder2.gif","CHANGE.BMP","CHANGE.JPG","COLLOR.GIF","Contact Metal Oval.gif","CPU.GIF","CPUFLAG1.BMP","cpuflag2.Bmp","cpuflag3.Bmp","cpuflag4.Bmp","cpuflag5.Bmp","Crew52.bmp","CROSS.BMP","CROSS02.BMP","Cut.bmp","Cut.JPG","Cyclops.bmp","Cyprus.bmp","C_GOTO.GIF","C_PAN.GIF","C_ROLL.GIF","C_STUDY.GIF","C_TURN.GIF","C_WALK.GIF","Daisy.bmp","Dark.bmp","Des.bmp","Dest2.bmp","DONKEY.BMP","DonorOFF.bmp","DonorON.bmp","Down dark.gif","Down.gif","DRAGON.GIF","Dropflag.bmp","DudmineOFF.bmp","DudmineON.bmp","DUNG.BMP","E-Mail Metal Oval.gif","Eagle Bald.gif","Earth.gif","EU.BMP","EuthanasiaBronze.bmp","EuthanasiaGold.bmp","EuthanasiaSilver.bmp","Eyes.bmp","Face Alien Purple.gif","Face.bmp","falldamageOFF.bmp","FANFARE.BMP","File Cabinet.gif","FILE.BMP","FIRE.BMP","Fish Tropical.gif","Flag UK.gif","Flag USA 3D.gif","Flashlight.gif","FLOWER.BMP","FOLDER.GIF","Foot Paw Print.gif","Football.gif","FRACT.GIF","FROZEN.BMP","ftv2blank.gif","FTV2DOC.BMP","FTV2DOC.GIF","FTV2DOCN.BMP","ftv2folderclosed.bmp","ftv2folderclosed.gif","ftv2folderclosed.JPG","ftv2folderopen.bmp","ftv2folderopen.gif","ftv2lastnode.gif","FTV2LINK.GIF","FTV2LINK.JPG","ftv2link16.bmp","ftv2mlastnode.gif","ftv2mnode.gif","FTV2NODE.GIF","ftv2plastnode.gif","ftv2pnode.gif","ftv2vertline.gif","funcky arrow.gif","GOTO.GIF","Gravestone 1.bmp","Gravestone 2 .bmp","Gravestone 3 .bmp","Gravestone 4 .bmp","Gravestone 5 .bmp","Gravestone 6 .bmp","gravestone.BMP","green stuff.art","Grenade.bmp","Griff`s.bmp","Guest Book Metal Oval.gif","gunshotbronze.bmp","gunshotgold.bmp","gunshotsilver.bmp","G_SENSOR.GIF","half_circle_left.gif","half_circle_right.gif","HAT.GIF","healthdrops.bmp","HearSample.bmp","Help dark.gif","Help.gif","HLPBELL.GIF","HLPCD.GIF","HLPGLOBE.GIF","HLPSTEP3.GIF","Hollow.bmp","Home dark.gif","Home Metal Oval.gif","Home.gif","Houndstooth.bmp","HYPLANET.GIF","ICONATOR-icons-991ae3e025.gif","ICONATOR-icons-bc91faea6f.gif","Imperial.bmp","imwithstupid.gif","Info Metal Oval.gif","Internet Explorer Wallpaper.bmp","Jiffy.bmp","Kamikaze.bmp","Kiljaeden.bmp","leaf[1].gif","Leaves1.jpg","Light blue2.jpg","Light gravel.jpg","LINK.BMP","Links Metal Oval.gif","LINKS.GIF","Lock Combination and Hasp.gif","look at me.gif","MAIL.GIF","Meatmen.bmp","MEDIUM TANK LEFT.BMP","MEDIUM TANK Rright.BMP","Metal Interface About Me.gif","Metal Interface About Us.gif","Metal Interface About.gif","Metal Interface Back.gif","Metal Interface Bottom dark.gif","Metal Interface Bottom.gif","Metal Interface Company.gif","Metal Interface Contact.gif","Metal Interface Cool Stuff.gif","Metal Interface E-mail.gif","Metal Interface Free Stuff.gif","Metal Interface Friends.gif","Metal Interface History.gif","Metal Interface Hobbies.gif","Metal Interface Home.gif","Metal Interface Info.gif","Metal Interface Interests.gif","Metal Interface Left.jpg","Metal Interface Middle 1.jpg","Metal Interface Middle 2.jpg","Metal Interface Middle 3.jpg","Metal Interface Middle 4.jpg","Metal Interface Middle 5.jpg","Metal Interface Mission.gif","Metal Interface Next.gif","Metal Interface Photos.gif","Metal Interface Products.gif","Metal Interface Right.jpg","Metal Interface Site Map.gif","Metal Interface Support.gif","Metal Interface Top.gif","Metal Interface.gif","microphone.gif","Mine .bmp","Mine 0.bmp","Mine 1.bmp","mine 2.bmp","mine 3.bmp","MINUS.BMP","Mission Metal Oval.gif","MissionMedalBronze.bmp","MissionMedalBronzeBig.bmp","MissionMedalGold.bmp","MissionMedalGoldBig.bmp","MissionMedalNone.bmp","MissionMedalSilver.bmp","MissionMedalSilverBig.bmp","MissionMedalSilverBig2.bmp","Muscle.bmp","NATO.BMP","NEW.JPG","Next dark.gif","Next Metal Oval.gif","Next Wooden.gif","Next.gif","nopadlock.BMP","NORMAL.BMP","North Vietnam.bmp","OFF2.BMP","OFF_btn.bmp","ON2.BMP","ON_btn.bmp","open safe.gif","OPEN.BMP","OPEN.JPG","PADLOCK.BMP","PAINT.GIF","PAN.GIF","Paste.bmp","Paste.JPG","Peace.bmp","Pharaoh.gif","Pirate.bmp","PLUS.BMP","PREVIEW.BMP","PREVIEW.JPG","PRINTER.GIF","Probe.bmp","PUBLISH.BMP","PUBLISH.JPG","P_SENSOR.GIF","Qatar.bmp","questionmark.bmp","Rebel.bmp","recycle electicity.gif","RECYCLE.GIF","Red Cross.bmp","replayOFF.bmp","replayON.bmp","RESTORE.GIF","robo arrow.gif","ROCKS.BMP","ROLL.GIF","ROPE.BMP","RoundTimeOFF.bmp","RoundTimeON.bmp","R_SENSOR.GIF","SAFE.GIF","SAVE.BMP","SAVE.JPG","Scotland.bmp","scrolldown.bmp","ScrollLeft.bmp","ScrollRight.bmp","SCROLLUP.BMP","SecretStar.bmp","SecretStar2.bmp","Sheep.bmp","sheepflyingbronze.bmp","sheepflyinggold.bmp","sheepflyingsilver.bmp","SHON.BMP","shoppingbronze.bmp","shoppinggold.bmp","shoppingsilver.bmp","Skull.bmp","SKULL02.BMP","SKULL03.BMP","SKULL2.BMP","Smiling Face.gif","Snipers.bmp","sound 2.gif","sound corder.gif","sound[1].gif","SPIKES.BMP","SPLASH.GIF","Starfish.gif","STOP.BMP","STRAIGHT.GIF","STUDY.GIF","Stuff Metal Oval.gif","STWIE.JPG","Sun Glasses.gif","SW2.BMP","SW3.BMP","SW4.BMP","SW5.BMP","SW6.BMP","SW7.BMP","SW8.BMP","SYMBOL.BMP","S_SENSOR.GIF","teamwepyes.bmp","TeleportinOFF.bmp","teleportinoff_btn.bmp","TeleportinON.bmp","telescope.gif","Three Crowns.bmp","Timer 0.bmp","Timer 10.bmp","Timer 15.bmp","Timer 20.bmp","Timer 25.bmp","Timer 30.bmp","Timer 5.bmp","TN_BEST.GIF","TN_GOOD.GIF","TN_POOR.GIF","TURN.GIF","T_SENSOR.GIF","Umi.bmp","Undo.bmp","Undo.JPG","Up dark.gif","Up.gif","upside_down.BMP","utilitydrops.bmp","V.BMP","VCR.GIF","Veg.bmp","VIEW.GIF","W funkey sound do.gif","WALK.GIF","Warning small.gif","Warning.gif","WAW.BMP","weapondrop.bmp","weapondrops.bmp","WHOE.GIF","Wine Bottle and Glasses.gif","Worm.bmp","WormSelectOFF.bmp","WormSelectOFF2.bmp","WormSelectOFF3.bmp","WormSelectOFF_btn2.bmp","WormSelectOFF_btn3.bmp","WormSelectON.bmp","WormSelectON2.bmp","WormSelectON3.bmp","WormSelectON_btn2.bmp","WormSelectON_btn3.bmp","W_SENSOR.GIF","yellow3d.icl, 1.JPG","Yoshi1.ico","ZINGUTIL.EXE, 0.ico","ZOOMOUT.GIF"]

        function sideScroller(items, classes) {
            return scroller('horizontal', items, classes)

            /*imageList.find('img').each(function() {
                var me = $(this)
                me.data("originalWidth", me.width())
                me.transit({
                    width: me.width()*2
                }, 400, function() {
                    console.log('doneMakeLarger!')
                })
            })

            imageList.one('mouseup touchend touchcancel',function() {
                console.log("scrolled: "+this.scrollLeft)
                imageList.find('img').each(function() {
                    var me = $(this)
                    me.stop()
                    me.transit({
                        width: me.data("originalWidth")
                    }, 400, function() {
                        console.log('doneMakeSmaller!')
                        me.css({width: undefined})
                    })
                })
            })
            */
        }



        function scroller(direction, items, classes) {
            if(direction === 'horizontal') {
                var overflow = 'overflowX'
                var scroll = 'scrollLeft'
                var client = 'clientX'
                var offset = 'offsetX'
            } else {
                var overflow = 'overflowY'
                var scroll = 'scrollTop'
                var client = 'clientY'
                var offset = 'offsetY'
            }

            var css = {whiteSpace: 'nowrap'}
                css[overflow] = 'auto'
            var itemList = list(items).css(css)

            /*itemList.on('touchstart',function(pEvent) {
                console.log("scrolling: "+this[scroll])

                var that = $(this)
                that.stop()

                function getX(pEvent) {
                    if(pEvent.originalEvent.changedTouches) {
                        return pEvent.originalEvent.changedTouches[0][client]
                    } else {
                        return pEvent[offset]
                    }
                }

                var lastX = getX(pEvent)
                itemList.one('touchmove', function(pEvent) {
                    lastX = getX(pEvent)
                })

                var handler = function(pEvent) {
                    that.off('touchend touchcancel')

                    var curX = getX(pEvent)
                    var velocity = curX - lastX
                    console.log(curX, ', ', lastX ,', ', that[scroll]())

                    var css = {}
                        css[scroll] = that[scroll]()+velocity
                    that.animate(css, 800, 'easeOutQuint', function() {
                        console.log('doneScrolling!')
                    })
                }

                itemList.one('touchend touchcancel',handler);
                //$('body').one('mouseup', handler)
            })*/


            return div(itemList, classes).css({width: '100%'})
        }



        function list(items, classes) {
            return div(items, classes).css({overflow:'hidden'})
        }

        function img(path) {
            return $('<img src="'+path+'">')
        }

        function headerAndBody(header, body) {
            return div([header, body])
        }

        function button(text) {
            var result = div(text,'button').css({position: 'absolute', right: 0})
            //touch(result,'start', function(event) {
            result.on('touchstart', function(){
                $(this).css({backgroundColor: '#E2E2E2'})
                result.one('touchend touchcancel', function() {
                    $(this).css({backgroundColor: 'gray'})
                })
            })
            return result
        }

        var firstPage = View({
            classes: "firstPage",
            setup: function() {
                this.inner = View({
                    classes: "inner",
                    setup: function() {
                        this.obj = object().css({position: 'absolute'})
                        this.button = button('next')

                        this.transitionPicker = $('<select></select>').append('<option>Fade In</option>').append('<option>Slide In</option>')
                        this.transitionPicker.on('change', function() {
                            var selected = $(this).find(":selected").text();
                            if(selected === 'Fade In') {
                                transition = fadeInAction
                            } else {
                                transition = slideAction
                            }
                        })

                        this.element.append(this.obj, this.button, this.transitionPicker)

                    },
                    show: function() {
                        this.obj.css({top: 0, opacity: 100})  // reset

                        this.obj.animate({
                            opacity: 0.25,
                            top: "+=100"
                        }, 1000, function() {
                            console.log('donePage1!')
                        })
                    },
                    on: function() {
                        this.button.one('touchend',function() {
                            console.log('firstPage buton clicked')
                            transition(firstPage, secondPage)
                        })
                    },
                    off: function() {
                        //this.button.off('click')
                    }
                })

                var imageScrollers = images.reduce(function(acc, imageFile) {
                    var last = acc[acc.length-1]
                    var image = img('images/'+imageFile)
                    if(last === undefined || last.length > 20) {
                        acc.push([image])
                    } else {
                        last.push(image)
                    }
                    return acc
                }, []).map(function(imageList) {
                    return sideScroller(imageList)
                })

                var page = headerAndBody(div(this.inner.element).css({height: 125}), list(imageScrollers))

                this.inner.setup()
                this.element.append(page)//.css({height: '100%'})
                write(this.element)
            },
            show: function() {
                this.inner.show()
            },
            hide: function() {
                this.inner.hide()
            },
            on: function() {
                this.inner.on()
            },
            off: function() {
                this.inner.off()
                console.log("off1")
            }
        })

        $('body').html('')
        firstPage.show().on()
        /*firstPage.element.find("img").each(function() {
            $(this).css({width: $(this).width()*2})
        })*/


        var secondPage = View({
            classes: "secondPage",
            setup: function() {
                this.button = button('next')
                this.thing = div("Whats going on?")

                this.element.append(this.button, this.thing).css({height: '100%'})
                write(this.element)
            },
            on: function() {
                this.button.one('touchend',function() {
                    console.log('secondPage buton clicked')
                    transition(secondPage, firstPage)
                })
            },
            off: function() {
                //this.thing.off('click')
                console.log("off2")
            }
        })

        css("body {\
                margin: 0;\
                overflow: hidden;\
            }\
			.view {\
			    position: absolute;\
			    width: 100%;\
			    box-sizing: border-box;\
			    -moz-box-sizing: border-box;\
			    z-index: 0;\
			    background-color: white;\
			    \
			 }\
			.top.view {\
			    z-index: 10;\
			}\
			.firstPage {\
			    border: 4px solid black;\
			}\
			.inner {\
			    color: red;\
			}\
			.secondPage {\
			    border: 4px solid blue;\
			}\
			select {\
			    font-size: 40px;\
			}\
			.button {\
			    border: 1px solid black;\
			    background-color: gray;\
			    color: white;\
			    padding: 2px;\
			    cursor: pointer;\
			    font-size: 40px;\
			}")


    })

    function slideAction(currentView, nextView) {
        currentView.element.removeClass("top")
        position('right', nextView.element)
        nextView.show().top()
        currentView.off()

        /*var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

        var start = null;
        var startLeft = nextView.element.offset().left
        function step(timestamp) {
          var progress;
          if (start === null) start = timestamp;
          progress = timestamp - start;
          var newLeft = Math.max(startLeft-progress*2, 0)
            console.log('newLeft: '+newLeft)
          nextView.element.css({left: newLeft + "px"})

          if (newLeft > 0) {
            requestAnimationFrame(step);
          } else {
            nextView.on()
            currentView.hide()
            console.log('done transition!')
          }
        }

        requestAnimationFrame(step);
        //*/

        nextView.element.animate({
            left: "0"
        }, 500, function() {
            nextView.on()
            currentView.hide()
            console.log('done transition!')
        })
    }

    function fadeInAction(currentView, nextView) {
        currentView.element.removeClass("top")
        nextView.element.css({top: 0, left: 0, opacity: 0})//, scale: [.8,.8]})
        nextView.show().top()
        currentView.off()

        nextView.element.animate({
            opacity: 100
            //,scale: [1,1]
        }, 500, function() {
            nextView.on()
            currentView.hide()
            console.log('done fadeInAction!')
        })
    }

    function position(outOfView, element) {
        if(outOfView === 'right') {
            element.css({top: 0, left: $(document).outerWidth()})
            console.log('document width: '+$(document).outerWidth())

        } else throw Error("nope")
    }

    function object() {
        return div("I'm an object").css({position: 'absolute'})
    }

    function write(thing) {
        $('body').append(thing)
    }

    function css(stylesheet) {
        return write($("<style type='text/css'>"+stylesheet+"</style>"))
    }


    function div(contents, classes) {
        if(!classes) classes = ''
        if(!(contents instanceof Array)) contents = [contents]

        var e = $('<div class="'+classes+'"></div>')
        contents.forEach(function(v) {
            e.append(v)
        })
        return e
    }
})

/*
var button = $('<div>button</div>')
button.css('font-size', 40)
button.css('font-size', 40)
$("#deviceready").html(button)

button.on('touchstart', function() {
    console.log('touchstart')
})
/*button.on('touchmove', function() {
    console.log('touchmove')
})*//*
button.on('touchend', function() {
    console.log('touchend')
})
button.on('touchleave', function() {
    console.log('touchleave')
})
button.on('touchenter', function() {
    console.log('touchenter')
})
button.on('touchcancel', function() {
    console.log('touchcancel')
})
*/

document.addEventListener('deviceready', function() {


}, false)