var logRotate = require('./js/logRotate'),
    config = require('./config.json'),
    startStopDaemon = require('start-stop-daemon'),
    startApp = require('./app');

logRotate();

startStopDaemon({
    'max': 3,
    'append': true,
    'logFile': config.logDirectory + '/app.log'
    // 'outFile': config.logDirectory + '/app.log',
    // 'errFile': config.logDirectory + '/app.log'
}, function() {
    startApp();
});
