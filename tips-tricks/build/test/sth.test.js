'use strict';

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Load urls', function () {
	it('should work', async function () {
		var browser = await _puppeteer2.default.launch();
		var page = await browser.newPage();

		await page.goto('https://penbeh.com');

		await browser.close();
	});
}); // const puppeteer = require('puppeteer');