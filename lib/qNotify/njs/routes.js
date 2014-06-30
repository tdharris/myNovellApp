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