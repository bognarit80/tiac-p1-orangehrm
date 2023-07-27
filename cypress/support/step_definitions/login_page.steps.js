// Imports
const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");

import loginPage from "./../pages/login_page.js";

// Variables
const login = new loginPage();

//Given methods (Actions) - In which state app should be
Given(/^I am on the login page$/, function () {
  login.openApp();
});

Given(/^I enter valid username "(.*)"$/, function (username) {
  login.enterUsername(username);
});

Given(/^I enter valid password "(.*)"$/, function (password) {
  login.enterPassword(password);
});

Given(/^I click on the submit button$/, function () {
  login.enterSubmitButton();
});

//THEN methods (Assertions)
Then(/^Verify that user is login in application$/, function () {
  login.verifyTitle().should("contain", "Dashboard");
});