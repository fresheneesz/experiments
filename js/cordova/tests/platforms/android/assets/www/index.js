// Application Constructor
;(function() {
    // do things to set up your application

    document.addEventListener('deviceready', function() {
        try {

            cordova.exec( function(winParam) {
                    console.log(winParam)

                }, function(error) {
                    console.error("error: "+error)

                },
                "SMSClient","getByTimestamp",
                [ 1377906075, 1377906075]);

            pluginTest()
            indexedDbTest()
        } catch(e) {
            console.log("error: "+e)
        }
    }, false);
})(this)

function indexedDbTest() {

    console.log("trying")
    var version = 3
    var request = window.indexedDB.open("MyTestDatabase", version)

    $("#app").html("")

    request.onerror = function(event) {
        console.log('error: ')
        console.dir(event.target.error)
    };
    request.onsuccess = function(e) {
        console.log('success')
        console.dir(e)
    };
}

function pluginTest() {
    cordova.exec(function(winParam) {
        console.log(winParam)

    }, function(error) {
        console.error("error: "+error)

    }, "PluginTest1", "test", [4]);
}