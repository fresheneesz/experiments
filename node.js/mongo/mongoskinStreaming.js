var mongo = require('mongoskin')

var db = mongo.db('localhost/perfund', {journal: true});

var stream = db.collection('log').find().stream()	// not supported : (

stream.on('error', function (err) {
  console.error(err)
})
stream.on('data', function (doc) {
  console.log(doc)
})