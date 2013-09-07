require.config({
    paths: {
        "jquery": "jquery",
        "jquery.mobile": "http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.js",
        "createjs.tween": "http://code.createjs.com/tweenjs-0.4.1.min",
        "jquery.easing": "jquery.easing.1.3"
    },
    shim: {
        'jquery-animate': {deps: ["jquery"]},
        'jquery-transit': {deps: ["jquery"]},
        'jquery.easing.1.3': {deps: ["jquery"]},
        'zepto': {deps: ["jquery"]},
        'jquery.mobile': {deps: ["jquery"]}
    }
})