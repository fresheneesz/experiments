require(['jquery', 'proto', 'touch.amd', 'jquery-transit', 'jquery.easing'], function($, proto, touch) {

    var transition = fadeInAction
    $(function() {
        css("body {\
                margin: 0;\
                -moz-user-select: none;\
                -webkit-user-select: none;\
                user-select: none;\
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


        var images = ["000001.BMP","000002.BMP","000003.BMP","000004.BMP","000005.BMP","00002.BMP","1 trophy.bmp","2 trophy.bmp","3 trophy.bmp","42.BMP","82.GIF","85.GIF","About Me Metal Oval.gif","About Us Metal Oval.gif","ALRRROW.GIF","ANCHOR.GIF","Aphex.bmp","arrow left.jpg","arrow right.JPG","ArtilleryBronze.bmp","ArtilleryGold.bmp","artilleryOFF.bmp","artilleryON.bmp","ArtillerySilver.bmp","ATOM.GIF","A_SENSOR.GIF","Back dark.gif","Back Metal Oval.gif","Back Wooden.gif","BACK.GIF","Back2.gif","BELL.GIF","BG3D.BMP","bg3d.icl, 1.JPG","BIBLE.GIF","Black Cross.bmp","BLON.BMP","BONES.BMP","Bosnia.bmp","BUFFALO.BMP","Building Government.gif","Bullet Square blue.gif","Bullet Square dark.gif","Bullet Square green.gif","Bullet Square red.gif","BULLETS.BMP","Business Human Resources.gif","BUTT1.GIF","BUTT10.GIF","BUTT11.GIF","BUTT12.GIF","BUTT13.GIF","BUTT14.GIF","BUTT15.GIF","BUTT16.GIF","BUTT17.GIF","BUTT18.GIF","BUTT19.GIF","BUTT2.GIF","Butterfly.gif","camcorder 3.gif","camcorder.gif","camcorder2.gif","CHANGE.BMP","CHANGE.JPG","COLLOR.GIF","Contact Metal Oval.gif","CPU.GIF","CPUFLAG1.BMP","cpuflag2.Bmp","cpuflag3.Bmp","cpuflag4.Bmp","cpuflag5.Bmp","Crew52.bmp","CROSS.BMP","CROSS02.BMP","Cut.bmp","Cut.JPG","Cyclops.bmp","Cyprus.bmp","C_GOTO.GIF","C_PAN.GIF","C_ROLL.GIF","C_STUDY.GIF","C_TURN.GIF","C_WALK.GIF","Daisy.bmp","Dark.bmp","Des.bmp","Dest2.bmp","DONKEY.BMP","DonorOFF.bmp","DonorON.bmp","Down dark.gif","Down.gif","DRAGON.GIF","Dropflag.bmp","DudmineOFF.bmp","DudmineON.bmp","DUNG.BMP","E-Mail Metal Oval.gif","Eagle Bald.gif","Earth.gif","EU.BMP","EuthanasiaBronze.bmp","EuthanasiaGold.bmp","EuthanasiaSilver.bmp","Eyes.bmp","Face Alien Purple.gif","Face.bmp","falldamageOFF.bmp","FANFARE.BMP","File Cabinet.gif","FILE.BMP","FIRE.BMP","Fish Tropical.gif","Flag UK.gif","Flag USA 3D.gif","Flashlight.gif","FLOWER.BMP","FOLDER.GIF","Foot Paw Print.gif","Football.gif","FRACT.GIF","FROZEN.BMP","ftv2blank.gif","FTV2DOC.BMP","FTV2DOC.GIF","FTV2DOCN.BMP","ftv2folderclosed.bmp","ftv2folderclosed.gif","ftv2folderclosed.JPG","ftv2folderopen.bmp","ftv2folderopen.gif","ftv2lastnode.gif","FTV2LINK.GIF","FTV2LINK.JPG","ftv2link16.bmp","ftv2mlastnode.gif","ftv2mnode.gif","FTV2NODE.GIF","ftv2plastnode.gif","ftv2pnode.gif","ftv2vertline.gif","funcky arrow.gif","GOTO.GIF","Gravestone 1.bmp","Gravestone 2 .bmp","Gravestone 3 .bmp","Gravestone 4 .bmp","Gravestone 5 .bmp","Gravestone 6 .bmp","gravestone.BMP","green stuff.art","Grenade.bmp","Griff`s.bmp","Guest Book Metal Oval.gif","gunshotbronze.bmp","gunshotgold.bmp","gunshotsilver.bmp","G_SENSOR.GIF","half_circle_left.gif","half_circle_right.gif","HAT.GIF","healthdrops.bmp","HearSample.bmp","Help dark.gif","Help.gif","HLPBELL.GIF","HLPCD.GIF","HLPGLOBE.GIF","HLPSTEP3.GIF","Hollow.bmp","Home dark.gif","Home Metal Oval.gif","Home.gif","Houndstooth.bmp","HYPLANET.GIF","ICONATOR-icons-991ae3e025.gif","ICONATOR-icons-bc91faea6f.gif","Imperial.bmp","imwithstupid.gif","Info Metal Oval.gif","Internet Explorer Wallpaper.bmp","Jiffy.bmp","Kamikaze.bmp","Kiljaeden.bmp","leaf[1].gif","Leaves1.jpg","Light blue2.jpg","Light gravel.jpg","LINK.BMP","Links Metal Oval.gif","LINKS.GIF","Lock Combination and Hasp.gif","look at me.gif","MAIL.GIF","Meatmen.bmp","MEDIUM TANK LEFT.BMP","MEDIUM TANK Rright.BMP","Metal Interface About Me.gif","Metal Interface About Us.gif","Metal Interface About.gif","Metal Interface Back.gif","Metal Interface Bottom dark.gif","Metal Interface Bottom.gif","Metal Interface Company.gif","Metal Interface Contact.gif","Metal Interface Cool Stuff.gif","Metal Interface E-mail.gif","Metal Interface Free Stuff.gif","Metal Interface Friends.gif","Metal Interface History.gif","Metal Interface Hobbies.gif","Metal Interface Home.gif","Metal Interface Info.gif","Metal Interface Interests.gif","Metal Interface Left.jpg","Metal Interface Middle 1.jpg","Metal Interface Middle 2.jpg","Metal Interface Middle 3.jpg","Metal Interface Middle 4.jpg","Metal Interface Middle 5.jpg","Metal Interface Mission.gif","Metal Interface Next.gif","Metal Interface Photos.gif","Metal Interface Products.gif","Metal Interface Right.jpg","Metal Interface Site Map.gif","Metal Interface Support.gif","Metal Interface Top.gif","Metal Interface.gif","microphone.gif","Mine .bmp","Mine 0.bmp","Mine 1.bmp","mine 2.bmp","mine 3.bmp","MINUS.BMP","Mission Metal Oval.gif","MissionMedalBronze.bmp","MissionMedalBronzeBig.bmp","MissionMedalGold.bmp","MissionMedalGoldBig.bmp","MissionMedalNone.bmp","MissionMedalSilver.bmp","MissionMedalSilverBig.bmp","MissionMedalSilverBig2.bmp","Muscle.bmp","NATO.BMP","NEW.JPG","Next dark.gif","Next Metal Oval.gif","Next Wooden.gif","Next.gif","nopadlock.BMP","NORMAL.BMP","North Vietnam.bmp","OFF2.BMP","OFF_btn.bmp","ON2.BMP","ON_btn.bmp","open safe.gif","OPEN.BMP","OPEN.JPG","PADLOCK.BMP","PAINT.GIF","PAN.GIF","Paste.bmp","Paste.JPG","Peace.bmp","Pharaoh.gif","Pirate.bmp","PLUS.BMP","PREVIEW.BMP","PREVIEW.JPG","PRINTER.GIF","Probe.bmp","PUBLISH.BMP","PUBLISH.JPG","P_SENSOR.GIF","Qatar.bmp","questionmark.bmp","Rebel.bmp","recycle electicity.gif","RECYCLE.GIF","Red Cross.bmp","replayOFF.bmp","replayON.bmp","RESTORE.GIF","robo arrow.gif","ROCKS.BMP","ROLL.GIF","ROPE.BMP","RoundTimeOFF.bmp","RoundTimeON.bmp","R_SENSOR.GIF","SAFE.GIF","SAVE.BMP","SAVE.JPG","Scotland.bmp","scrolldown.bmp","ScrollLeft.bmp","ScrollRight.bmp","SCROLLUP.BMP","SecretStar.bmp","SecretStar2.bmp","Sheep.bmp","sheepflyingbronze.bmp","sheepflyinggold.bmp","sheepflyingsilver.bmp","SHON.BMP","shoppingbronze.bmp","shoppinggold.bmp","shoppingsilver.bmp","Skull.bmp","SKULL02.BMP","SKULL03.BMP","SKULL2.BMP","Smiling Face.gif","Snipers.bmp","sound 2.gif","sound corder.gif","sound[1].gif","SPIKES.BMP","SPLASH.GIF","Starfish.gif","STOP.BMP","STRAIGHT.GIF","STUDY.GIF","Stuff Metal Oval.gif","STWIE.JPG","Sun Glasses.gif","SW2.BMP","SW3.BMP","SW4.BMP","SW5.BMP","SW6.BMP","SW7.BMP","SW8.BMP","SYMBOL.BMP","S_SENSOR.GIF","teamwepyes.bmp","TeleportinOFF.bmp","teleportinoff_btn.bmp","TeleportinON.bmp","telescope.gif","Three Crowns.bmp","Timer 0.bmp","Timer 10.bmp","Timer 15.bmp","Timer 20.bmp","Timer 25.bmp","Timer 30.bmp","Timer 5.bmp","TN_BEST.GIF","TN_GOOD.GIF","TN_POOR.GIF","TURN.GIF","T_SENSOR.GIF","Umi.bmp","Undo.bmp","Undo.JPG","Up dark.gif","Up.gif","upside_down.BMP","utilitydrops.bmp","V.BMP","VCR.GIF","Veg.bmp","VIEW.GIF","W funkey sound do.gif","WALK.GIF","Warning small.gif","Warning.gif","WAW.BMP","weapondrop.bmp","weapondrops.bmp","WHOE.GIF","Wine Bottle and Glasses.gif","Worm.bmp","WormSelectOFF.bmp","WormSelectOFF2.bmp","WormSelectOFF3.bmp","WormSelectOFF_btn2.bmp","WormSelectOFF_btn3.bmp","WormSelectON.bmp","WormSelectON2.bmp","WormSelectON3.bmp","WormSelectON_btn2.bmp","WormSelectON_btn3.bmp","W_SENSOR.GIF","yellow3d.icl, 1.JPG","Yoshi1.ico","ZINGUTIL.EXE, 0.ico","ZOOMOUT.GIF"]

        $('body').html('')

        var drawerButton = img('images/DudmineON.bmp').css({'margin-top': 7})
        var composeButton = img('images/E-Mail Metal Oval.gif').css({float: 'right', 'margin-top': 15})

        var drawer = write(Drawer())

        var header = div([drawerButton, composeButton]).css({position: 'fixed', width: '100%', zIndex:11, backgroundColor: 'rgb(58, 123, 194)'})
        var people = []
        for(var n=0; n<30; n++) {
            people.push(enboxListItem(drawer))
        }

        var enboxBody = list(people)
        var enbox = write(page(header, enboxBody))
        setTimeout(function() {
            enboxBody.css({paddingTop: header.height()})
        },0)



        var omnibox = write(page(div([$("<textarea></textarea>"), button("send")])).hide())
        var drawerHotspot = write(div().css({backgroundColor: 'transparent', position: 'absolute', height:'100%', width: '50%', top:0, zIndex:11}))

        touch(drawer.add(drawerHotspot), 'start', function(e) {
            var lastX = e.client.x
            /*e.on('end', function(e2) {
                drawer.element.animate({left: 0}, 500);
            })*/
            e.on('move', function(e2) {
                drawerHandler(drawer, e2, lastX)
                lastX = e2.client.x
            })
        })
    })

    function Drawer() {
        var menuItems = []
        for(var n=0; n<10; n++) {
            menuItems.push(menuItem())
        }

        var width = $(document).outerWidth() *.7
        return page(list(menuItems)).css({
            backgroundColor: 'blue', position: 'absolute', zIndex: 11,
            width: width,
            left: -width, top: 0
        })
    }

    function menuItem() {
        return div([
            img('images/weapondrops.bmp').css({position:'absolute', top: 20}),
            div('Some Menu Item').css({position:'absolute', top: 40, left: 100})
        ]).css({position: 'relative', border: '1px solid black', borderRight: 'none', borderLeft: 'none', height: 100 })
    }
    function enboxListItem(drawer) {
        var front = div([
            img('images/SW8.BMP').css({position:'absolute', top: 15, left: 10}),
            img('images/Skull.bmp').css({position:'absolute', top: 60, left: 160}),
            div('2').css({position:'absolute', top: 60, left: 190}),
            img('images/ROPE.BMP').css({position:'absolute', top: 60, left: 220, height: 20}),
            div('0').css({position:'absolute', top: 60, left: 250}),
            img('images/NEW.JPG').css({position:'absolute', top: 60, left: 280}),
            div('0').css({position:'absolute', top: 60, left: 300}),
            img('images/MissionMedalSilver.bmp').css({position:'absolute', height: 20, top: 60, left: 340}),
            div('1').css({position:'absolute', top: 60, left: 365}),
            div('Whatever this is some text and stuff and i\'m telling you...').css({position:'absolute', top: 24, left: 125, whiteSpace: 'nowrap'})
        ]).css({backgroundColor: 'rgb(148, 148, 148)', height: '100%',width: '100%', position: 'absolute', top: 0, zIndex: 10})

        var behind = div([
            img('images/00002.BMP').css({position:'absolute', top: 15, left: 180}),
            img('images/3 trophy.bmp').css({position:'absolute', top: 15, left: 274}),
            img('images/Hollow.bmp').css({position:'absolute', height: 67, top: 15, left: 340})
        ]).css({backgroundColor: 'red', height: '100%',width: '100%', position: 'absolute', top: 0, zIndex: 0 })

        var result = div([front,behind]).css({border: '1px solid black',borderRight: 'none', borderLeft: 'none', position: 'relative', height: 100 })

        front.on('touchstart', function(e) {
            console.log('start front')
            return true
        })
        behind.on('touchstart', function(e) {
            console.log('start behind')
        })

        touch(result, 'start', function(e) {
            var lastX = e.client.x
            e.on('move', function(e2) {
                var change = e2.client.x - lastX
                var cur = front.offset().left
                var newValue = cur+change

                if(newValue > 0) {
                    newValue = 0
                    drawerHandler(drawer, e2, lastX)

                } else if(newValue < -$(document).outerWidth()) {
                    newValue = -$(document).outerWidth()
                }

                front.css({left: newValue})

                lastX = e2.client.x
            })
        })

        return result
    }

    function drawerHandler(drawer, e2, lastX) {
        var change = e2.client.x - lastX

        var cur = drawer.offset().left
        var newValue = cur+change

        var width = drawer.width()
        if(newValue > 0) {
            newValue = 0

        } else if(newValue < -width) {
            newValue = -width
        }

        drawer.css({left: newValue})
    }

    function  page(header, contents) {
        if(contents === undefined) {
            contents = header
            header = undefined
        }

        return div([header, contents])
    }



    function sideScroller(items, classes) {
        return scroller('horizontal', items, classes)
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

        return div(itemList, classes).css({width: '100%'})
    }



    function list(items, classes) {
        return div(items, classes).css({overflow:'hidden'})
    }

    function img(path) {
        return $('<img src="'+path+'">')
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

    function slideAction(currentView, nextView) {
        currentView.element.removeClass("top")
        position('right', nextView.element)
        nextView.show().top()
        currentView.off()

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
        nextView.element.css({top: 0, left: 0, opacity: 0, scale: [.8,.8]})
        nextView.show().top()
        currentView.off()

        nextView.element.transit({
            opacity: 100,
            scale: [1,1]
        }, 500, function() {
            nextView.on()
            currentView.hide()
            console.log('done fadeInAction!')
        })
    }

    function position(outOfView, element) {
        if(outOfView === 'right') {
            element.css({top: 0, left: $(document).outerWidth()})

        } else if(outOfView === 'left') {
            element.css({top: 0, left: -$(document).outerWidth()})

        } else throw Error("nope")
    }

    function write(thing) {
        $('body').append(thing)
        return thing
    }

    function css(stylesheet) {
       $('head').append($("<style type='text/css'>"+stylesheet+"</style>"))
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