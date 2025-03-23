// @ts-check
import { defineConfig } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: "./tests",
    timeout: 60 * 1000,
    retries: 2,
    expect: {
        timeout: 5 * 1000,
    },
    reporter: "html",
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on",
        browserName: "chromium",
        headless: true,
        screenshot: "on",
    },
});
