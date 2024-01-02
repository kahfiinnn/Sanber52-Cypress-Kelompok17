// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => { 
    cy.get('#email').type(email);
    cy.get('#pass').type(password);
    cy.get('#send2').click();
})
Cypress.Commands.add('verifyText', (locator, value) => { 
    cy.get(locator).should('contain.text', value)   
})
Cypress.Commands.add('inputText', (locator, value = '') => {
    cy.get(locator).then(($el) => {
        if ($el.attr('id') === 'password' || $el.attr('id') === 'password-confirmation') {
            cy.wrap($el).clear();
        } else {
            cy.wrap($el).clear().type(value);
        }
    });
});


Cypress.Commands.add('signOut', () => { 
    cy.xpath('//div[@class="panel header"]/ul/li/span/button[@class="action switch"]').click();
    cy.xpath(`//li[@class="customer-welcome active"]//li/a[contains(text(), 'Sign Out')]`).click();
})
Cypress.Commands.add('accessWhatsNewPage', () => { 
    cy.contains('What\'s New').click();
    cy.get('.page-title-wrapper').should('contain','What\'s New');
    cy.wait(4000);
})
Cypress.Commands.add('deleteCartProduct', (rowNumber = 1) => { 
    cy.xpath(`(//*[@class='action action-delete'])[${rowNumber}]`).click();
    cy.wait(3000);
})


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })