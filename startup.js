var logRotate = require('./js/logRotate'),
    config = require('./config.json'),
    startStopDaemon = require('start-stop-daemon'),
    startApp = require('./app'),
    logme = require('logme');

logRotate();

startStopDaemon({
	'killTree': true,
    'max': 3,
    'append': true,
    'logFile': config.logDirectory + '/app.log'
    // 'outFile': config.logDirectory + '/app.log',
    // 'errFile': config.logDirectory + '/app.log'
}, function() {
	startApp();
})

	.on('restart', function() {
		logme.warning('Restarting at ' + new Date()); 
	})

	.on('start', function() {
		logme.warning('Starting at ' + new Date()); 
	})

	.on('stop', function() {
		logme.warning('Stopping at ' + new Date()); 
	})

	.on('exit', function() {
		logme.warning('Exiting at ' + new Date()); 
	});
