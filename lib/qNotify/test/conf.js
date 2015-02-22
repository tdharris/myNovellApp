exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['./e2e/**/*.spec.js'],
	baseUrl: 'https://tharris7.lab.novell.com/qnotify/',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		isVerbose: true,
		includeStackTrace: true
	}
};