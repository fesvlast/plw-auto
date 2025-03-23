import { expect } from "@playwright/test";
import MyCartPage from "./MyCartPage.js";

export default class DashboardPage {
    constructor(page) {
        this.page = page;
        this.titlesElements = page.locator(".card-body b");
        this.addToCardBtns = page.locator(
            "//button[contains(text(), 'Add To Cart')]"
        );
        this.addToCardBtns = page.locator(
            "//button[contains(text(), 'Add To Cart')]"
        );

        this.numberOfAddedItems = page.locator(
            "button[class='btn btn-custom'] label"
        );
        this.cartBtn = page.locator(
            ".btn.btn-custom[routerlink='/dashboard/cart']"
        );
    }

    async waitForPageLoad() {
        await this.titlesElements.first().waitFor();
    }

    async addProductToCart(productName) {
        await this.waitForPageLoad();
        const titles = await this.titlesElements.allTextContents();
        const productNum = titles.indexOf(productName);
        await this.addToCardBtns.nth(productNum).waitFor();
        await this.addToCardBtns.nth(productNum).click();
    }

    async validateNumberOfAddedProductToCart(numberOfProducts) {
        await expect(this.numberOfAddedItems).toContainText(numberOfProducts);
    }

    async navigateToCartPage() {
        await this.cartBtn.click();
        return new MyCartPage(this.page);
    }
}
