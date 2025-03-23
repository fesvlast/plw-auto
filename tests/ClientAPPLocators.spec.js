import { expect, test } from "@playwright/test";

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

test("Browser Context Playwright Test", async ({ browser, page }) => {
    await page.goto("https://rahulshettyacademy.com/client");

    const email = page.getByPlaceholder("email@example.com");
    await email.fill(cardDetails.email);

    const password = page.getByPlaceholder("enter your passsword");
    await password.fill("Testing123");

    const signInBtn = page.getByRole("button", { name: "Login" });
    await signInBtn.click();

    await page.waitForLoadState("networkidle");
    const titlesElements = page.locator(".card-body b");
    await titlesElements.first().waitFor();

    await page
        .locator(".card-body")
        .filter({ hasText: orderData.product })
        .getByRole("button", { name: "Add to Cart" })
        .click();

    const numberOfAddedItems = page.locator(
        "button[class='btn btn-custom'] label"
    );

    await expect(numberOfAddedItems).toContainText("1");

    const cartBtn = page
        .getByRole("listitem")
        .getByRole("button", { name: "Cart" });
    await cartBtn.click();

    //Validate added to card item
    await expect(page.locator(".cartSection h3")).toContainText(
        orderData.product
    );

    await expect(page.locator("//p[contains(text(), 'MRP')]")).toContainText(
        orderData.itemPrice
    );

    await expect(page.getByText(orderData.product)).toBeVisible();
    await expect(page.locator(".stockStatus")).toContainText(orderData.status);
    await expect(page.locator(".totalRow span").last()).toContainText(
        orderData.totalPrice
    );

    const productId = await page.locator(".itemNumber").textContent();

    const checkoutBtn = page.getByRole("button", { name: "Checkout" });
    await checkoutBtn.click();

    //Payment page

    await expect(page.locator(".payment__types").first()).toContainText(
        "Credit Card"
    );
    await expect(page.locator(".user__name label")).toContainText(
        cardDetails.email
    );

    const cardNumber = page.locator(
        "//div[contains(text(), 'Credit Card Number ')]/../input"
    );
    await cardNumber.fill(cardDetails.cardNumber);

    const cvvCode = page.locator(
        "//div[contains(text(), 'CVV Code')]/../input"
    );
    await cvvCode.fill(cardDetails.CVV);

    const cardOnName = page.locator(
        "//div[contains(text(), 'Name on Card')]/../input"
    );
    await cardOnName.fill(cardDetails.cardName);

    //select country
    const country = page.getByPlaceholder("Select Country");
    await country.pressSequentially("Ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();

    //Apply coupon
    const couponField = page.locator("input[name='coupon']");
    await couponField.fill(cardDetails.coupon);

    const applyCouponBtn = page.locator("button[type='submit']");
    await applyCouponBtn.click();

    await expect(page.locator(".mt-1.ng-star-inserted")).toContainText(
        "* Coupon Applied"
    );

    //Confirm Order
    const confirmBtn = page.getByText("Place Order");

    await confirmBtn.click();

    // Validate order was created

    let orderId = await page.locator("label.ng-star-inserted").textContent();
    orderId = orderId.split(" ").at(2).trim();

    expect(orderId).toBeTruthy();

    await expect(page.locator(".hero-primary")).toHaveText(
        "Thankyou for the order."
    );

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
