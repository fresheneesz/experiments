var mongo = require('mongoskin')

var db = mongo.db('localhost/local', {journal: true});

/*
db.collectionNames(function(err, options) {
    if(err)console.log(err);
    console.log(options);
})
*/

db.collection('user').find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log("result: ");
    console.log(result);
});

/* // another way
var cursor = db.collection('user').find({});

cursor.each(function(err, doc) {
    if(err)console.log(err);
    console.log(doc);

    if(cursor.hasNext()) {
        db.close();
    }
});
//*/

db.collection('user').findOne(function(err, value) {
    if(err) throw err;
    console.log("findOne: ");
    console.log(value);
});


var cursor = db.collection('user').find();
//cursor.hasNext(); // doesn't exist ????

cursor.count(function(e,v) {
    console.log("wut");
    console.log(v);
});
cursor.nextObject(function(err, value) {
    if(err) throw err;
    console.log("nextObject: ");
    console.log(value);
});

/* no stream method either... man the docs suck for these things

var oneStream = db.collection('user').find().stream();

var one = oneStream.read(1);
console.log("Stream: ");
console.log(one);
*/

db.collection('user').find({sn:'billy'}).limit(1).toArray(function(err, result) {
    if (err) throw err;
    console.log("wtf: ");
    console.log(result);
});

db.collection('user').findOne({sn:''}, function(err, result) {
    if (err) throw err;
    console.log("findOne: ");
    console.log(result);
});