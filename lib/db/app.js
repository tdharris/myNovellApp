// var app = module.exports = sockjs = require('sockjs');

// console.log('loading qDash');

// var echo = sockjs.createServer();
// echo.on('connection', function(conn) {
//     conn.on('data', function(message) {
//         conn.write(message);
//     });
//     conn.on('close', function() {});
// });

// echo.installHandlers(server, {prefix:'/echo'});

var express = require('express'),
    app = module.exports = express();

app.use(express.static(__dirname+'/public'));