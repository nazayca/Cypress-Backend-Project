const BackendPage = require("../../../pages/BackendPage");


  describe('APIConnection', () => {
    const backendPage = new BackendPage()
    before(function() {
        cy.visit('backend')

        backendPage.getDeleteAllButton().click()
    })
    beforeEach(function() {
        cy.visit('backend')
        cy.fixture('user').then(function(data) {
          this.firstName = data.firstName
          this.lastName = data.lastName
          this.email = data.email
          this.dob = data.dob
          this.updatedEmail = data.updatedEmail
        })
})


it('runs a query', () => {

    cy.task('runQuery', 'SELECT * FROM student').then((rows) => {
      expect(rows).to.have.length(2)

      // cy.wrap(rows).should('have.length', 2)

      // console.log(JSON.stringify(rows, null, 2))
    })
  })
  })
