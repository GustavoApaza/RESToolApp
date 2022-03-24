// =======================================================================================================================
// Ejercicio 4
// Realizar un POST al endpoint de employees y validar su creación en el front.
// =======================================================================================================================
describe('Ej 4 Crear un nuevo empleado y verificar su existencia en el fornt', () => {
    it('Create a new character', () => {
        let newIsFired = false;
        let newJobTitle = 'Tester';
        let newName = "Gus";
        const uniqueSeed = Date.now().toString();
        cy.request({
            method: 'POST',
            url: 'https://restool-sample-app.herokuapp.com/api/employee',
            form: true,
            body:{
                isFired: newIsFired,
                jobTitle: newJobTitle,
                name: newName + uniqueSeed
            }
        }).then(async (response) => {
            await expect(response.status).to.eq(200);
            cy.viewport(1440, 860);
            cy.visit('https://dsternlicht.github.io/RESTool/#/employees?search=&page=1&limit=20');
            cy.log('Is fired: ' + response.body.isFired); //Aca hay un bug?????????????????????????????
            cy.log('Job title: ' + response.body.jobTitle);
            cy.log('Name created: ' + response.body.name);
            cy.wait (2000);
            cy.scrollTo('bottom');
            cy.wait (5000);
            cy.get('table>tbody>tr>td:nth-child(2)>span').should('have.length.greaterThan', 9);
            cy.get('table>tbody>tr>td:nth-child(2)>span').each(($el, index, $list) => {
                let employeeCreated = false;
                //cy.log($el.text());
                if ($el.text() == response.body.name) {
                    employeeCreated = true;
                    assert.isTrue(employeeCreated, 'Verify new element created in the frontend');
                    return;
                }
            }).then(($list) => {
                expect($list).to.have.length.greaterThan(1);
            })
            cy.request({
                method: 'DELETE',
                url: 'https://restool-sample-app.herokuapp.com/api/employee/' + response.body.id
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
            cy.reload();
        })
    })
})