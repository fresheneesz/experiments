var PlaydomUtils = 
{   preloadImage: function(imageURL)
    {   if (document.images){
            var preloadImage = new Image();
            preloadImage.src = imageURL;
            return preloadImage;
        }

        return undefined;
    },

    alignVertical: function(cssSelector_list)
    {   var maxLeftOffset = 0;
        $(cssSelector_list).each(function()
        {   var thisLeftOffset = $(this).offset().left;
            if(thisLeftOffset > maxLeftOffset)
            {   maxLeftOffset = thisLeftOffset;
            }
        });
        $(cssSelector_list).each(function()
        {   var thisLeftOffset = $(this).offset().left;
            if(thisLeftOffset != maxLeftOffset)
            {   var currentMargin = $(this).css("margin-left");
                if(currentMargin=="auto")
                {   currentMargin = "0";
                }else
                {   currentMargin = currentMargin.substring(0,currentMargin.length-2);
                }
                var newMarginLeft = parseInt(currentMargin)+parseInt(maxLeftOffset-thisLeftOffset);

                // the following if statement is ie8 hackery because in some (iframe related) conditions, ie8 may return the real offset multiplied by 100 (wtf! right?)
                if(newMarginLeft >= 100 && $.browser.msie && $.browser.version >= 8 && $.browser.version <= 9)
                {   $(this).css({"margin-left":newMarginLeft/100});
                }else
                {   $(this).css({"margin-left":newMarginLeft});
                }
            }
        });
    },

    objMerge: function()
    {   var args = Array.prototype.slice.call(arguments);

        var result = {};
        for(n in args)
        {   for(attrname in args[n])
            {   result[attrname] = args[n][attrname];
            }
        }
        return result;
    },

    /*
    // Decodes URL-encoded string
    //
    // version: 911.718
    // discuss at: http://phpjs.org/functions/urldecode
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +   improved by: Orlando
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    // %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
    // %        note 2: pages served as UTF-8
    // *     example 1: urldecode('Kevin+van+Zonneveld%21');
    // *     returns 1: 'Kevin van Zonneveld!'
    // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    // *     returns 2: 'http://kevin.vanzonneveld.net/'
    // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    */
    // Original Author: Philip Peterson, reimplimented by Brett Zamir
    urldecode: function(str) {
        return decodeURIComponent(str).replace(/\+/g, '%20');
    },

    // Reads a page's GET URL variables and returns them as an associative array.
    // Author: Uzbek Jon <%-- (found at: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html) --%>
    // urldecode added by Billy Tetrud at Playdom
    getUrlVars: function()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = GLOBALCOLLECT.urldecode(hash[1]);
        }
        return vars;
    },

    dirname: function(path)
    {   // Returns the directory name component of the path
        //
        // version: 909.322
        // discuss at: http://phpjs.org/functions/dirname
        // +   original by: Ozh
        // +   improved by: XoraX (http://www.xorax.info)
        // *     example 1: dirname('/etc/passwd');
        // *     returns 1: '/etc'
        // *     example 2: dirname('c:/Temp/x');
        // *     returns 2: 'c:/Temp'
        // *     example 3: dirname('/dir/test/');
        // *     returns 3: '/dir'

        return path.replace(/\\/g,'/').replace(/\/[^\/]*\/?$/, '');
    },

    loadScripts: function(scriptURLs, callback)
    {   var loadedScripts = 0;

        function onScriptsLoad()
        {   if(scriptURLs.length == loadedScripts)
            {   callback();
            } // else don't run
        }

        for(n in scriptURLs)
        {   $.getScript("http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php", function()
            {   loadedScripts += 1;
                onScriptsLoad();
            });
        }
    },

    // this only works for scripts including using html script tags (it doesn't work for something like jquery's getScript function)
    getCurScriptPath: function()
    {   var scripts = document.getElementsByTagName("script");
        return scripts[scripts.length-1].src;
    }
};


alert(PlaydomUtils.dirname(PlaydomUtils.getCurScriptPath()));
