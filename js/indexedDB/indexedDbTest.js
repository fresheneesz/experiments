$(function() {
    //var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
    /* if ('webkitIndexedDB' in window) {
      window.IDBTransaction = window.webkitIDBTransaction;
      window.IDBKeyRange = window.webkitIDBKeyRange;
    }
    */
    var version = 3
    var request = window.indexedDB.open("MyTestDatabase", version)

	request.onerror = function(event) {
        console.log('error: ')
        console.dir(event.target.error)
    };
    request.onsuccess = function(e) {
        console.log('success')
        console.dir(e)
        db = e.target.result;

        if(version!= db.version && db.setVersion) {
            /*var setVrequest = db.setVersion("cat");
            setVrequest.onsuccess = function(e) {
                console.log('setVrequest success')

            }
            setVrequest.onerror = function(e) {
                console.log('setVrequest error')

            }*/
        }

        //var objectStore = db.createObjectStore("customers");
        //objectStore.add({test:"ok", test2: 4});
    };
});