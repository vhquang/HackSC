var net = require('net');

// var HOST = '127.0.0.1';
var HOST = '198.199.113.97';
var PORT = 8080;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write('Client connected!');

    // Add a 'data' event handler for the client socket
    // data is what the server sent to this socket
    client.on('data', function(data) {
        console.log('DATA: ' + data);
        // Close the client socket completely
        // client.destroy();
    });

    client.on('message', function(message) {
        console.log(message);
    });
});


// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});