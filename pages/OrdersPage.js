import { expect } from "@playwright/test";

export default class OrdersPage {
    constructor(page) {
        this.page = page;
        this.allOrdersRows = this.page.locator("tbody tr");
        this.orderIdElement = this.page.locator(".col-text");
    }

    async validateThatOrderIdFound(orderId) {
        await this.allOrdersRows.first().waitFor();
        await this.page.waitForTimeout(3000);
        const countOrders = await this.allOrdersRows.count();

        for (let i = 0; i < countOrders; i++) {
            const rowOrderId = await this.allOrdersRows
                .nth(i)
                .locator("th")
                .textContent();
            console.log("Expected order ID: " + orderId);
            console.log("Actual Order ID: " + rowOrderId);

            if (orderId.includes(rowOrderId)) {
                console.log("IF" + rowOrderId);
                await this.allOrdersRows.nth(i).locator(".btn-primary").click();
                break;
            }
        }
        const orderIdDetails = await this.orderIdElement.textContent();
        expect(orderIdDetails).toBe(orderId);
    }
}
