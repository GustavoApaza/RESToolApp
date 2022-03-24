describe("Testing API Endpoints Using Cypress", () => {
    context('Images', () => {
        it("Test GET Cat-API search", () => {      
            cy.request({
                method: 'GET',
                url: "https://api.thecatapi.com/v1/images/search?format=json",
                form: true,
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "19769dd4-7936-4a65-8957-865ec69ba868"
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.not.be.null;
            });
        })
        it("Test GET Cat-API search by ID", () => {      
            cy.request({
                method: 'GET',
                url: "https://api.thecatapi.com/v1/images/3k7",
                form: true,
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "19769dd4-7936-4a65-8957-865ec69ba868"
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.not.be.null;
            });
        })
        it("Test GET Cat-API search limit = 10", () => {      
            cy.request({
                method: 'GET',
                url: "https://api.thecatapi.com//api/v1/images/?limit=10",
                form: true,
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "19769dd4-7936-4a65-8957-865ec69ba868"
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.not.be.null;
            });
        })
        // it("Test POST Cat-API", () => {      
        //     cy.request({
        //         method: 'POST',
        //         url: 'https://api.thecatapi.com/v1/images/upload',
        //         form: true,
        //         body: {
        //             "file": "C:/Users/gapaza/OneDrive - ENDAVA/Desktop/Apuntes/Cypress/Practica2/cypress/fixtures/img/cat3.jpg"
        //         },
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //             'x-api-key': '17d94b92-754f-46eb-99a0-65be65b5d18f'
        //             //'x-api-key': '19769dd4-7936-4a65-8957-865ec69ba868'
        //         }
        //     }).then((response) => {
        //         expect(response.status).to.eq(200);
        //         expect(response.body.id).to.not.be.null;
        //     });
        // })
    })
    context('Votes', () => {
        it("Test GET votes", () => {      
            cy.request({
                method: 'GET',
                url: 'https://api.thecatapi.com/v1/votes',
                form: true,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '19769dd4-7936-4a65-8957-865ec69ba868'
                }
            }).then((response) => {
                expect(response.status).to.within(200, 399);
                expect(response.body.id).to.not.be.null;
            });
        })
        it("Test GET votes by ID", () => {      
            cy.request({
                method: 'GET',
                url: 'https://api.thecatapi.com/v1/votes/10693',
                form: true,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '19769dd4-7936-4a65-8957-865ec69ba868'
                }
            }).then((response) => {
                expect(response.status).to.within(200, 399);
                expect(response.body.id).to.not.be.null;
            });
        })
        it("Test POST votes", () => {      
            cy.request({
                method: 'POST',
                url: 'https://api.thecatapi.com/v1/votes',
                //form: true,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '17d94b92-754f-46eb-99a0-65be65b5d18f'
                    //'x-api-key': '19769dd4-7936-4a65-8957-865ec69ba868'
                },
                body: {
                    image_id: '3tv',
	                sub_id: 'my-user-1234'
                }
            }).then((response) => {
                expect(response.status).to.within(200, 399);
                expect(response.body.id).to.not.be.null;
            });
        })
        it("Test DELETE vote by id", () => {
            cy.request({
                method: 'DELETE',
                url: 'https://api.thecatapi.com/v1/votes/10693',
                form: true,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '17d94b92-754f-46eb-99a0-65be65b5d18f'
                    //'x-api-key': '19769dd4-7936-4a65-8957-865ec69ba868'
                }
            }).then((response) => {
                expect(response.status).to.within(200, 399);
                expect(response.body.id).to.not.be.null;
            });
        })
    })
})