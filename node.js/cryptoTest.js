var crypto = require('crypto');

var cryptor = {
	hash: function(algorithm, encoding) {
		var hasher = crypto.createHash("md5");
		this.enc = function(message) {
			return hasher.update(message).digest(encoding).toString();	
		}		
	},
	sym: function(algorithm, encoding) {
		this.enc = function(key, message) {
			var enc = crypto.createCipheriv(algorithm, key, '');
			return enc.update(message, 'utf8', encoding).toString() + enc.final(encoding);;
		}
		this.dec = function(key, encryptedMessage) {
			var dec = crypto.createDecipheriv(algorithm, key, '');
			return dec.update(encryptedMessage, encoding, 'utf8');
		}
	},
	
	/*asym: function() {
		
	}*/	
}

//console.log(c.getCiphers());

var c = new cryptor.sym('rc4', 'base64');

/*var enc = c.createCipher('rc4', 'test');
var dec = c.createDecipher('rc4', 'test');
var code = enc.update('testing', 'utf8', 'base64')
code += enc.final('base64');*/

var code = c.enc('test', 'testing');
console.log(code);

//var result = dec.update(code, 'base64', 'utf8');

console.log(c.dec('test',code));

var h = new cryptor.hash('md5', 'base64');
//var hash = c.createHash("md5");

var w = "PlaydomAdunitImpressionRevenue4RJ98W34JJP2398JQ230909JQG4JO"
var hash = h.enc(w);

console.log(hash);

var user = c.enc(hash, '100001342672661');
console.log(user)

user = c.enc(new Buffer("test123123").toString("binary"), "test");
console.log(user)




