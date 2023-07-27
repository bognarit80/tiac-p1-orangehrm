class LoginPage {
    // Element locators
    USERNAME = "input[name=username]";
    PASSWORD = "input[name=password]";
    SUBMIT = "button[type=submit]";
    TITLE = ".oxd-topbar-header-breadcrumb-module";
    // Element locator functions
  
    // Methods
    openApp() {
      return cy.visit("/");
    }
  
    enterUsername(username) {
      return cy.get(this.USERNAME).type(username);
    }
  
    enterPassword(pass) {
      return cy.get(this.PASSWORD).type(pass);
    }
  
    enterSubmitButton() {
      return cy.get(this.SUBMIT).click();
    }
  
    verifyTitle() {
      return cy.get(this.TITLE);
    }
  }
  
  export default LoginPage;