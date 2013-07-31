'use strict';

// object and array extensions

// String wrapper - gives a string extra methods
/*var s = function(val) {
    val.prototype = s.prototype;
    return val;
}
s.prototype = new String;

s.prototype.replaceAll = function(str1, str2) {
    var ignore = false;
    return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};
*/
Object.defineProperty(String.prototype, "replaceAll", {
  value: function(str1, str2) { 
		var ignore = false;
    	return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
  },
  configurable: false,
  enumerable: false,
  writeable: true
});


delete String.prototype.replaceAll

Object.defineProperty(String.prototype, "replaceAll", {
  value: function(str1, str2) { 
		return "NOPE";
  },
  configurable: true,
  enumerable: false,
  writeable: true
});

// Array wrapper - gives an rray extra methods
var a = function() {
    Array.apply(this, arguments); // super constructor
}
a.prototype = new Array; // a extends Array

a.prototype.foreach = a.prototype.forEach;


// Object wrapper - gives an object extra methods
var o = function() {
    Object.apply(this, arguments); // super constructor
}
o.prototype = new Object; // a extends Array

o.prototype.toString = function() { // prettifies object's toString
    var s = JSON.stringify(this, null, " ");
    return s.replaceAll('\\n', '\n')
};

o.prototype.keys = function () {
    var keys = [];
    for(var i in this) if (this.hasOwnProperty(i)) {
        keys.push(i);
    }
    return keys;
};


// running code

var x = "moo";

console.log(x);
console.log(x.replaceAll("m", "b"));
