var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();

function start(callback) {
	app.use(serveStatic('../app'));

    callback(app);
}

exports.start = start;