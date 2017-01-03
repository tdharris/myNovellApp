module.exports = function() {

    var express = require('express'),
        fs = require('fs'),
        logme = require('logme'),
        morgan = require('morgan'),
        https = require('https'),
        compress = require('compression')();

    var app = express();

    // If the URL is /main and the relative URL is css/style.css, it will resolve to /css/style.css, 
    // but if the URL is /main/, the relative URL resolves to /main/css/style.css.
    // Strategy for dealing with this is to redirect to add the trailing slash.
    app.all(/^\/qNotify$/i, function(req, res) {
        res.redirect('/qNotify/');
    });
    app.all(/^\/db$/i, function(req, res) {
        res.redirect('http://snielson16.lab.novell.com');
    });
    app.all(/^\/qNinja$/i, function(req, res) {
        res.redirect('/qNinja/');
    });

    app.get('/', function(req, res) {

        var hostname = req.headers.host.split(":")[0];

        if (hostname == "qninja.lab.novell.com")
            res.redirect('/qNinja/');
        else
            res.sendfile("public/index.html", {
                root: __dirname
            });

    });

    // Only log error responses
    app.use(morgan({
            format: 'combined',
            skip: function(req, res) {
                return res.statusCode < 400;
            }
        }))
        .use(compress)
        .use(express.static(__dirname + '/public'))
        .use('/qNotify', require('./lib/qNotify'))
        .use('/db', require('./lib/db'))
        .use('/qNinja', require('./lib/qNinja'));

    https.createServer({
            key: fs.readFileSync('./ssl/server.key'),
            cert: fs.readFileSync('./ssl/server.crt')
        }, app)
        .listen(443, function() {
            logme.info('myNovellApp is listening on ' + this.address().address + ':' + this.address().port);
        });

    // Redirect http (80) to https (443)
    // http = express();
    //http.get('*',function(req,res){  
    //    res.redirect('https://snielson17.lab.novell.com'+req.url)
    //});
    // http.listen(80);

};
