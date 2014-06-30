
var express = require('express'),
	fs = require('fs'), 
	addNotify = require("./njs/addNotify"), 
	removeNotify = require('./njs/removeNotify'), 
	setops = require('setops'), 
	logIt = require('./njs/logIt'), 
	scheduler = require('node-schedule'), 
	exec = require('child_process').exec;

app = module.exports = express();
STATIC_DIR = __dirname+'/public';
	
// Initialize
var userList = [];

app.configure(function(){
  app.use(express.static(STATIC_DIR));
  app.use(express.bodyParser());
});

function newRequest(type, req) {
	sid = Math.random().toString(36).substring(7);
	console.log(new Date()+" [sid:"+sid+"]", type, "New request from", req.ip+":", req.body.username, "-", req.body.email+",", req.body.txt);
};

// Routes
app.post('/addNotify', function(req, res){
	newRequest('[addNotify]', req);
	addNotify([req.body.email, req.body.txt], function(err) {
	if(err) return res.send("failure");
	var iconValue = 0;

		var user = [ req.body.username ];
		// var user = [{ "username": req.body.username, "email": req.body.email, "txt": req.body.txt }];
		if (user) {
			userList = setops(user).union(userList);
			console.log(new Date()+" [sid:"+sid+"] [addNotify] [userList] current list: " + userList);
		}
		
		res.send("success");
	});	
});

app.post('/removeNotify', function(req, res){
	newRequest('[removeNotify]', req);
	removeNotify([req.body.email, req.body.txt], function(err) {
	if(err) return res.send("failure");
	// val.username fixes this remove thing!
	userList = userList.filter(function(val) { return val != req.body.username; });
		logIt("[removeNotify] [userList] current list: " + userList);
		res.send("success");
	});
});

app.post('/getUsers', function(req, res){
	res.send(userList);
});

// Scheduler
scheduler.scheduleJob({hour: 21, minute: 0}, function(){
    exec('qmon -S EmailAddress=null', function(err, stdout, stderr) {
	    if (err) {
	    	console.log(new Date()+' [scheduler] [reset] exec error: ' + err);
	    }
	    else {
    	    userList = [];
    	    console.log(new Date()+' [scheduler] [reset] Cleared userList.');
	    }
	});

});