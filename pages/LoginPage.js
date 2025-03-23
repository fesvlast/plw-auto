export default class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInBtn = page.locator("#login");
        this.userEmail = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(email, password) {
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState("networkidle");
    }
}
