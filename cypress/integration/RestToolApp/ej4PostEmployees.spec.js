// =======================================================================================================================
// Ejercicio 2
// Realizar un POST al endpoint de character creando un nuevo registro con los datos necesarios. 
// Validar la creación del registro desde el front
// =======================================================================================================================
describe('Ej 2 Crear personaje y verificar su existencia en el fornt', () => {
    it('Create a new character', () => {
        let newIsAlive = true;
        let newLocation = "Winterfell";
        let newName = "Gust";
        let newRealName = "Gustavo Apaza";
        let thumbnail = "Aca va una imagen";
        const uniqueSeed = Date.now().toString();
        cy.request({
            method: 'POST',
            url: 'https://restool-sample-app.herokuapp.com/api/employee',
            form: true,
            body:{
                isFired: false,
                jobTitle: "Tester",
                name: "Gus" + uniqueSeed
            }
        }).then(async (response) => {
            await expect(response.status).to.eq(200);
            cy.viewport(1440, 860)
            cy.visit('https://dsternlicht.github.io/RESTool/#/employees?search=&page=1&limit=20');
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
                expect(response.status).to.eq(200)
            })
            cy.wait (2000);
            cy.reload();
        })
    })
})