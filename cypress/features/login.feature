Feature: Login Page Functionality
  As a user
  I want to log in to the website
  So that I can access my account and use the application

Scenario: Verify Login
    Given I am on the login page
    When I enter valid username "Admin"
    And I enter valid password "admin123"
    And I click on the submit button
    Then Verify that user is login in application