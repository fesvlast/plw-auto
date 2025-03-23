import { expect, test } from "@playwright/test";

test("Browser Context Playwright Test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title = await page.title();
    console.log(title);

    const userName = page.locator("#username");
    await userName.fill("rahulshetty");

    const password = page.locator("#password");
    await password.fill("learning");

    const signInBtn = page.locator("#signInBtn");
    await signInBtn.click();

    let errorMessageElement = page.locator("[style*='block']");

    let errorMessage = await errorMessageElement.textContent();
    console.log(errorMessage);
    expect(errorMessage).toContain("Incorrect username/password.");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");

    await password.fill("");
    await password.fill("learning");

    await signInBtn.click();

    const productTitles = page.locator(".card-title a");
    await expect(productTitles.first()).toBeVisible();

    const allProductTitles = await productTitles.allTextContents();
});

test("UI controls", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const password = page.locator("#password");
    const dropDown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");

    await dropDown.selectOption("consult");

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());

    const checkBox = page.locator("#terms");
    await checkBox.check();

    await expect(checkBox).toBeChecked();
    expect(await checkBox.isChecked()).toBeTruthy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("@Web Child windows handling", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator("#username");

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        documentLink.click(),
    ]);

    // await documentLink.click();
    //const page2 = await context.waitForEvent("page");

    const text = await newPage.locator(".red").textContent();

    const arrayText = text.split("@");
    const domain = arrayText.at(1).split(" ").at(0);
    console.log(domain);
    await newPage.close();

    await userName.type(domain);

    console.log(await userName.textContent());
});
