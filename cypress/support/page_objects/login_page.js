export class LoginPage {

    login_admin() {
        cy.fixture("testdata").then((data) => {
            const testdata = data;
            // cy.intercept('POST', testdata.endpoints.login).as('postLogin')

            cy.get('input[name=username]').clear().type(testdata.credentials.admin_username)
            cy.get('input[name=password]').type(testdata.credentials.admin_password)
            cy.get('button[type=submit]').click()

            // cy.wait('@postLogin').then(xhr => {
            //     expect(xhr.response.statusCode).to.equal(200)
            // })
        })
    }
}

export const onLoginPage = new LoginPage()