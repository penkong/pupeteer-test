const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Currency Exchange Test', () => {
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

		await page.goto('http://zero.webappsecurity.com/login.html');
		await page.waitForSelector('#login_form');
		await page.type('#user_login', 'username');
		await page.type('#user_password', 'password');
		await page.click('#user_remember_me');
		await page.click('input[type="submit"]');
	});

	after(async () => {
		await browser.close();
	});

	// scenario 1
	it('Display currency exchange form', async () => {
		await page.waitForSelector('.nav-tabs');
		await page.click('#pay_bills_tab');
		await page.waitForSelector(
			'li.ui-state-default:nth-child(3) > a:nth-child(1)'
		);
		await page.click('li.ui-state-default:nth-child(3) > a:nth-child(1)');
		await page.waitForSelector('.board');
	});

	// scenario 2
	it('Exchange currency', async () => {
		await page.select('#pc_currency', 'GBP');
		await page.type('#pc_amount', '100');
		await page.click('#pc_inDollars_true');
		await page.click('#purchase_cash');
		await page.waitForSelector('#alert_content');
	});
});
