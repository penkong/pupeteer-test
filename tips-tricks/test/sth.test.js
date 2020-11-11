// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';

describe('Load urls', () => {
	it('should work', async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		await page.goto('https://penbeh.com');

		await browser.close();
	});
});
