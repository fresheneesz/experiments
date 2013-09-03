//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var isBrowser = !!(typeof window !== 'undefined' && navigator && window.document)
//PS3 indicates loaded and complete, but need to wait for complete
//specifically. Sequence is 'loading', 'loaded', execution,
// then 'complete'. The UA check is unfortunate, but not sure how
//to feature test w/o causing perf issues.
var readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/

/**
 * Does the request to load a module for the browser case.
 * Make this a separate function to allow other environments
 * to override it.
 *
 * @param {Object} context the require context to find state.
 * @param {String} moduleName the name of the module.
 * @param {Object} url the URL to the module.
 */
req.load = function (context, moduleName, url) {
    var config = (context && context.config) || {},
        node;
    if (isBrowser) {
        //In the browser so use a script tag
        node = req.createNode(config, moduleName, url);

        node.setAttribute('data-requirecontext', context.contextName);
        node.setAttribute('data-requiremodule', moduleName);

        //Set up load listener. Test attachEvent first because IE9 has
        //a subtle issue in its addEventListener and script onload firings
        //that do not match the behavior of all other browsers with
        //addEventListener support, which fire the onload event for a
        //script right after the script execution. See:
        //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
        //UNFORTUNATELY Opera implements attachEvent but does not follow the script
        //script execution mode.
        if (node.attachEvent &&
                //Check if node.attachEvent is artificially added by custom script or
                //natively supported by browser
                //read https://github.com/jrburke/requirejs/issues/187
                //if we can NOT find [native code] then it must NOT natively supported.
                //in IE8, node.attachEvent does not have toString()
                //Note the test for "[native code" with no closing brace, see:
                //https://github.com/jrburke/requirejs/issues/273
                !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                !isOpera) {
            //Probably IE. IE (at least 6-8) do not fire
            //script onload right after executing the script, so
            //we cannot tie the anonymous define call to a name.
            //However, IE reports the script as being in 'interactive'
            //readyState at the time of the define call.
            useInteractive = true;

            node.attachEvent('onreadystatechange', onScriptLoad);
            //It would be great to add an error handler here to catch
            //404s in IE9+. However, onreadystatechange will fire before
            //the error handler, so that does not help. If addEventListener
            //is used, then IE will fire error before load, but we cannot
            //use that pathway given the connect.microsoft.com issue
            //mentioned above about not doing the 'script execute,
            //then fire the script load event listener before execute
            //next script' that other browsers do.
            //Best hope: IE10 fixes the issues,
            //and then destroys all installs of IE 6-9.
            //node.attachEvent('onerror', context.onScriptError);
        } else {
            node.addEventListener('load', onScriptLoad, false);
            node.addEventListener('error', context.onScriptError, false);
        }
        node.src = url;

        //For some cache cases in IE 6-8, the script executes before the end
        //of the appendChild execution, so to tie an anonymous define
        //call to the module name (which is stored on the node), hold on
        //to a reference to this node, but clear after the DOM insertion.
        currentlyAddingScript = node;
        if (baseElement) {
            head.insertBefore(node, baseElement);
        } else {
            head.appendChild(node);
        }
        currentlyAddingScript = null;

        return node;
    } else if (isWebWorker) {
        try {
            //In a web worker, use importScripts. This is not a very
            //efficient use of importScripts, importScripts will block until
            //its script is downloaded and evaluated. However, if web workers
            //are in play, the expectation that a build has been done so that
            //only one script needs to be loaded anyway. This may need to be
            //reevaluated if other use cases become common.
            importScripts(url);

            //Account for anonymous modules
            context.completeLoad(moduleName);
        } catch (e) {
            context.onError(makeError('importscripts',
                            'importScripts failed for ' +
                                moduleName + ' at ' + url,
                            e,
                            [moduleName]));
        }
    }
};

/**
 * Creates the node for the load command. Only used in browser envs.
 */
req.createNode = function (config, moduleName, url) {
    var node = config.xhtml ?
            document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
            document.createElement('script');
    node.type = config.scriptType || 'text/javascript';
    node.charset = 'utf-8';
    node.async = true;
    return node;
};

/**
 * callback for script loads, used to check status of loading.
 *
 * @param {Event} evt the event from the browser for the script
 * that was loaded.
 */
function onScriptLoad(evt) {
    //Using currentTarget instead of target for Firefox 2.0's sake. Not
    //all old browsers will be supported, but this one was easy enough
    //to support and still makes sense.
    if (evt.type === 'load' ||
            (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {

        //Pull out the name of the module and the context.
        var data = getScriptData(evt);
        context.completeLoad(data.id);
    }
};



/**
 * Given an event from a script node, get the requirejs info from it,
 * and then removes the event listeners on the node.
 * @param {Event} evt
 * @returns {Object}
 */
function getScriptData(evt) {
    //Using currentTarget instead of target for Firefox 2.0's sake. Not
    //all old browsers will be supported, but this one was easy enough
    //to support and still makes sense.
    var node = evt.currentTarget || evt.srcElement;

    //Remove the listeners once here.
    removeListener(node, onScriptLoad, 'load', 'onreadystatechange');
    removeListener(node, context.onScriptError, 'error');

    return {
        node: node,
        id: node && node.getAttribute('data-requiremodule')
    };
}