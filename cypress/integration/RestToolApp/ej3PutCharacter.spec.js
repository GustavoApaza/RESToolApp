// =======================================================================================================================
// Ejercicio 3
// Realizar un PUT editando uno de los characters creados. 
// Validar la edición realizada en el front
// =======================================================================================================================
describe('Ej 3 Modificar personaje y verificar su edicion en el forntend', () => {
    it('Create a new character', () => {
        let newIsAlive = true;
        let newLocation = "Winterfell";
        let newName = "Gust";
        let newRealName = "Gustavo Apaza";
        let thumbnail = "Aca va una imagen";
        cy.request({
            method: 'POST',
            url: 'https://restool-sample-app.herokuapp.com/api/character',
            form: true,
            body:{
                isAlive: newIsAlive,
                location: newLocation,
                name: newName,
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
            cy.wait (5000);
            cy.scrollTo('bottom');
            const uniqueSeed = Date.now().toString();
            cy.request({
                method: 'PUT',
                url: 'https://restool-sample-app.herokuapp.com/api/character/' + response.body.id,
                form: true,
                body:{
                    isAlive: newIsAlive,
                    location: newLocation,
                    name: newName + uniqueSeed,
                    realName: newRealName,
                    thumbnail: thumbnail
                }
            }).then(async (response) =>{
                await expect(response.status).to.eq(200);
                cy.reload();
                cy.visit('https://dsternlicht.github.io/RESTool/#/characters?search=');
                cy.log('Name created: ' + response.body.name);//?????????????
                cy.wait (2000);
                cy.scrollTo('bottom');
                cy.wait (2000);
                cy.scrollTo('bottom');
                cy.wait (2000);
                cy.scrollTo('bottom');
                cy.wait (5000);
                cy.scrollTo('bottom');
                cy.get('div.card>div:nth-child(3)>span').should('have.length.greaterThan', 8);
                cy.get('div>div:nth-child(3)>span').each(($el, index, $list) => {
                    let characterModified = false;
                    //cy.log($el.text());
                    if ($el.text() == response.body.name) {
                        characterModified = true;
                        assert.isTrue(characterModified, 'New character modified');
                        return;
                    }
                }).then(($list) => {
                    expect($list).to.have.length.greaterThan(1);
                })
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