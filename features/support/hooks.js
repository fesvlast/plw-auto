import {
    After,
    AfterStep,
    Before,
    BeforeStep,
    Status,
} from "@cucumber/cucumber";
import playwright from "@playwright/test";
import POManager from "../../pages/POManager.js";

Before({ tags: "@Validation or @Regression" }, async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

BeforeStep(async () => {});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: "cucumber-screen.png" });
    }
});

After(async function () {
    console.log("I am the last to execute!");
});
