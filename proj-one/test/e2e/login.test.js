const puppeteer = require('puppeteer');

describe('Login Test', () => {
	let browser;
	let page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 0,
			devtools: false,
		});
		page = await browser.newPage();
		page.setDefaultTimeout(10000);
		page.setDefaultNavigationTimeout(20000);
	});

	after(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		// runs after each test step
		await page.goto('http://zero.webappsecurity.com/index.html');
	});

	afterEach(async () => {
		// runs after each test step
	});

	it('Invalid credentials', async () => {
		await page.waitForSelector('#signin_button');
		await page.click('#signin_button');
		await page.waitForSelector('#login_form');
		await page.type('#user_login', 'invalid');
		await page.type('#user_password', 'invalid');
		await page.click('#user_remember_me');
		await page.click('input[type="submit"]');
		await page.waitForSelector('.alert-error');
	});

	it('Valid credentials', async () => {
		await page.waitForSelector('#signin_button');
		await page.click('#signin_button');
		await page.waitForSelector('#login_form');
		await page.type('#user_login', 'username');
		await page.type('#user_password', 'password');
		await page.click('#user_remember_me');
		await page.click('input[type="submit"]');
		await page.waitForSelector('#settingsBox');
	});
});
