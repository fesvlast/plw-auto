import { test, expect, request } from "@playwright/test";
import ApiUtils from "../../utils/ApiUtils";

let orderId;
let token;

const loginPayload = {
    userEmail: "fesvlast@gmail.com",
    userPassword: "Testing123",
};

const orderPayload = {
    orders: [
        {
            country: "Ukraine",
            productOrderedId: "67a8df1ac0d3e6622a297ccb",
        },
    ],
};

const orderData = {
    product: "IPHONE 13 PRO",
    itemPrice: "231500",
    status: "In Stock",
    totalPrice: "231500",
};

const cardDetails = {
    email: "fesvlast@gmail.com",
    cardNumber: "4542 9931 9292 2294",
    CVV: "345",
    cardName: "Test card",
    expireMonth: "01",
    expireYear: "2026",
    coupon: "rahulshettyacademy",
    country: "India",
};

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
    token = response.token;
    orderId = response.orderId;
});

test("@API Client App Login via API", async ({ page }) => {
    page.addInitScript((value) => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    // Go to the orders page

    await page.locator("button[routerlink*='myorders']").click();

    const rows = page.locator("tbody tr"); // tr.ng-star-inserted
    await rows.first().waitFor();
    const countOrders = await rows.count();

    for (let i = 0; i < countOrders; i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();

        if (rowOrderId.trim() === orderId) {
            await rows.nth(i).locator(".btn-primary").click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();

    expect(orderIdDetails).toBe(orderId);
});
