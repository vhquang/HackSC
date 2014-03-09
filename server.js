var express = require('express'),
  app = express(), 
  server = require('http').createServer(app);
var HTTP_PORT  = 80;

server.listen(HTTP_PORT);
console.log('Express listening on ' + HTTP_PORT);


app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendfile( 'index.html');
});

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index3.html');
// });

var votes = [0, 0, 0, 0];

function resetCount() {
  votes = [0, 0, 0, 0];
}

function countVote() {
  // var m = parseInt( Math.random() * 4);
  var m = 0;
  for (var i = 0; i < votes.length; i++) {
    if (votes[i] > votes[m]) {
      m = i;
    }
  }
  return m;
}

// app.post('/up', function(req, res) {
//   // var name = req.body.name,
//   //   color = req.body.color;
//   countUp++;
//   res.json({ "d": "OK" })
// });

// app.post('/down', function(req, res) {
//   countDown++;
//   res.json({ "d": "OK" });
// });

app.post('/v0', function(req, res) {
  votes[0]++;
  res.json({ "d": "OK" });
});

app.post('/v1', function(req, res) {
  votes[1]++;
  res.json({ "d": "OK" });
});

app.post('/v2', function(req, res) {
  votes[2]++;
  res.json({ "d": "OK" });
});

app.post('/v3', function(req, res) {
  votes[3]++;
  res.json({ "d": "OK" });
});

/*--------------------- SOCKET IO -------------------*/
// var io = require('socket.io').listen(server);
// io.sockets.on('connection', function (socket) {
//   // socket.emit('news', { hello: 'world' });

//   socket.on('my other event', function (data) {
//     console.log(data);
//   });

//   socket.on('data', function(data) {
//     console.log('DATA ' + socket.remoteAddress + ': ' + data);
//     // Write the data back to the socket, the client will receive it as data from the server
//     socket.write('You said "' + data + '"');
//   });

//   socket.on('close', function(data) {
//     console.log('CLOSED: ' + socket.remoteAddress +' '+ socket.remotePort);
//   });

//   var intervalID = setInterval(function() {
//       socket.write('up');
//   }, INTERVAL);

// });



/*--------------------- SOCKET -------------------*/
var net = require('net');
var HOST = '0.0.0.0';
// var HOST = '198.199.113.97';
var SOCKET_PORT = 8080;
var INTERVAL = 5000;

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
        var count = countVote();
        console.log(votes);
        sock.write( count.toString() );
        resetCount();
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
