import { test, expect } from "@playwright/test";

test("Calendar validations", async ({ page }) => {
    const monthNumber = "6";
    const day = "15";
    const year = "2027";

    const expectedList = [monthNumber, day, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    const calendar = page.locator(".react-date-picker__inputGroup");
    await calendar.click();

    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(year).click();

    await page
        .locator(".react-calendar__year-view__months__month")
        .nth(Number(monthNumber) - 1)
        .click();

    await page.locator(`//abbr[text() = '${day}']`).click();

    const inputs = await page.locator(".react-date-picker__inputGroup input");

    for (let index = 0; index < inputs.length; index++) {
        const value = await inputs[index].getAttribute("value");
        console.log(value);
        expect(value).toEqual(expectedList[index]);
    }
});
