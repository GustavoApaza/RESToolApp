describe('', () => {
    before(() => {
        cy.visit('http://automationpractice.com/index.php');
    })
    it('Test the title of the page main', () => {
        cy.title().should('eq', 'My Store');
    })
    context('Test sign in', () => {
        it('Test title of the page Authentication', () => {
            cy.get('.login').click();
            cy.get('.page-heading').should('contain', 'Authentication');
        })
        it('Test enter page of create account', () => {
            cy.get('#email_create').type('ana8@email.com').should('have.value', 'ana8@email.com');
            cy.get('#SubmitCreate > span').click();
        })
        context('Test form of Your personal information', () => {
            it('Test of checkbox "Mr"', () => {
                cy.wait(4000);
                cy.get('#id_gender1').check().should('be.checked');
            })
            it('Test of checkbox "Mrs"', () => {
                cy.get('#id_gender2').check().should('be.checked');
            })
            it('Enter the first name', () => {
                cy.get('#customer_firstname').type('Ana').should('have.value', 'Ana');
            })
            it('Enter the last name', () => {
                cy.get('#customer_lastname').type('Gomez').should('have.value', 'Gomez');
            })
            it('Enter the password', () => {
                cy.get('#passwd').type('12345').should('have.value', '12345');
            })
            it('Select a day', () => {
                cy.get('#days').select('4').should('have.value', '4');
            })
            it('Select a month', () => {
                cy.get('#months').select('May').should('have.value', '5');
            })
            it('Select a year', () => {
                cy.get('#years').select('2000').should('have.value', '2000');
            })
            it('Check "Sign up for our newsletter!"', () => {
                cy.get('#newsletter').click().should('be.checked');
            })
            it('Check "Receive special offers from our partners!"', () => {
                cy.get('#optin').click().should('be.checked');
            })
        })
        context('Test form "Your Address', () => {
            it('Verify the first name', () => {
                cy.get('#firstname').should('have.value', 'Ana');
            })
            it('Verify the last name', () => {
                cy.get('#lastname').should('have.value', 'Gomez');
            })
            it('Enter a company', () => {
                cy.get('#company').type('Endava').should('have.value', 'Endava');
            })
            it('Enter Address', () => {
                cy.get('#address1').type('Della Paolera 200').should('have.value', 'Della Paolera 200');
            })
            it('Enter Address (Line 2)', () => {
                cy.get('#address2').type('sixth floor').should('have.value', 'sixth floor');
            })
            it('Enter City', () => {
                cy.get('#city').type('Buenos Aires').should('have.value', 'Buenos Aires');
            })
            it('Select State', () => {
                cy.get('#id_state').select('Texas').should('have.value', '43');
            })
            it('Enter Postal Code', () => {
                cy.get('#postcode').type('12407').should('have.value', '12407');
            })
            it('Select Country', () => {
                cy.get('#id_country').select('United States').should('have.value', '21');
            })
            it('Enter Additional Information', () => {
                cy.get('#other').type('too floor 7th').should('have.value', 'too floor 7th');
            })
            it('Enter Home Phone', () => {
                cy.get('#phone').type('12345678').should('have.value', '12345678');
            })
            it('Enter Mobile Phone', () => {
                cy.get('#phone_mobile').type('1134567890').should('have.value', '1134567890');
            })
            it('Enter "Assign an address alias for future reference"', () => {
                cy.get('#alias').clear().type('Av Eduardo Madero 1150').should('have.value', 'Av Eduardo Madero 1150');
            })
            // it('Enter page "My Account"', () => {
            //     cy.get('#submitAccount > span').click();
            //     cy.get('.account > span').should('contain', 'Ana Gomez');
            //     cy.get('.page-heading').should('contain', 'My account');
            // })
        })
    })
})