var fs = require("fs")
var path = require('path')
var repl = require("repl")

function load(path,code){eval(fs.readFileSync(path,'utf8') + (code || ""))}
load("./antlr3-all.js")
load("./RescriptedLexer.js","this.RescriptedLexer = RescriptedLexer")
load("./RescriptedParser.js","this.RescriptedParser = RescriptedParser")
load("./RescriptedUtil.js")


var rescriptedEval = function eval(cmd, cont, name, callback) {
                        try{
                          var code = cmd.substring(1,cmd.length-1) // remove extraneous parantheses
                          var result = RescriptedParse(code)
                          callback(null, "success");
                        } catch(e) {
                          callback(null, e);
                        }
                      }

repl.start("rescripted>", process, rescriptedEval)
