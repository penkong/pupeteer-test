const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Feedback Test', () => {
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
	});

	afterEach(async () => {
		// runs after each test step
	});

	// scenario 1
	it('Display feedback form', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html');
		await page.waitForSelector('#feedback');
		await page.click('#feedback');
	});

	// scenario 2
	it('Sumbit feedback form', async () => {
		await page.waitForSelector('form');
		await page.type('#name', 'Name');
		await page.type('#email', 'test@gmail.com');
		await page.type('#subject', 'subject');
		await page.type('#comment', 'just a message');
		await page.click('input[type="submit"]');
	});

	// scenario 3
	it('Display result page', async () => {
		await page.waitForSelector('#feedback-title');
		const url = await page.url();
		expect(url).to.include('/sendFeedback.html');
	});
});
