module.exports = {
	click: async (page, selector) => {
		try {
			await page.waitForSelector(selector);
			await page.click(selector);
		} catch (error) {
			throw new Error(
				`Could not click on selector : ${selector} , and error : ${error}`
			);
		}
	},

	getText: async (page, selector) => {
		try {
			await page.waitForSelector(selector);
			return await page.$eval(selector, el => el.innerHTML);
		} catch (error) {
			throw new Error(`Can not Text from : ${selector} , and error : ${error}`);
		}
	},

	getCount: async (page, selector) => {
		try {
			await page.waitForSelector(selector);
			return await page.$$eval(selector, el => el.length);
		} catch (error) {
			throw new Error(
				`Can not Count from : ${selector} , and error : ${error}`
			);
		}
	},

	typeText: async (page, selector, text) => {
		try {
			await page.waitForSelector(selector);
			await page.type(selector, text);
		} catch (error) {
			throw new Error(
				`Can not Type Text into : ${selector} , and error : ${error}`
			);
		}
	},

	waitForText: async (page, selector, text) => {
		try {
			await page.waitForSelector(selector);
			await page.waitForFunction(
				(selector, text) =>
					document.querySelector(selector).innerText.includes(text),
				{},
				selector,
				text
			);
		} catch (error) {
			throw new Error(
				`Can not Text Not FOund : ${selector} , and error : ${error}`
			);
		}
	},

	shouldNotExist: async (page, selector) => {
		try {
			// await page.waitForFunction(() => !document.querySelector(selector));
			await page.waitForSelector(selector, { hidden: true });
		} catch (error) {
			throw new Error(
				`Can not shouldNotExist : ${selector} , and error : ${error}`
			);
		}
	},
};
