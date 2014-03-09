// var app = require('express')(), 
//   server = require('http').createServer(app), 
//   io = require('socket.io').listen(server);

// server.listen(8080);

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

var app = require('http').createServer(handler), 
  io = require('socket.io').listen(app), 
  fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('data', function(data) {
    console.log('DATA ' + socket.remoteAddress + ': ' + data);
    // Write the data back to the socket, the client will receive it as data from the server
    socket.write('You said "' + data + '"');
  });

  socket.on('close', function(data) {
    console.log('CLOSED: ' + socket.remoteAddress +' '+ socket.remotePort);
  });

  var intervalID = setInterval(function() {
      socket.write('up');
  }, 2000);

});