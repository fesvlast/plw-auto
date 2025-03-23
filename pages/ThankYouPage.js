import { expect } from "@playwright/test";
import OrdersPage from "./OrdersPage.js";

export default class ThankYouPage {
    constructor(page) {
        this.page = page;
        this.orderIdElement = page.locator("label.ng-star-inserted");
        this.thankYouMessage = page.locator(".hero-primary");
        this.ordersBtn = page.locator("button[routerlink*='myorders']");
    }

    async verifyTheOrderAndGetTheOrderId() {
        // Validate order was created
        let orderId = await this.orderIdElement.textContent();
        orderId = orderId.split(" ").at(2).trim();
        expect(orderId).toBeTruthy();
        await expect(this.thankYouMessage).toHaveText(
            "Thankyou for the order."
        );

        return orderId;
    }

    async navigateToOrdersPage() {
        await this.ordersBtn.click();
        await this.page.waitForLoadState("networkidle");
        return new OrdersPage(this.page);
    }
}
