const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const { click, getText, getCount } = require('../lib/helpers');

describe('first puppeteer test', () => {
	let browser;
	let page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		});
		page = await browser.newPage();
		page.setDefaultTimeout(10000);
		page.setDefaultNavigationTimeout(20000);
	});

	after(async () => {
		// await page.waitForTimeout(1000);
		await browser.close();
	});

	beforeEach(async () => {
		// runs after each test step
	});

	beforeEach(async () => {
		// runs after each test step
	});

	it('should launch browser', async () => {
		await page.goto('http://example.com');

		await page.waitForXPath('//h1');

		const title = await page.title();
		const url = await page.url();

		// const text = await page.$eval('h1', el => el.textContent);
		const text = await getText(page, 'h1');

		// const countEl = await page.$$eval('p', el => el.length);
		const countEl = await getCount(page, 'p');

		expect(title).to.be.a('string', 'Example Domain');
		expect(url).to.include('example.com');
		expect(text).to.be.a('string', 'Example Domain');
		expect(countEl).to.equal(2);

		await page.goto('http://zero.webappsecurity.com/index.html');

		// await page.waitForSelector('#signin_button');
		// await page.click('#signin_button');
		await click(page, '#signin_button');

		await page.waitForFunction(() => !document.querySelector('#signin_button'));
		await page.waitForSelector('#signin_button', {
			hidden: true,
			timeout: 30000,
		});
	});
});

// await page.goto('http://example.com');
// await page.waitForSelector('h1');
// await page.goto('http://dev.to');
// await page.waitForSelector('#navigation-progress');
// await page.goBack();
// await page.waitForSelector('h1');
// await page.goForward();
// await page.waitForSelector('#navigation-progress');

// await page.goto('https://devexpress.github.io/testcafe/example/');
// await page.type('#developer-name', 'mkz', { delay: 0 });
// await page.click('#tried-test-cafe', { clickCount: 1 });
// await page.select('#preferred-interface', 'JavaScript API');
// await page.type('#comments', 'fill the textarea with message');
// await page.click('#submit-button');
// await page.waitForSelector('.result-content');

// await page.type('#searchTerm', 'hello world');
// await page.keyboard.press('Enter', { delay: 10 });
