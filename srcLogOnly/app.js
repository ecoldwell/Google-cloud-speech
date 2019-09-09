var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/teaser/testKonrad.html');
  
  });

io.on('connection', function(socket){
  console.log('user connected!');
});

http.listen(3004, function(){
  console.log('listening on *:3004');
});
