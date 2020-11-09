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
};
