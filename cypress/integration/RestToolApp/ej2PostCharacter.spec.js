// =======================================================================================================================
// Ejercicio 2
// Realizar un POST al endpoint de character creando un nuevo registro con los datos necesarios. 
// Validar la creación del registro desde el front
// =======================================================================================================================
describe('Ej 2 Crear personaje y verificar su existencia en el fornt', () => {
    it('Create a new character', () => {
        const uniqueSeed = Date.now().toString();
        let newIsAlive = true;
        let newLocation = "Winterfell"
        let newName = "Gust"
        let newRealName = "Gustavo Apaza"
        let thumbnail = "Aca va una imagen"
        cy.request({
            method: 'POST',
            url: 'https://restool-sample-app.herokuapp.com/api/character',
            form: true,
            body:{
                isAlive: newIsAlive,
                location: newLocation,
                name: newName + uniqueSeed,
                realName: newRealName,
                thumbnail: thumbnail
            }
        }).then(async (response) => {
            await expect(response.status).to.eq(200);
            cy.viewport(1440, 860)
            cy.visit('https://dsternlicht.github.io/RESTool/#/characters?search=');
            cy.log('Name created: ' + response.body.name);
            cy.wait (2000);
            cy.scrollTo('bottom');
            cy.wait (2000);
            cy.scrollTo('bottom');
            cy.wait (2000);
            cy.scrollTo('bottom');
            cy.get('div.card>div:nth-child(3)>span').should('have.length.greaterThan', 8);
            cy.get('div>div:nth-child(3)>span').each(($el, index, $list) => {
                let pjCreated = false;
                //cy.log($el.text());
                if ($el.text() == response.body.name) {
                    pjCreated = true;
                    assert.isTrue(pjCreated, 'Verify new element created in the frontend');
                    return;
                }
            }).then(($list) => {
                expect($list).to.have.length.greaterThan(1);
            })
            cy.request({
                method: 'DELETE',
                url: 'https://restool-sample-app.herokuapp.com/api/character/' + response.body.id
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
            cy.wait (2000);
            cy.reload();
        })
    })
})