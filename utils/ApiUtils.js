import { expect } from "@playwright/test";
class ApiUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const apiURL = "https://rahulshettyacademy.com/api/ecom/auth/login";

        const loginResponse = await this.apiContext.post(apiURL, {
            data: this.loginPayload,
        });

        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    }

    async createOrder(payload) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: payload,
                headers: {
                    Authorization: response.token,
                    "Content-Type": "application/json",
                },
            }
        );

        const orderResponseJson = await orderResponse.json();

        response.orderId = orderResponseJson.orders[0];

        return response;
    }
}

export default ApiUtils;
