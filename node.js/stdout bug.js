var fs = require('fs');
function log(m) {
	fs.writeSync(process.stdout.fd, m+"\n");
};

log("test");
log("test");
throw Error("test");