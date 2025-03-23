import { test, expect, request } from "@playwright/test";
import ApiUtils from "../../utils/ApiUtils";

let orderId;
let token;

const loginPayload = {
    userEmail: "fesvlast@gmail.com",
    userPassword: "Testing123",
};

const fakePayloadOrders = {
    data: [],
    message: "No Orders",
};

const orderPayload = {
    orders: [
        {
            country: "Ukraine",
            productOrderedId: "67a8df1ac0d3e6622a297ccb",
        },
    ],
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

    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async (route) => {
            const response = await page.request.fetch(route.request());

            await route.fulfill({
                response,
                body: JSON.stringify(fakePayloadOrders),
            });
        }
    );

    // Go to the orders page

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
    );

    await expect(page.getByText("You have No Orders to show at")).toBeVisible();
});
