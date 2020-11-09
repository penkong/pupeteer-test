const puppeteer = require('puppeteer');

const { percySnapshot } = require('@percy/puppeteer');

describe('Percy Visual Test', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch({ headless: true });
		page = await browser.newPage();
	});

	afterAll(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		await page.goto('https://example.com');
	});

	test('Full Page percy snapshot', async () => {
		await page.evaluate(() =>
			(document.querySelectorAll('h1') || []).forEach((el) => el.remove())
		);
		await percySnapshot(page, 'example page');
	});
});
