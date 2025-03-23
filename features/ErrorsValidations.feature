Feature: Ecommerce validations

    @Validation
    @Foo
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            |username             | password   |  
            | fesvlast@gmail.com  | Testing123 |
            | test123@gmail.com   | password   |