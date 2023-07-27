const { onLoginPage } = require("../support/page_objects/login_page")

describe('add employee', () => {
    let testdata;
    var userid;
  
    before('open application', () => {
      cy.openApp()
      cy.fixture("testdata").then((data) => {
        testdata = data
      })
    })
    it('add employee', () => {
      onLoginPage.login_admin()

      cy.get('a').contains('PIM').click()
      cy.get('button').contains('Add').click()
      cy.get('input[name=firstName]').type('Ime')
      cy.get('input[name=lastName]').type('Prezime')
      cy.get('.oxd-grid-2').find('input').invoke('val').as('value')
      cy.get('@value').then(($userid) => {
        userid = $userid
        console.log(userid)
      })
      cy.get('button[type=submit]').click()
      cy.get('a').contains('Employee List').click()
      cy.get('label').contains('Employee Id').parent().parent().find('input').type('0314') //bugbug
      cy.get('button[type=submit]').click()
      cy.intercept('GET', testdata.endpoints.employee_search)
      cy.get('.oxd-table-card').find('button').click()
      cy.get('.oxd-button--medium oxd-button--label-danger').click() //instead intercept the GET employees list
    })
  })