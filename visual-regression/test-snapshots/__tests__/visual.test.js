const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Visual Regression Testing', () => {
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

	test('Full Page Snapshot', async () => {
		await page.waitForSelector('h1');
		const image = await page.screenshot();
		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'pixel',
			failureTreshold: 500,
		});
	});

	test('Single Element Snapshot', async () => {
		const h1 = await page.waitForSelector('h1');
		const image = await h1.screenshot();
		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'percent',
			failureTreshold: 0.01,
		});
	});

	test('Mobile Snapshot', async () => {
		await page.waitForSelector('h1');
		await page.emulate(puppeteer.devices['iPhone X']);
		const image = await page.screenshot();
		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'percent',
			failureTreshold: 0.01,
		});
	});

	test('Tablet Snapshot', async () => {
		await page.waitForSelector('h1');
		await page.emulate(puppeteer.devices['iPad landscape']);
		const image = await page.screenshot();
		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'percent',
			failureTreshold: 0.01,
		});
	});

	test('Remove Element Before Snapshot', async () => {
		await page.goto('https://example.com');
		await page.evaluate(() =>
			(document.querySelectorAll('h1') || []).forEach((el) => el.remove())
		);
	});
});
