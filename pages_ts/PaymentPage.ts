import { expect, Locator, Page } from "@playwright/test";
import ThankYouPage from "./ThankYouPage";

export default class PaymentPage {
    page: Page;
    cardNumber: Locator;
    cvvCode: Locator;
    cardOwner: Locator;
    country: Locator;
    dropDown: Locator;
    couponField: Locator;
    applyCouponBtn: Locator;
    confirmBtn: Locator;

    constructor(page) {
        this.page = page;
        this.cardNumber = page.locator(
            "//div[contains(text(), 'Credit Card Number ')]/../input"
        );
        this.cvvCode = page.locator(
            "//div[contains(text(), 'CVV Code')]/../input"
        );
        this.cardOwner = page.locator(
            "//div[contains(text(), 'Name on Card')]/../input"
        );
        //select country
        this.country = page.locator("//input[@placeholder='Select Country']");
        this.dropDown = page.locator(".ta-results");

        //Coupon
        this.couponField = page.locator("input[name='coupon']");
        this.applyCouponBtn = page.locator("button[type='submit']");

        this.confirmBtn = page.locator(
            "//a[@class='btnn action__submit ng-star-inserted']"
        );
    }

    async verifyThePaymentPageLoadedForCurrentUser(email) {
        await expect(
            this.page.locator(".payment__types").first()
        ).toContainText("Credit Card");
        await expect(this.page.locator(".user__name label")).toContainText(
            email
        );
    }

    async fillTheAllPaymentDetails(paymentDetails) {
        await this.cardNumber.fill(paymentDetails.cardNumber);
        await this.cvvCode.fill(paymentDetails.CVV);
        await this.cardOwner.fill(paymentDetails.cardName);
        await this.country.pressSequentially(
            paymentDetails.country.substring(0, 3)
        );
        await this.dropDown.waitFor();
        let optionsCount = await this.dropDown.locator("button").count();

        for (let i = 0; i < optionsCount; i++) {
            const text: any = await this.dropDown
                .locator("button")
                .nth(i)
                .textContent();
            if (text.trim() === paymentDetails.country) {
                await this.dropDown.locator("button").nth(i).click();
                break;
            }
        }

        //Apply coupon
        await this.couponField.fill(paymentDetails.coupon);
        await this.applyCouponBtn.click();
        await expect(this.page.locator(".mt-1.ng-star-inserted")).toContainText(
            "* Coupon Applied"
        );
    }

    async confirmOrderAndNavigateToThankYouPage() {
        //Confirm Order
        await this.confirmBtn.click();
        return new ThankYouPage(this.page);
    }
}
