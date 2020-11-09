import { step } from 'mocha-steps';
import { expect } from 'chai';
import Page from '../builder';

describe('Name of the group', () => {
	let page;
	// let mobile

	before(async () => {
		page = await Page.build('Desktop');
		// mobile = await Page.build('Mobile');
	});

	after(async () => {
		await page.close();
	});

	step('should load home page', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html');
		await page.waitAndClick('#onlineBankingMenu');
		const signInBtn = await page.isElementVisible('#signin_button');
		expect(signInBtn).to.be.true;
	});

	step('should display login page', async () => {
		await page.waitAndClick('#signin_button');
		const loginForm = await page.isElementVisible('#login_form');
		expect(loginForm).to.be.true;
		const signInBtn = await page.isElementVisible('#signin_button');
		expect(signInBtn).to.be.false;
	});

	step('should login to app', async () => {
		await page.waitAndType('#user_login', 'username');
		await page.waitAndType('#user_password', 'password');
		await page.waitAndClick('.btn-primary');
		const navbar = await page.isElementVisible('.nav-tabs');
		expect(navbar).to.be.true;
	});
});
