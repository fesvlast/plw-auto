import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import data from "./../data/placeOrderTestData.json" with { "type": "json" }
import { customTest } from "../data/test-base";


for(const placeOrderData of data ){
    test(`@Web Browser Context Playwright Test- ${placeOrderData.orderData.productName}`, async ({ page }) => {
        let orderId;
    
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(placeOrderData.email, placeOrderData.password);
    
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addProductToCart(placeOrderData.orderData.productName);
        await dashboardPage.validateNumberOfAddedProductToCart(placeOrderData.orderData.numberOfAddedItems);
    
        const cartPage = await dashboardPage.navigateToCartPage();
        await cartPage.verifyThatProductIsInCart(placeOrderData.orderData);
    
        const paymentPage = await cartPage.navigateToPaymentPage();
        await paymentPage.verifyThePaymentPageLoadedForCurrentUser(placeOrderData.email);
        await paymentPage.fillTheAllPaymentDetails(placeOrderData.cardDetails);
    
        const thankYouPage =
            await paymentPage.confirmOrderAndNavigateToThankYouPage();
        orderId = await thankYouPage.verifyTheOrderAndGetTheOrderId();
    
        const ordersPage = await thankYouPage.navigateToOrdersPage();
        await ordersPage.validateThatOrderIdFound(orderId);
    });
}

customTest(`Browser Context Playwright Test with `, async ({ page, testDataForOrder }) => {
    let orderId;

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.addProductToCart(testDataForOrder.orderData.productName);
    await dashboardPage.validateNumberOfAddedProductToCart(testDataForOrder.orderData.numberOfAddedItems);

    const cartPage = await dashboardPage.navigateToCartPage();
    await cartPage.verifyThatProductIsInCart(testDataForOrder.orderData);

    const paymentPage = await cartPage.navigateToPaymentPage();
    await paymentPage.verifyThePaymentPageLoadedForCurrentUser(testDataForOrder.email);
    await paymentPage.fillTheAllPaymentDetails(testDataForOrder.cardDetails);

    const thankYouPage =
        await paymentPage.confirmOrderAndNavigateToThankYouPage();
    orderId = await thankYouPage.verifyTheOrderAndGetTheOrderId();

    const ordersPage = await thankYouPage.navigateToOrdersPage();
    await ordersPage.validateThatOrderIdFound(orderId);
});

