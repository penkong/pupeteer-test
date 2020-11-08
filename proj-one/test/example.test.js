const puppeteer = require('puppeteer');

describe('first puppeteer test', () => {
	it('should launch browser', async () => {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto('http://example.com');
		await page.waitForSelector('h1');
		await browser.close();
	});
});
