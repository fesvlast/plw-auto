Feature: Ecommerce validations

   @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "fesvlast@gmail.com" and "Testing123"
        When Add "IPHONE 13 PRO" to Cart
        Then Verify "IPHONE 13 PRO" is displayed in the Cart
        When Enter valid details and Place the order
        Then Verify order is present in the OrderHistory


    @Validation
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            |username             | password   |  
            | fesvlast@gmail.com  | Testing123 |
            | test123@gmail.com   | password   |