const puppeteer = require('puppeteer');

// screenshot
// (async () => {
// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();

// 	await page.goto('http://example.com', { waitUntil: 'networkidle0' });

// 	await page.screenshot({ path: 'example.png', fullPage: true });

// 	await browser.close();
// })();

// pdf
// (async () => {
// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();

// 	await page.goto('http://example.com', { waitUntil: 'networkidle0' });

// 	await page.pdf({ path: 'example.pdf', format: 'A4' });

// 	await browser.close();
// })();

// emulate devices
// (async () => {
// 	const browser = await puppeteer.launch({ headless: false });
// 	const page = await browser.newPage();
// 	await page.emulate(puppeteer.devices['iPhone X']);
// 	await page.goto('http://pptr.dev');
// 	await page.waitForTimeout(5000);
// 	await browser.close();
// })();

// faking geolocation
// (async () => {
// 	const browser = await puppeteer.launch({ headless: false });
// 	const page = await browser.newPage();
// 	// grant permission for geo
// 	const context = browser.defaultBrowserContext();
// 	await context.overridePermissions('https://pptr.dev', ['geolocation']);
// 	await page.goto('https://pptr.dev');
// 	await page.waitForSelector('title');

// 	// change location
// 	await page.setGeolocation({ latitude: 90, longitude: 12 });
// 	await browser.close();
// })();

// accessiblity test
// (async () => {
// 	const browser = await puppeteer.launch({ headless: false });
// 	const page = await browser.newPage();

// 	await page.goto('https://penbeh.com');
// 	await page.waitForSelector('title');
// 	const snapshot = await page.accessibility.snapshot();
// 	console.log(snapshot);

// 	await browser.close();
// })();

// measuring performance
// (async () => {
// 	const browser = await puppeteer.launch({ headless: false });
// 	const page = await browser.newPage();

// 	await page.goto('https://penbeh.com');
// 	await page.waitForSelector('title');

// 	// exec nav api within page context
// 	const metrics = await page.evaluate(() => JSON.stringify(window.performance));
//   console.log(JSON.parse(metrics));

// 	await browser.close();
// })();

// incognito
(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const context = await browser.createIncognitoBrowserContext();
	const page = await context.newPage();

	await page.goto('https://penbeh.com');
	await page.waitForSelector('title');
	await page.waitForTimeout(4000);
	await browser.close();
})();
