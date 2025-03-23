import { expect } from "@playwright/test";
import PaymentPage from "./PaymentPage.js";

export default class MyCartPage {
    constructor(page) {
        this.page = page;
        this.productItem = page.locator(".cartSection h3");
        this.itemPrice = page.locator("//p[contains(text(), 'MRP')]");
        this.stockStatus = page.locator(".stockStatus");
        this.checkoutBtn = page.locator(
            "li[class='totalRow'] button[type='button']"
        );
    }

    async verifyThatProductIsInCart(orderData) {
        await expect(this.productItem).toContainText(orderData.productName);
        await expect(this.itemPrice).toContainText(orderData.itemPrice);
        await expect(this.stockStatus).toContainText(orderData.status);
        await expect(this.page.locator(".totalRow span").last()).toContainText(
            orderData.totalPrice
        );
        const productId = await this.page.locator(".itemNumber").textContent();
        console.log("Product ID: " + productId);
    }

    async navigateToPaymentPage() {
        await this.checkoutBtn.click();
        return new PaymentPage(this.page);
    }
}
