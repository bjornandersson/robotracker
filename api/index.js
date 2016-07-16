var http = require('http');
var router = require('./router.js');

//var coords = [[56.19815,15.5325],[56.19816,15.5326],[56.19814,15.5326],[56.19814,15.5324]];
var idx = 0;

router.start(function(app) {

    var httpServer = http.createServer(app).listen(8080);

    var WebSocketServer = require('websocket').server;
    var ws = new WebSocketServer({
        httpServer: httpServer,
        autoAcceptConnections: false
    });
    ws.on('request', function(request) {
        var connection = request.accept(); 
        console.log((new Date()) + ' Connection accepted from ' + request.origin);

        connection.on('message', function(msg) {
            if(msg.type === 'utf8') {
                console.log('Received message: ' + msg.utf8Data);

                setInterval(function() {
                    connection.sendUTF(JSON.stringify({
                        'lat': coords[idx][0],
                        'lng': coords[idx][1]
                    }));
                    idx++;
                    if(idx > 3) idx = 0;
                }, 2000);
            }
        });
    });
});