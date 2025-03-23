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

let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");

    const email = page.locator("#userEmail");
    await email.fill("fesvlast@gmail.com");

    const password = page.locator("#userPassword");
    await password.fill("Testing123");

    const signInBtn = page.locator("#login");
    await signInBtn.click();

    await page.waitForLoadState("networkidle");

    await context.storageState({ path: "state.json" });

    webContext = await browser.newContext({ storageState: "state.json" });
});

test("Browser Context Playwright Test", async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const titlesElements = page.locator(".card-body b");
    await titlesElements.first().waitFor();
    const titles = await titlesElements.allTextContents();

    const productNum = titles.indexOf(orderData.product);

    const addToCardBtns = page.locator(
        "//button[contains(text(), 'Add To Cart')]"
    );

    await addToCardBtns.nth(productNum).waitFor();

    await addToCardBtns.nth(productNum).click();

    const numberOfAddedItems = await page.locator(
        "button[class='btn btn-custom'] label"
    );

    await expect(numberOfAddedItems).toContainText("1");

    const cartBtn = page.locator(
        ".btn.btn-custom[routerlink='/dashboard/cart']"
    );
    await cartBtn.click();

    //Validate added to card item
    await expect(page.locator(".cartSection h3")).toContainText(
        orderData.product
    );

    await expect(page.locator("//p[contains(text(), 'MRP')]")).toContainText(
        orderData.itemPrice
    );
    await expect(page.locator(".stockStatus")).toContainText(orderData.status);
    await expect(page.locator(".totalRow span").last()).toContainText(
        orderData.totalPrice
    );

    const productId = await page.locator(".itemNumber").textContent();

    const checkoutBtn = page.locator(
        "li[class='totalRow'] button[type='button']"
    );
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
    const country = page.locator("//input[@placeholder='Select Country']");
    //await country.fill("");
    await country.pressSequentially("Ind");
    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor();

    const optionsCount = await dropDown.locator("button").count();

    for (let i = 0; i < optionsCount; i++) {
        const text = await dropDown.locator("button").nth(i).textContent();
        if (text.trim() === cardDetails.country) {
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }

    //await expect(country).toHaveText(cardDetails.country);

    //Apply coupon
    const couponField = page.locator("input[name='coupon']");
    await couponField.fill(cardDetails.coupon);

    const applyCouponBtn = page.locator("button[type='submit']");
    await applyCouponBtn.click();

    await expect(page.locator(".mt-1.ng-star-inserted")).toContainText(
        "* Coupon Applied"
    );

    //Confirm Order
    const confirmBtn = page.locator(
        "//a[@class='btnn action__submit ng-star-inserted']"
    );

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

    await page.pause();
});
