import { When, Then, Given } from "@cucumber/cucumber";

import data from "../../data/placeOrderTestData.json"  with { "type": "json" }
import { expect } from "@playwright/test";

const placeOrderData = data[0];

Given(
    "a login to Ecommerce application with {string} and {string}", {timeout: 10* 1000},
    async function (userName, password) {
       const loginPage = this.poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(
            userName,
            password
        );
    }
);

When("Add {string} to Cart", async function (productName) {
     const dashboardPage = this.poManager.getDashBoardPage();
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.validateNumberOfAddedProductToCart("1");
    await dashboardPage.navigateToCartPage();
});

Then("Verify {string} is displayed in the Cart",{timeout: 10* 1000}, async function (productName) {
    placeOrderData.orderData.productName = productName;
    this.cartPage = this.poManager.getMyCartPage();
    await this.cartPage.verifyThatProductIsInCart(placeOrderData.orderData);
});

When("Enter valid details and Place the order",{timeout: 10* 1000}, async function () {
    this.paymentPage = await this.cartPage.navigateToPaymentPage();
    await this.paymentPage.verifyThePaymentPageLoadedForCurrentUser(placeOrderData.email);
    await this.paymentPage.fillTheAllPaymentDetails(placeOrderData.cardDetails);

    this.thankYouPage =
        await this.paymentPage.confirmOrderAndNavigateToThankYouPage();
    this.orderId = await this.thankYouPage.verifyTheOrderAndGetTheOrderId();
});

Then("Verify order is present in the OrderHistory", async function () {
    const ordersPage = await this.thankYouPage.navigateToOrdersPage();
        await ordersPage.validateThatOrderIdFound(this.orderId);
});



  Given('a login to Ecommerce2 application with {string} and {string}',async function (name, psw) {

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title = await this.page.title();

    const userName = this.page.locator("#username");
    await userName.fill(name);

    const password = this.page.locator("#password");
    await password.fill(psw);

    const signInBtn = this.page.locator("#signInBtn");
    await signInBtn.click();

  });

  Then('Verify Error message is displayed', async function () {
    
    let errorMessageElement = this.page.locator("[style*='block']");

    let errorMessage = await errorMessageElement.textContent();
    expect(errorMessage).toContain("Incorrect username/password.");
  });
