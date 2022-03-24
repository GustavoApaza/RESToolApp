describe('Upload a file to a multipart form using cy.request', function () {
    it('Performs a multipart post to httpbin.org', function () {
        const baseUrl = 'https://api.thecatapi.com/v1/images/upload';
        //const postUrl = `${baseUrl}/images/upload`;

        cy.visit(baseUrl); // Cypress will be very buggy if you don't do at least one cy.visit

        cy.request(baseUrl).as('multipartForm'); // pretend we are doing the GET request for the multipart formconst base64FileName = 'Base64TestCV.rtf';
        const base64FileName = 'base64cat2.jpg';
        const postedFileName = 'cat2.jpg';
        const method = 'POST';
        const mimeType = 'application/jpg';

        cy.fixture(base64FileName).as('base64File'); // file content in base64

        cy.get('@multipartForm').then((response) => {
            const formData = new FormData();
            formData.append('firstFormField', 'Hello');
            formData.append('secondFormField', '25');
            const blob = Cypress.Blob.base64StringToBlob(this.base64File, mimeType);
            formData.append('uploadFile', blob, postedFileName);

            cy.multipartFormRequest(method, postUrl, formData, function (response) {
                expect(response.status).to.eq(200);
                //expect(response.response).to.match(/MyCypressTestCV/); // http://httpbin.org/post reflects what you post
            });
        });
    });
});