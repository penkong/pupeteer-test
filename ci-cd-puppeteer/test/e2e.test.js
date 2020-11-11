const puppeteer = require('puppeteer');

describe('E2E Test', () => {
	let browser, page;

	before(async function () {
		browser = await puppeteer.launch({ headless: true });
		page = await browser.newPage();
		page.setDefaultTimeout(10000);
	});

	after(async function () {
		await browser.close();
	});

	it('should submit form', async () => {
		await page.goto('https://devexpress.github.io/testcafe/example/');
		await page.waitForSelector('#main-form');
		await page.type('#developer-name', 'mkz');
		await page.click('#tried-test-cafe');
		await page.click('#submit-button');
		await page.waitForSelector('.result-content');
	});

	it('should select value from select box', async () => {
		await page.goto('https://devexpress.github.io/testcafe/example/');
		await page.waitForSelector('#main-form');
		await page.select('#preferred-interface', 'JavaScript API');
	});
});
