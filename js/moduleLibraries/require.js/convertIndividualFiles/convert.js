'use strict';
/*jslint nomen: false */
/*global require, __dirname, console */

var requirejs = require('../node_modules/requirejs/bin/r.js'),
    fs = require('fs'),
    path = require('path'),
    jsRegExp = /\.js$/,
    dir = __dirname,
    thisName = path.basename(__filename);

function onLib(require) {
    require(['commonJs'], function (commonJs) {
        var deps = {};

        var name = '1.commonJs.js'
        var fileName = path.join(dir, name),
            contents = fs.readFileSync(fileName, 'utf8');
        deps[path.basename(name, '.js')] = commonJs.convert(fileName, contents);

        console.log(JSON.stringify(deps, null, '  '));
    });
}

requirejs.tools.useLib(onLib);