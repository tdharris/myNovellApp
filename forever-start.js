var forever = require('forever-monitor'),
    logme = require('logme');

d = new Date();
logDate = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'_'+d.getHours()+d.getMinutes()+d.getSeconds();

var child = new(forever.Monitor)('app.js', {
    max: 3,
    silent: false,
    options: [{
        'watch': true, // Value indicating if we should watch files.
        'watchIgnoreDotFiles': true, // Whether to ignore file starting with a '.'
        'watchIgnorePatterns': null, // Ignore patterns to use when watching files.
        'watchDirectory': 'lib' // Top-level directory to watch from.
    }],
    //
    // Log files and associated logging options for this instance
    // 
    'logFile': 'logs/'+logDate+'_forever.log', // Path to log output from forever process (when daemonized)
    'outFile': 'logs/'+logDate+'_app.log', // Path to log output from child stdout
    'errFile': 'logs/'+logDate+'_err.log' // Path to log output from child stderr

});

child.on('exit', function() {
    logme.info('app.js has exited after 3 restarts');
});

child.on('watch:restart', function(info) {
    logme.error('Restaring script because ' + info.file + ' changed');
});

child.on('restart', function() {
    logme.error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', function(code) {
    logme.error('Forever detected script exited with code ' + code);
});

process.on("SIGINT", function() {
    logme.warning('myNovellApp Shutting Down...');
    process.exit();
});

child.start();
