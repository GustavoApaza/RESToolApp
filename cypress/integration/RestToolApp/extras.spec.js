describe('Test page Extras of RESTool App', () => {
    it('Test GET character extras', () => {
        var arrayBackend =
            cy.request({
                method: 'GET',
                url: 'https://restool-sample-app.herokuapp.com/api/extra',
                form: true
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.items.name).to.not.be.null;
                return response.body.items.id;
            });

        cy.visit("https://dsternlicht.github.io/RESTool/#/extras")
        let arrayFrontend = []
        cy.get(".pure-table>tbody>tr>td:nth-child(1)>span").should('have.length.greaterThan', 4);
        cy.get(".pure-table>tbody>tr>td:nth-child(1)>span").each(($el, index, $list) => {//en $el guarda la ID del objeto 
            cy.wrap($el).then((val) => {
                //arrayFrontend.push(val.text());
                expect(arrayBackend).include(val.text);
            })
        }).then(($list) => {
            expect($list).to.have.length.of.at.least(1);
        })
    })
//=====================================================================================================
    it('Test POST character extras', () => {
        cy.request({
            method: 'POST',
            url: 'https://restool-sample-app.herokuapp.com/api/extra',
            form: true,
            body:{
                name: 'Gustavo',
            }
        }).then(async (response) => {
            await expect(response.status).to.eq(200);
            cy.visit('https://dsternlicht.github.io/RESTool/#/extras');
            cy.log("name created:" + response.body.name);
            cy.get('.pure-table>tbody>tr>td:nth-child(1)>span').should('have.length.greaterThan', 5);
            cy.get('.pure-table>tbody>tr>td:nth-child(1)>span').each(($el, index, $lis) => {
                cy.log($el.text())
                if ($el.text() == response.body.id) {
                    cy.log('Element found');
                    return
                }
            }).then(($lis) => {
                expect($lis).to.have.length.greaterThan(1);
            })
            cy.wait(3000)
            cy.request({
                method: 'DELETE',
                url: 'https://restool-sample-app.herokuapp.com/api/extra/' + response.body.id
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })
//=====================================================================================================
    it.only('Test PUT character extras', () => {
        const uniqueSeed = Date.now().toString();
        cy.request({
            method: 'POST',
            url: 'https://restool-sample-app.herokuapp.com/api/extra',
            form: true,
            body:{
                name: 'Gustavo',
            }
        }).then(async (response) => {
            await expect(response.status).to.eq(200);
            cy.viewport(1440, 860);
            cy.request('GET', 'https://restool-sample-app.herokuapp.com/api/extra/' + response.body.id);
            let newName = 'Gustavo18' + uniqueSeed
            cy.request({
                method: 'PUT',
                url: 'https://restool-sample-app.herokuapp.com/api/extra/' + response.body.id,
                form: true,
                body:{
                    name: newName,
                }
            }).then(async (response) => {
                await expect(response.status).to.eq(200);
                var flag = false;
                cy.visit('https://dsternlicht.github.io/RESTool/#/extras');
                cy.wait(5000);
                cy.get('.pure-table>tbody>tr>td:nth-child(2)>span').should('have.length.greaterThan', 0)
                cy.get('.pure-table>tbody>tr>td:nth-child(2)>span').each(($el, index, $lis) => {
                    cy.log($el.text())
                    cy.wait(1000);
                    if ($el.text() == newName) {
                        flag = true;
                        assert.isTrue(flag, 'this val is true')
                        cy.log('Element match');
                        //cy.should('have.value', newName);//????????????????????
                        return
                    }
                }).then(($lis) => {
                    expect($lis).to.have.length.greaterThan(1);
                })
                //assert.isTrue(flag, 'this val is true')
            })
            cy.wait(3000)
            cy.request({
                method: 'DELETE',
                url: 'https://restool-sample-app.herokuapp.com/api/extra/' + response.body.id
            }).then((response) => {
                expect(response.status).to.eq(200)
            })  
        })
        cy.reload();
    })
})