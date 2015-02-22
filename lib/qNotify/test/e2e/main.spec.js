var helper = require('../helpers/helper'),
	options = require('../helpers/options');

describe('should be able to login/logout to notification list', function() {

	beforeEach(function() {
		// Because this isn't a true Angular app
		browser.ignoreSynchronization = true;

		browser.get(options.test.url);

		helper.fields.user.sendKeys(options.test.user);
		helper.fields.email.sendKeys(options.test.email);
		helper.fields.phone.sendKeys(options.test.phone);
		helper.selectDropdownbyNum(helper.fields.carrier, options.test.carrierIndex);
	});

	it('sign-in', function() {
		helper.fields.btnSignIn.click(function(el) {
			// Indicates the client successfully sent it's request to the server
			expect($('.alert-success').isPresent()).toBe(true);

			// Expect options.test.user to be in myUser ul (this indicates the server
			// signed them in, as the ul is populated by /getUsers)
			element.all(by.id('#myUsers li')).filter(function(elem, index) {
			  return elem.getText().then(function(text) {
			    return text === options.test.user;
			  });
			}).then(function(filteredElements) {
			  expect(filteredElements[0]).toBe(options.test.user);
			});
		});

	});

	it('sign-out', function() {
		helper.fields.btnSignOut.click(function(el) {
			// Indicates the client successfully sent it's request to the server
			expect($('.alert').isPresent()).toBe(true);

			// Expect options.test.user not to be in myUser ul (this indicates the server
			// signed them out, as the ul is populated by /getUsers)
			element.all(by.id('#myUsers li')).filter(function(elem, index) {
			  return elem.getText().then(function(text) {
			    return text === options.test.user;
			  });
			}).then(function(filteredElements) {
			  expect(filteredElements[0]).toBe(undefined);
			});
		});

	});
	
});