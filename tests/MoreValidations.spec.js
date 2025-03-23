import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("@Web Popup validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    //Visibility check
    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#hide-textbox").click();

    await expect(page.locator("#displayed-text")).toBeHidden();

    //Dialogs alerts actions
    page.on("dialog", (dialog) => dialog.dismiss());
    await page.locator("#confirmbtn").click();

    //Mouse hover
    await page.locator("#mousehover").hover();

    //IFrames

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    const textCheck = await framePage.locator(".text h2").textContent();
    const checkNumber = textCheck.split(" ").at(1);
    console.log(checkNumber);
});

test("Screenshot & visual comparison ", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page
        .locator("#displayed-text")
        .screenshot({ path: "./screens/partialScreenshot.png" });

    await page.locator("#hide-textbox").click();

    await page.screenshot({ path: "./screens/screenshot.png" });

    await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Visual test", async ({ page }) => {
    await page.goto("https://www.rediff.com/");
    expect(await page.screenshot()).toMatchSnapshot("../screens/landing.png");
});
