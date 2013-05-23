var install = require('installUtils');

var installComponents = "installComponents/";
var installDirectory = "../";

var shrinkwrapFile = "npm-shrinkwrap.json";
install.file(installComponents+shrinkwrapFile, installDirectory+shrinkwrapFile);
install.file(installComponents+"configurationTemplate.js", installDirectory+"configuration.js");

var modules = ['mysql', 'fibers', 'moment'];

var allModulesShrinkwrapped = true;
modules.foreach(function(module) {
	allModulesShrinkwrapped = allModulesShrinkwrapped && install.module(module, installDirectory);
});

if( ! allModulesShrinkwrapped ) {
    install.runCommand("npm "+installDirectory+"shrinkwrap");   // ensure consistent versions of the installed modules:
	install.runCommand("cp "+installDirectory+"npm-shrinkwrap.json "+installComponents+"npm-shrinkwrap.json");   // copy the new shrinkwrap to the installComponents directory
}
