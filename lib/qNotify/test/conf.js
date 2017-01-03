exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['./e2e/**/*.spec.js'],
	baseUrl: 'https://snielson17.lab.novell.com/qnotify/',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		isVerbose: true,
		// includeStackTrace: false
	}
};
