var app = require('express')(), 
  server = require('http').createServer(app);
var HTTP_PORT  = 80;

server.listen(HTTP_PORT);
console.log('Express listening on ' + HTTP_PORT);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


var net = require('net');

var HOST = '127.0.0.1';
// var HOST = '198.199.113.97';
var SOCKET_PORT = 8080;
var INTERVAL = 2000;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('client said "' + data + '"');
        
    });
    
    var intervalID = setInterval(function() {
        sock.write('up');
    }, INTERVAL);

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        if (intervalID) {
          clearInterval(intervalID);
        }
    });
    
}).listen(SOCKET_PORT, HOST);

console.log('Socket listening on ' + HOST +':'+ SOCKET_PORT);