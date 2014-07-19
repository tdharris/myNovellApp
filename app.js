
var startServer = require('./server'),
    minify = require('./js/minify');

// Minify, then start server
minify(startServer);