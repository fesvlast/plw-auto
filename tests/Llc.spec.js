import { expect, test } from "@playwright/test";

test("Playwright Special locators", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").check();

    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").pressSequentially("abc123");

    await page.getByRole("button", { name: "Submit" }).click();

    const successMessage = await page
        .getByText("Success! The Form has been submitted successfully!.")
        .isVisible();

    expect(successMessage).toBeTruthy();

    await page.getByRole("link", { name: "Shop" }).click();

    await page
        .locator("app-card")
        .filter({ hasText: "Nokia Edge" })
        .getByRole("button")
        .click();
});
