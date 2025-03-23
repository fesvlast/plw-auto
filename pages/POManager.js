import LoginPage from "./LoginPage.js";
import MyCartPage from "./MyCartPage.js";
import DashboardPage from "./DashboardPage.js";

export default class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.myCartPage = new MyCartPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashBoardPage() {
        return this.dashboardPage;
    }

    getMyCartPage() {
        return this.myCartPage;
    }
}
