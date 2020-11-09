import puppeteer from 'puppeteer';

export default class Builder {
	static async build(viewport) {
		const launchOptions = {
			headless: true,
			slowMo: 0,
			args: [
				'--no-sandbox',
				'--disable-setui-sandbox',
				'--disable-web-security',
			],
		};

		const broweser = await puppeteer.launch(launchOptions);
		const page = await broweser.newPage();
		const extendedPage = new Builder(page);
		page.setDefaultTimeout(10000);

		switch (viewport) {
			case 'Mobile':
				const mobile = puppeteer.devices['iPhone X'];
				await page.emulate(mobile);
				break;
			case 'Tablet':
				const tablet = puppeteer.devices['iPad landscape'];
				await page.emulate(tablet);
				break;
			case 'Desktop':
				await page.setViewport({ width: 800, height: 600 });
				break;
			default:
				throw new Error('Supported devices are different!');
		}

		return new Proxy(extendedPage, {
			get: (_target, property) => {
				return extendedPage[property] || broweser[property] || page[property];
			},
		});
	}

	constructor(page) {
		this.page = page;
	}

	async waitAndClick(selector) {
		await this.page.waitForSelector(selector);
		await this.page.click(selector);
	}

	async waitAndType(selector, text) {
		await this.page.waitForSelector(selector);
		await this.page.type(selector, text);
	}

	async getText(selector) {
		await this.page.waitForSelector(selector);
		return await this.page.$eval(selector, el => el.innerHTML);
	}

	async getCount(selector) {
		await this.page.waitForSelector(selector);
		return await this.page.$$eval(selector, el => el.length);
	}

	async waitForXPathAndClick(xpath) {
		await this.page.waitForXPath(xpath);
		const elems = await this.page.$x(xpath);
		if (elems.length > 1) console.warn('wait For xpath and click return more');
		await elems[0].click();
	}

	async isElementVisible(selector) {
		let visible = true;
		await this.page
			.waitForSelector(selector, { visible: true, timeout: 3000 })
			.catch(e => {
				visible = false;
			});
		return visible;
	}

	async isXPathVisible(selector) {
		let visible = true;
		await this.page
			.waitForXPath(selector, { visible: true, timeout: 3000 })
			.catch(e => {
				visible = false;
			});
		return visible;
	}
}
