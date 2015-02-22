// Exporting fields for use in tests
exports.fields = {
	user: element(by.id('username')),
	email: element(by.id('email')),
	phone: element(by.id('phone')),
	carrier: element(by.id('carrier')),
	rememberMe: element(by.id('remember-me')),
	btnSignIn: element(by.id('add')),
	btnSignOut: element(by.id('remove'))
}

// exports.user = element(by.id('username'));
// exports.email = element(by.id('email'));
// exports.phone = element(by.id('phone'));
// exports.carrier = element(by.id('carrier'));
// exports.rememberMe = element(by.id('remember-me'));
// exports.btnSignIn = element(by.id('add'));
// exports.btnSignOut = element(by.id('remove'));

exports.selectDropdownbyNum = function(element, optionNum) {
	if (optionNum){
	  var options = element.all(by.tagName('option'))   
	    .then(function(options){
	      options[optionNum].click();
	    });
	}
};