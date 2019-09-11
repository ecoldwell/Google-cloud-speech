var app = require('express')();
const cors = require('cors');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(cors())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', function(req, res){
    res.sendFile(__dirname + '/views/testKonrad.html');
  
  });

io.on('connection', function(socket){
  console.log('user connected!');
});

http.listen(3004, function(){
  console.log('listening on *:3004');
});
