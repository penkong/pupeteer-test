'use strict';

var _mochaSteps = require('mocha-steps');

var _chai = require('chai');

var _builder = require('../builder');

var _builder2 = _interopRequireDefault(_builder);

var _LoginPage = require('../pages/LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Name of the group', function () {
	var page = void 0;
	var loginPage = void 0;
	// let mobile

	before(async function () {
		page = await _builder2.default.build('Desktop');
		// mobile = await Page.build('Mobile');
		loginPage = new _LoginPage2.default(page);
	});

	after(async function () {
		await page.close();
	});

	(0, _mochaSteps.step)('should load home page', async function () {
		await page.goto('http://zero.webappsecurity.com/index.html');
		await page.waitAndClick('#onlineBankingMenu');
		(0, _chai.expect)((await page.isElementVisible('#signin_button'))).to.be.true;
	});

	(0, _mochaSteps.step)('should display login page', async function () {
		await page.waitAndClick('#signin_button');
		(0, _chai.expect)((await page.isElementVisible('#login_form'))).to.be.true;
		(0, _chai.expect)((await page.isElementVisible('#signin_button'))).to.be.false;
	});

	(0, _mochaSteps.step)('should login to app', async function () {
		// await page.waitAndType('#user_login', 'username');
		// await page.waitAndType('#user_password', 'password');
		// await page.waitAndClick('.btn-primary');
		await loginPage.login('username', 'password');
		(0, _chai.expect)((await page.isElementVisible('.nav-tabs'))).to.be.true;
	});

	(0, _mochaSteps.step)('should have 6 navbar links', async function () {
		(0, _chai.expect)((await page.getCount('.nav-tabs li'))).to.be.equal(6);
	});
});