const { default: TopBar } = require('../pages/components/TopBar');
const { default: FeedbackPage } = require('../pages/FeedbackPage');
const { default: HomePage } = require('../pages/HomePage');
const { default: LoginPage } = require('../pages/LoginPage');
const { username, password } = require('../config');

describe('e2e test', () => {
	let homePage, topBar, loginPage, feedbackPage;

	beforeAll(async () => {
		jest.setTimeout(30000);
		homePage = new HomePage();
		topBar = new TopBar();
		loginPage = new LoginPage();
		feedbackPage = new FeedbackPage();
	});

	it('should home page work', async () => {
		await homePage.visit();
		await homePage.isNavbarDisplayed();
	});

	it('should feedback form submit', async () => {
		await homePage.clickFeedbackLink();
		await feedbackPage.isFeedbackFormDisplayed();
		await feedbackPage.submitFeedback(
			'mkz',
			'mkz@gmail.com',
			'subject',
			'comment'
		);
	});

	it('should login to app', async () => {
		await homePage.visit();
		await topBar.isTopBarDisplayed();
		await topBar.clickSignInButton();
		await loginPage.isLoginFormDisplayed();
		await loginPage.login(username, password);
	});
});
