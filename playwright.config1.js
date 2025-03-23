// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: "./tests",
    timeout: 30 * 1000,
    retries: 1,
    workers: 3,
    expect: {
        timeout: 5 * 1000,
    },
    reporter: "html",

    projects: [
        {
            name: "safari",
            use: {
                /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
                trace: "retain-on-failure",
                browserName: "webkit",
                headless: false,
                screenshot: "on",
                ignoreHTTPSErrors: true,
                permissions: ["geolocation"],
                ...devices["iPhone 15 Pro Max"],
            },
        },
        {
            name: "chrome",
            use: {
                /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
                trace: "retain-on-failure",
                browserName: "chromium",
                headless: false,
                screenshot: "off",
                video: "retain-on-failure",
                viewport: {
                    width: 720,
                    height: 720,
                },
            },
        },
    ],
});
