const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Device Emulation', () => {
	let browser;
	let page;

	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		});
		const context = await browser.createIncognitoBrowserContext();
		page = await context.newPage();
		page.setDefaultTimeout(10000);
		page.setDefaultNavigationTimeout(20000);
	});

	after(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		// runs after each test step
	});

	beforeEach(async () => {
		// runs after each test step
	});

	it('Desktop Device test', async () => {
		await page.setViewport({ width: 1650, height: 1050 });
		await page.goto('http://example.com');
		await page.waitForTimeout(1000);
	});

	it('Tablet Device test', async () => {
		const tablet = puppeteer.devices['iPad landscape'];
		await page.emulate(tablet);
		await page.goto('http://example.com');
		await page.waitForTimeout(1000);
	});

	it('Mobile Device test', async () => {
		const mobile = puppeteer.devices['iPhone X'];
		await page.emulate(mobile);
		await page.goto('http://example.com');
		await page.waitForTimeout(1000);
	});
});
