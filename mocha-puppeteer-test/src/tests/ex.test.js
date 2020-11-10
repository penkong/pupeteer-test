import { step } from 'mocha-steps';
import { expect } from 'chai';
import Page from '../builder';
import LoginPage from '../pages/LoginPage';

describe('Name of the group', () => {
	let page;
	let loginPage;
	// let mobile

	before(async () => {
		page = await Page.build('Desktop');
		// mobile = await Page.build('Mobile');
		loginPage = new LoginPage(page);
	});

	after(async () => {
		await page.close();
	});

	step('should load home page', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html');
		await page.waitAndClick('#onlineBankingMenu');
		expect(await page.isElementVisible('#signin_button')).to.be.true;
	});

	step('should display login page', async () => {
		await page.waitAndClick('#signin_button');
		expect(await page.isElementVisible('#login_form')).to.be.true;
		expect(await page.isElementVisible('#signin_button')).to.be.false;
	});

	step('should login to app', async () => {
		// await page.waitAndType('#user_login', 'username');
		// await page.waitAndType('#user_password', 'password');
		// await page.waitAndClick('.btn-primary');
		await loginPage.login('username', 'password');
		expect(await page.isElementVisible('.nav-tabs')).to.be.true;
	});

	step('should have 6 navbar links', async () => {
		expect(await page.getCount('.nav-tabs li')).to.be.equal(6);
	});
});
