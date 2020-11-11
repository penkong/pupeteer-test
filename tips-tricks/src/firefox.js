// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-firefox');

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://penbeh.com');
	await page.waitForSelector('title');
	await page.waitFor(4000);
	await browser.close();
})();

// incognito browser
