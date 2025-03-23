import { expect, test } from "@playwright/test";
import processXlsx from "../utils/processExcel";

test("Upload/Download Excel file", async ({ page }) => {
    const updateValue = "1000";
    const textSearch = "Mango";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");

    const downloadPromise = page.waitForEvent("download");
    const downloadBtn = page.getByRole("button", { name: "Download" });

    await downloadBtn.click();

    const download = await downloadPromise;
    await download.saveAs(
        "/Users/tymvlasov/Downloads/" + download.suggestedFilename()
    );

    page.on("dialog", (dialog) => dialog.accept());

    // await page.waitForTimeout(3000);
    //await page.pause();
    await processXlsx(
        textSearch,
        updateValue,
        { rowCHange: 0, colChange: 2 },
        "/Users/tymvlasov/Downloads/download.xlsx"
    );

    const uploadBtn = page.locator("#fileinput");
    //await uploadBtn.click();
    await uploadBtn.setInputFiles("/Users/tymvlasov/Downloads/download.xlsx");

    const textLocator = page.getByText(textSearch);

    const foundRow = await page.getByRole("row").filter({ has: textLocator });

    await expect(foundRow.locator("#cell-4-undefined")).toContainText(
        updateValue
    );
});
