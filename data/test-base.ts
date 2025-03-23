import { test as base } from "@playwright/test";

interface TestDataForOrder {
    email: string;
    password: string;
    orderData: {
        productName: string;
        numberOfAddedItems: string;
        itemPrice: string;
        status: string;
        totalPrice: string;
    };
    cardDetails: {
        email: string;
        cardNumber: string;
        expireMonth: string;
        expireYear: string;
        coupon: string;
        country: string;
        CVV: string;
        cardName: string;
    };
}

export const customTest = base.extend<{ testDataForOrder: TestDataForOrder }>({
    testDataForOrder: {
        email: "fesvlast@gmail.com",
        password: "Testing123",
        orderData: {
            productName: "IPHONE 13 PRO",
            numberOfAddedItems: "1",
            itemPrice: "231500",
            status: "In Stock",
            totalPrice: "231500",
        },
        cardDetails: {
            email: "fesvlast@gmail.com",
            cardNumber: "4542 9931 9292 2294",
            CVV: "345",
            cardName: "Test card",
            expireMonth: "01",
            expireYear: "2026",
            coupon: "rahulshettyacademy",
            country: "India",
        },
    },
});
