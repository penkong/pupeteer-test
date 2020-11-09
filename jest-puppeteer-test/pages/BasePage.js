export default class BasePage {
	async wait(timeout) {
		await page.waitForTimeout(timeout);
	}

	async getTitle() {
		return await page.title();
	}

	async getUrl() {
		return await page.url();
	}
}
