var compressor = require('node-minify'),
    logme = require('logme'),
    async = require('async');

module.exports = function(done) {

    logme.info('Starting to minify components...');

    async.parallel([

        function(callback) {
            // Using YUI Compressor for JS
            new compressor.minify({
                type: 'yui-js',
                fileIn: ['public/components/jquery/dist/jquery.min.js', 'public/components/bootstrap/dist/js/bootstrap.min.js'],
                fileOut: 'public/dist/js/base-min-yui.js',
                callback: function(err, min) {
                    callback(err, 1)
                }
            });
        },
        function(callback) {
            // Using YUI Compressor for CSS
            new compressor.minify({
                type: 'yui-css',
                fileIn: ['public/components/normalize-css/normalize.css', 'public/components/bootstrap/dist/css/bootstrap.min.css', 'public/components/app.css'],
                fileOut: 'public/dist/css/base-min-yui.css',
                callback: function(err, min) {
                    callback(err, 2);
                }
            });
        }
    ], function(err, results) {
        if (err)
            logme.error('Failed to minify: ', err);
        else {
            logme.info('Finished minifying components.');
            done();
        }
    });

};
