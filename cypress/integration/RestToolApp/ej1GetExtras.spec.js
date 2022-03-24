// =======================================================================================================================
// Ejercicio 1
// Realizar un GET al endpointde extras y verificar la existencia de los mismos registros tanto en el back como en el front.
// =======================================================================================================================
describe('Ejercicio 1 - Test de extras con GET', () =>  {
    //var arrayBackend = [];
    it('Test con GET a extras', () => {
        var arrayBackend =
            cy.request({
                method: 'GET',
                url: 'https://restool-sample-app.herokuapp.com/api/extra',
                form: true
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.items.name).to.not.be.null;
                cy.log(JSON.stringify(response.body.items))
                return response.body.items.id;
            })
        cy.visit('https://dsternlicht.github.io/RESTool/#/extras');
        cy.log(JSON.stringify(arrayBackend.items.id))
    })
})