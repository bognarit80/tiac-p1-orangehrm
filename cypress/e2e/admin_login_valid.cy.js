const { onLoginPage } = require("../support/page_objects/login_page")

describe('login', () => {
  var testdata;
  before('setup fixture', () => {
    cy.fixture('testdata').then((testdataValues) => {
      testdata = testdataValues;
    })
  })

  beforeEach('open application', () => {
    //otvaranje browsera
    cy.visit(testdata.url)
    //verifikacija URL-a, zbog redirecta
    cy.url().should('eq', testdata.url + testdata.endpoints.login)
  })

  // after('logout', () => {
  //   cy.visit(testdata.url + testdata.logout_page)
  //   cy.url().should('eq', testdata.url + testdata.endpoints.logout)
  // })

  it('admin_login_valid', () => {
    cy.get('input[name=username]').clear().type(testdata.credentials.admin_username)
    cy.get('input[name=password]').type(testdata.credentials.admin_password)

    cy.get('button[type=submit]').click()

    cy.url().should('contain', 'dashboard')
    cy.get('.oxd-brand-banner').find('img').should('be.visible')
  })

  it('admin_login_invalid', () => {
    cy.get('input[name=username]').clear().type('Invalid')
    cy.get('input[name=password]').type('invalid')

    cy.get('button[type=submit]').click()

    //have.text vs contain
    cy.get('.oxd-alert-content-text').should('have.text', testdata.invalid_cred_txt)
  })
})
