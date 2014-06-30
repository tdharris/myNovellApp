// I'm just being lazy and loading both apps here for simpliciy,
// but these would be started by themselves as their own
// servers somewhere else
// require('./this-app');
// require('./that-app');
 
// core node http lib for your proxy server
// you'd probably use the "https" module here, and add certs
// you could really use any http server for this, even express, but this
// is probably sufficient and simpler, since you won't be providing anything
// but forwarding requests from this server
var http = require('http');
 
// this modules provides a way to proxy the requests from our main server
var httpProxy = require('http-proxy');
 
// create our proxy handler we can send requests to
var proxy = httpProxy.createProxy();
 
// create our proxy server w/ core node http module
var proxyServer = http.createServer(function(req, res) {
    console.log('Incoming Url to proxy server: ', req.url);
 
    // route anything that starts with "/thisApp" to it's server
    if(/^\/qNotify/.test(req.url)) {
        console.log(req);
        console.log('routing %s to qNotify', req.url);
 
        // strip off the leading "/thisApp" from the url so it's
        // not visible to your app we forward to
        req.url = req.url.substring(8);
 
        // send the request along to thisApp's server
        return proxy.web(req, res, {
            target: 'http://localhost:3001'
        });
    }
 
    if(/^\/thatApp/.test(req.url)) {
        console.log(req);
        console.log('routing %s to thatApp', req.url);
 
 
        // strip off the leading "/thatApp" from the url so it's
        // not visible to your app we forward to
        req.url = req.url.substring(8);
 
        // send the request along to thatApp's server
        return proxy.web(req, res, {
            target: 'http://localhost:3002'
        });
    }
 
    // no matching "app" to proxy to
    res.statusCode = 404;
    res.end('i got nothin');
 
});
 
// you'd probably be listening on 80/443 here
proxyServer.listen(3000);