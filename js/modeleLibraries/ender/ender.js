/*!
  * =============================================================
  * Ender: open module JavaScript framework (https://ender.no.de)
  * Build: ender build colors
  * Packages: ender-js@0.4.5 colors@0.6.1
  * =============================================================
  */

/*!
  * Ender: open module JavaScript framework (client-lib)
  * copyright Dustin Diaz & Jacob Thornton 2011-2012 (@ded @fat)
  * http://ender.jit.su
  * License MIT
  */
(function (context) {

  // a global object for node.js module compatiblity
  // ============================================

  context['global'] = context

  // Implements simple module system
  // losely based on CommonJS Modules spec v1.1.1
  // ============================================

  var modules = {}
    , old = context['$']
    , oldEnder = context['ender']
    , oldRequire = context['require']
    , oldProvide = context['provide']

  function require (identifier) {
    // modules can be required from ender's build system, or found on the window
    var module = modules['$' + identifier] || window[identifier]
    if (!module) throw new Error("Ender Error: Requested module '" + identifier + "' has not been defined.")
    return module
  }

  function provide (name, what) {
    return (modules['$' + name] = what)
  }

  context['provide'] = provide
  context['require'] = require

  function aug(o, o2) {
    for (var k in o2) k != 'noConflict' && k != '_VERSION' && (o[k] = o2[k])
    return o
  }

  /**
   * main Ender return object
   * @constructor
   * @param {Array|Node|string} s a CSS selector or DOM node(s)
   * @param {Array.|Node} r a root node(s)
   */
  function Ender(s, r) {
    var elements
      , i

    this.selector = s
    // string || node || nodelist || window
    if (typeof s == 'undefined') {
      elements = []
      this.selector = ''
    } else if (typeof s == 'string' || s.nodeName || (s.length && 'item' in s) || s == window) {
      elements = ender._select(s, r)
    } else {
      elements = isFinite(s.length) ? s : [s]
    }
    this.length = elements.length
    for (i = this.length; i--;) this[i] = elements[i]
  }

  /**
   * @param {function(el, i, inst)} fn
   * @param {Object} opt_scope
   * @returns {Ender}
   */
  Ender.prototype['forEach'] = function (fn, opt_scope) {
    var i, l
    // opt out of native forEach so we can intentionally call our own scope
    // defaulting to the current item and be able to return self
    for (i = 0, l = this.length; i < l; ++i) i in this && fn.call(opt_scope || this[i], this[i], i, this)
    // return self for chaining
    return this
  }

  Ender.prototype.$ = ender // handy reference to self

  // dev tools secret sauce
  Ender.prototype.splice = function () { throw new Error('Not implemented') }

  function ender(s, r) {
    return new Ender(s, r)
  }

  ender['_VERSION'] = '0.4.5'

  ender.fn = Ender.prototype // for easy compat to jQuery plugins

  ender.ender = function (o, chain) {
    aug(chain ? Ender.prototype : ender, o)
  }

  ender._select = function (s, r) {
    if (typeof s == 'string') return (r || document).querySelectorAll(s)
    if (s.nodeName) return [s]
    return s
  }


  // use callback to receive Ender's require & provide and remove them from global
  ender.noConflict = function (callback) {
    context['$'] = old
    if (callback) {
      context['provide'] = oldProvide
      context['require'] = oldRequire
      context['ender'] = oldEnder
      if (typeof callback == 'function') callback(require, provide, this)
    }
    return this
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = ender
  // use subscript notation as extern for Closure compilation
  context['ender'] = context['$'] = ender

}(this));

(function () {

  var module = { exports: {} }, exports = module.exports;

  /*
  colors.js

  Copyright (c) 2010

  Marak Squires
  Alexis Sellier (cloudhead)

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.

  */

  var isHeadless = false;

  if (typeof module !== 'undefined') {
    isHeadless = true;
  }

  if (!isHeadless) {
    var exports = {};
    var module = {};
    var colors = exports;
    exports.mode = "browser";
  } else {
    exports.mode = "console";
  }

  //
  // Prototypes the string object to have additional method calls that add terminal colors
  //
  var addProperty = function (color, func) {
    exports[color] = function (str) {
      return func.apply(str);
    };

    if (Object.defineProperty) {
      Object.defineProperty(String.prototype, color, {
        get : func,
        configurable: true,
        enumerable: false
      });
    } else {
      String.prototype.__defineGetter__(color, func);
    }
  };



  function stylize(str, style) {

    var styles;

    if (exports.mode === 'console') {
      styles = {
        //styles
        'bold'      : ['\x1B[1m',  '\x1B[22m'],
        'italic'    : ['\x1B[3m',  '\x1B[23m'],
        'underline' : ['\x1B[4m',  '\x1B[24m'],
        'inverse'   : ['\x1B[7m',  '\x1B[27m'],
        'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
        //text colors
        //grayscale
        'white'     : ['\x1B[37m', '\x1B[39m'],
        'grey'      : ['\x1B[90m', '\x1B[39m'],
        'black'     : ['\x1B[30m', '\x1B[39m'],
        //colors
        'blue'      : ['\x1B[34m', '\x1B[39m'],
        'cyan'      : ['\x1B[36m', '\x1B[39m'],
        'green'     : ['\x1B[32m', '\x1B[39m'],
        'magenta'   : ['\x1B[35m', '\x1B[39m'],
        'red'       : ['\x1B[31m', '\x1B[39m'],
        'yellow'    : ['\x1B[33m', '\x1B[39m'],
        //background colors
        //grayscale
        'whiteBG'     : ['\x1B[47m', '\x1B[49m'],
        'greyBG'      : ['\x1B[49;5;8m', '\x1B[49m'],
        'blackBG'     : ['\x1B[40m', '\x1B[49m'],
        //colors
        'blueBG'      : ['\x1B[44m', '\x1B[49m'],
        'cyanBG'      : ['\x1B[46m', '\x1B[49m'],
        'greenBG'     : ['\x1B[42m', '\x1B[49m'],
        'magentaBG'   : ['\x1B[45m', '\x1B[49m'],
        'redBG'       : ['\x1B[41m', '\x1B[49m'],
        'yellowBG'    : ['\x1B[43m', '\x1B[49m']
      };
    } else if (exports.mode === 'browser') {
      styles = {
        //styles
        'bold'      : ['<b>',  '</b>'],
        'italic'    : ['<i>',  '</i>'],
        'underline' : ['<u>',  '</u>'],
        'inverse'   : ['<span style="background-color:black;color:white;">',  '</span>'],
        'strikethrough' : ['<del>',  '</del>'],
        //text colors
        //grayscale
        'white'     : ['<span style="color:white;">',   '</span>'],
        'grey'      : ['<span style="color:gray;">',    '</span>'],
        'black'     : ['<span style="color:black;">',   '</span>'],
        //colors
        'blue'      : ['<span style="color:blue;">',    '</span>'],
        'cyan'      : ['<span style="color:cyan;">',    '</span>'],
        'green'     : ['<span style="color:green;">',   '</span>'],
        'magenta'   : ['<span style="color:magenta;">', '</span>'],
        'red'       : ['<span style="color:red;">',     '</span>'],
        'yellow'    : ['<span style="color:yellow;">',  '</span>'],
        //background colors
        //grayscale
        'whiteBG'     : ['<span style="background-color:white;">',   '</span>'],
        'greyBG'      : ['<span style="background-color:gray;">',    '</span>'],
        'blackBG'     : ['<span style="background-color:black;">',   '</span>'],
        //colors
        'blueBG'      : ['<span style="background-color:blue;">',    '</span>'],
        'cyanBG'      : ['<span style="background-color:cyan;">',    '</span>'],
        'greenBG'     : ['<span style="background-color:green;">',   '</span>'],
        'magentaBG'   : ['<span style="background-color:magenta;">', '</span>'],
        'redBG'       : ['<span style="background-color:red;">',     '</span>'],
        'yellowBG'    : ['<span style="background-color:yellow;">',  '</span>']
      };
    } else if (exports.mode === 'none') {
      return str + '';
    } else {
      console.log('unsupported mode, try "browser", "console" or "none"');
    }
    return styles[style][0] + str + styles[style][1];
  }

  function applyTheme(theme) {

    //
    // Remark: This is a list of methods that exist
    // on String that you should not overwrite.
    //
    var stringPrototypeBlacklist = [
      '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'charAt', 'constructor',
      'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'charCodeAt',
      'indexOf', 'lastIndexof', 'length', 'localeCompare', 'match', 'replace', 'search', 'slice', 'split', 'substring',
      'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'
    ];

    Object.keys(theme).forEach(function (prop) {
      if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
        console.log('warn: '.red + ('String.prototype' + prop).magenta + ' is probably something you don\'t want to override. Ignoring style name');
      }
      else {
        if (typeof(theme[prop]) === 'string') {
          addProperty(prop, function () {
            return exports[theme[prop]](this);
          });
        }
        else {
          addProperty(prop, function () {
            var ret = this;
            for (var t = 0; t < theme[prop].length; t++) {
              ret = exports[theme[prop][t]](ret);
            }
            return ret;
          });
        }
      }
    });
  }


  //
  // Iterate through all default styles and colors
  //
  var x = ['bold', 'underline', 'strikethrough', 'italic', 'inverse', 'grey', 'black', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta', 'greyBG', 'blackBG', 'yellowBG', 'redBG', 'greenBG', 'blueBG', 'whiteBG', 'cyanBG', 'magentaBG'];
  x.forEach(function (style) {

    // __defineGetter__ at the least works in more browsers
    // http://robertnyman.com/javascript/javascript-getters-setters.html
    // Object.defineProperty only works in Chrome
    addProperty(style, function () {
      return stylize(this, style);
    });
  });

  function sequencer(map) {
    return function () {
      if (!isHeadless) {
        return this.replace(/( )/, '$1');
      }
      var exploded = this.split(""), i = 0;
      exploded = exploded.map(map);
      return exploded.join("");
    };
  }

  var rainbowMap = (function () {
    var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
    return function (letter, i, exploded) {
      if (letter === " ") {
        return letter;
      } else {
        return stylize(letter, rainbowColors[i++ % rainbowColors.length]);
      }
    };
  })();

  exports.themes = {};

  exports.addSequencer = function (name, map) {
    addProperty(name, sequencer(map));
  };

  exports.addSequencer('rainbow', rainbowMap);
  exports.addSequencer('zebra', function (letter, i, exploded) {
    return i % 2 === 0 ? letter : letter.inverse;
  });

  exports.setTheme = function (theme) {
    if (typeof theme === 'string') {
      try {
        exports.themes[theme] = require(theme);
        applyTheme(exports.themes[theme]);
        return exports.themes[theme];
      } catch (err) {
        console.log(err);
        return err;
      }
    } else {
      applyTheme(theme);
    }
  };


  addProperty('stripColors', function () {
    return ("" + this).replace(/\x1B\[\d+m/g, '');
  });

  // please no
  function zalgo(text, options) {
    var soul = {
      "up" : [
        '̍', '̎', '̄', '̅',
        '̿', '̑', '̆', '̐',
        '͒', '͗', '͑', '̇',
        '̈', '̊', '͂', '̓',
        '̈', '͊', '͋', '͌',
        '̃', '̂', '̌', '͐',
        '̀', '́', '̋', '̏',
        '̒', '̓', '̔', '̽',
        '̉', 'ͣ', 'ͤ', 'ͥ',
        'ͦ', 'ͧ', 'ͨ', 'ͩ',
        'ͪ', 'ͫ', 'ͬ', 'ͭ',
        'ͮ', 'ͯ', '̾', '͛',
        '͆', '̚'
      ],
      "down" : [
        '̖', '̗', '̘', '̙',
        '̜', '̝', '̞', '̟',
        '̠', '̤', '̥', '̦',
        '̩', '̪', '̫', '̬',
        '̭', '̮', '̯', '̰',
        '̱', '̲', '̳', '̹',
        '̺', '̻', '̼', 'ͅ',
        '͇', '͈', '͉', '͍',
        '͎', '͓', '͔', '͕',
        '͖', '͙', '͚', '̣'
      ],
      "mid" : [
        '̕', '̛', '̀', '́',
        '͘', '̡', '̢', '̧',
        '̨', '̴', '̵', '̶',
        '͜', '͝', '͞',
        '͟', '͠', '͢', '̸',
        '̷', '͡', ' ҉'
      ]
    },
    all = [].concat(soul.up, soul.down, soul.mid),
    zalgo = {};

    function randomNumber(range) {
      var r = Math.floor(Math.random() * range);
      return r;
    }

    function is_char(character) {
      var bool = false;
      all.filter(function (i) {
        bool = (i === character);
      });
      return bool;
    }

    function heComes(text, options) {
      var result = '', counts, l;
      options = options || {};
      options["up"] = options["up"] || true;
      options["mid"] = options["mid"] || true;
      options["down"] = options["down"] || true;
      options["size"] = options["size"] || "maxi";
      text = text.split('');
      for (l in text) {
        if (is_char(l)) {
          continue;
        }
        result = result + text[l];
        counts = {"up" : 0, "down" : 0, "mid" : 0};
        switch (options.size) {
        case 'mini':
          counts.up = randomNumber(8);
          counts.min = randomNumber(2);
          counts.down = randomNumber(8);
          break;
        case 'maxi':
          counts.up = randomNumber(16) + 3;
          counts.min = randomNumber(4) + 1;
          counts.down = randomNumber(64) + 3;
          break;
        default:
          counts.up = randomNumber(8) + 1;
          counts.mid = randomNumber(6) / 2;
          counts.down = randomNumber(8) + 1;
          break;
        }

        var arr = ["up", "mid", "down"];
        for (var d in arr) {
          var index = arr[d];
          for (var i = 0 ; i <= counts[index]; i++) {
            if (options[index]) {
              result = result + soul[index][randomNumber(soul[index].length)];
            }
          }
        }
      }
      return result;
    }
    return heComes(text);
  }


  // don't summon zalgo
  addProperty('zalgo', function () {
    return zalgo(this);
  });

  if (typeof provide == "function") provide("colors", module.exports);
  $.ender(module.exports);
}());