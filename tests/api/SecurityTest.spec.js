import test, { expect } from "@playwright/test";

const user = {
    email: "fesvlast@gmail.com",
    password: "Testing123",
};

test("Security test request intercept", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");

    const email = page.getByPlaceholder("email@example.com");
    await email.fill(user.email);

    const password = page.getByPlaceholder("enter your passsword");
    await password.fill(user.password);

    const signInBtn = page.getByRole("button", { name: "Login" });
    await signInBtn.click();

    await page.waitForLoadState("networkidle");
    const titlesElements = page.locator(".card-body b");
    await titlesElements.first().waitFor();

    await page.getByRole("button", { name: "ORDERS" }).click();

    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        (route) => {
            route.continue({
                url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67g9d72bc019fb1ad62d47e3",
            });
        }
    );

    const viewBtn = page.locator("button:has-text('View')");
    await viewBtn.first().click();

    await expect(page.locator("p").last()).toHaveText(
        "You are not authorize to view this order"
    );
});
