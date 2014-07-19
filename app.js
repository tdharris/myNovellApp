
var express = require('express'),
	fs = require('fs'),
	logme = require('logme'),
	morgan  = require('morgan');

var app = express();
app.use(morgan({ format: 'dev' }));

// If the URL is /main and the relative URL is css/style.css, it will resolve to /css/style.css, 
// but if the URL is /main/, the relative URL resolves to /main/css/style.css.
// Strategy for dealing with this is to redirect to add the trailing slash.
app.all(/^\/qNotify$/, function(req, res) { res.redirect('/qNotify/'); });
app.all(/^\/db$/, function(req, res) { res.redirect('http://tharris3.lab.novell.com'); });
app.all(/^\/qNinja$/, function(req, res) { res.redirect('/qNinja/'); });

app.get('/', function(req, res) {
	
  // res.redirect('/qNinja/');
  var hostname = req.headers.host.split(":")[0];

  if(hostname == "qninja.lab.novell.com")
    res.redirect('/qNinja/');
  else
    res.sendfile("public/index.html", {root: __dirname });

});


// Serve up homepage
app.use(express.static(__dirname+'/public'));

// Mount lib modules
app.use('/qNotify', require('./lib/qNotify'));
app.use('/db', require('./lib/db'));
app.use('/qNinja', require('./lib/qNinja'));

process.on( 'SIGINT', function() {
  console.log(new Date()+" myNovellApp shutting down.");
  process.exit()
});

// Configure https for SSL
var opts = {
  key: fs.readFileSync('./ssl/privatekey.pem'),
  cert: fs.readFileSync('./ssl/certificate.pem')
};

serverhttps = require('https').createServer(opts, app);

serverhttps.listen(443, function() {
	logme.info(' myNovellApp is listening on ' + serverhttps.address().address + ':' + serverhttps.address().port);
});

// Redirect http (80) to https (443)
// http = express();
//http.get('*',function(req,res){  
//    res.redirect('https://tharris7.lab.novell.com'+req.url)
//});
// http.listen(80);