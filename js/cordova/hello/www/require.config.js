require.config({
    paths: {
        "jquery": "jquery",
        "createjs.tween": "http://code.createjs.com/tweenjs-0.4.1.min",
        'jquery.easing': "jquery.easing.1.3"
    },
    shim: {
        'jquery-animate': {deps: ["jquery"]},
        'jquery-transit': {deps: ["jquery"]},
        'jquery.easing.1.3': {deps: ["jquery"]},
        'zepto': {deps: ["jquery"]}
    }
})