import { Page } from "@playwright/test";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import MyCartPage from "./MyCartPage";

export default class POManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    myCartPage: MyCartPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.myCartPage = new MyCartPage(this.page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getDashBoardPage(): DashboardPage {
        return this.dashboardPage;
    }

    getMyCartPage(): MyCartPage {
        return this.myCartPage;
    }
}
