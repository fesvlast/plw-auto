import { test, expect } from "@playwright/test";

test("Browser Context Playwright Test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.route("**/*.{jpg, png, jpeg}", (route) => {
        route.abort();
    });

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    page.on("request", (request) => {
        console.log(request.url());
    });

    page.on("response", (response) => {
        console.log(response.url(), response.status());
    });

    const userName = page.locator("#username");
    await userName.fill("rahulshetty");

    const password = page.locator("#password");
    await password.fill("learning");

    const signInBtn = page.locator("#signInBtn");

    await signInBtn.click();

    let errorMessageElement = page.locator("[style*='block']");

    let errorMessage = await errorMessageElement.textContent();
    expect(errorMessage).toContain("Incorrect username/password.");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");

    await password.fill("");
    await password.fill("learning");

    await signInBtn.click();
    await page.waitForNavigation({ waitUntil: "load" });

    const productTitles = page.locator(".card-title a");
    await expect(productTitles.first()).toBeVisible();

    const allProductTitles = await productTitles.allTextContents();
});
