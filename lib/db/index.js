var express = require('express'),
    app = module.exports = express();

app.use(express.static(__dirname+'/public'));

console.log('Dashboard services are up.');