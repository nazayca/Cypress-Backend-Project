import { postRequestBody, putRequestBody } from "../../fixtures/testData.json"

describe('CRUD Operations', () => {
    // after(() => {
    //     cy.request({
    //         method: 'DELETE',
    //         url: 'https://tech-global-training.com/students/deleteAll',
    //     })
    // })
    let studentId;

    it('Create a new user', () => {
        cy.request({
            method: 'POST',
            url: Cypress.env('baseUrl'),
            body: postRequestBody,
        }).then(response => {
            studentId = response.body.id
            console.log(JSON.stringify(response.body, null, 2))

            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(400)

            Object.entries(postRequestBody).forEach(([key, value]) => {
                expect(response.body[key]).to.equal(value)
            })
        })
    })


    it('Retrieve a specific user-created', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
            body: postRequestBody,
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(400)

            cy.validateResponse(response, postRequestBody)
        })
    })


    it('Update an existing user', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
            body: putRequestBody,
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(400)

            cy.validateResponse(response, putRequestBody)
        })
    })


    it('Retrieve a specific user created to confirm the update', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(400)

         cy.validateResponse(response, putRequestBody)
         
        })
    })

    it('Delete the the student using DELETE', () => {

        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseUrl')}/${studentId}`,
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            expect(response.body.id).to.equal(undefined)
        })
    })
})