//require('cypress-xpath');
//import shoppingCartPage from '../../support/pageObject/shopping-cart/shopping-cart.page';

import registPage from "../../support/pageObject/regist/regist.page";
const userRegist = require('../../fixtures/userRegist.json');

describe('Magento - Registration', () => {
  beforeEach(() => {
    cy.visit('');
    cy.get('.panel > .header > :nth-child(3) > a').click()
    cy.url().should('include', '/customer/account/create/')
    
  })
  it('Verify Failed Regist - Password Weak', () => {
    cy.get('#firstname').type('kahfin')
    cy.get('#lastname').type('ilham')
    cy.get('#email_address').type('kel17@gmail.com')
    cy.get('#password').type('aduh')
    cy.get('#password-strength-meter').should('have.text', '\nPassword Strength:\nWeak\n')
    cy.get('#password-error').should('contain.text', 'Minimum length ')
    cy.get('#password-confirmation').type('aduh')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    
  })
  it('Verify Failed Regist - Not Email Format - Fixtures', () => {
    cy.get('#firstname').type(userRegist.validFirstName)
    cy.get('#lastname').type(userRegist.validLastName)
    cy.get('#email_address').type(userRegist.invalidEmail)
    cy.get('#password').type(userRegist.validPassword)
    cy.get('#password-strength-meter').should('have.text', userRegist.message[1].statusPass)
    cy.get('#password-confirmation').type(userRegist.validLastName)
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#email_address-error').should('contain.text', userRegist.message[0].invalidEmail)
    
  })

  it('Verify Failed Regist - No Password - Custom Command', () => {
    cy.inputText('#firstname', 'kahfin')
    cy.inputText('#lastname', 'ilham')
    cy.inputText('#email_address', 'kel17@gmail.com')
    cy.inputText('#password')
    cy.get('#password-strength-meter').should('contain.text', 'No Password')
    cy.inputText('#password-confirmation')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('#password-error').should('contain.text', 'required')
    cy.get('#password-confirmation-error').should('contain.text', 'required')
    
  })

  it('Verify Failed Regist - Wrong Password Confirmation - POM', () => { 
    cy.get(registPage.firstname).type('kahfin') // cara 1
    cy.get(registPage.lastname).type('ilham') // cara 1
    cy.get(registPage.email).type('kel17@gmail.com') // cara 1
    cy.get(registPage.pass).type('kelompok17!') // cara 1
    registPage.verifyPass('\nPassword Strength:\nVery Strong\n') // cara 2
    cy.get(registPage.confirmPass).type('kelompok16!') // cara 1
    registPage.clickRegistBtn() // cara 2
    registPage.verifyErrorMsg('Please enter the same value again.') // cara 2
    
  })
  it('Verify Failed Regist - Same Email', () => {
    cy.get('#firstname').type('kahfin')
    cy.get('#lastname').type('ilham')
    cy.get('#email_address').type('kel17@gmail.com')
    cy.get('#password').type('kelompok17!')
    cy.get('#password-strength-meter').should('have.text', '\nPassword Strength:\nVery Strong\n')
    cy.get('#password-confirmation').type('kelompok17!')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.get('.message-error > div').should('contain.text', 'There is already an account with this email address')
  })
  it.only('Verify Success Regist', () => { 
    cy.get('#firstname').type('kahfin')
    cy.get('#lastname').type('ilham')
    cy.get('#email_address').type('kel1778891ffdadad@gmail.com')
    cy.get('#password').type('kelompok17!')
    cy.get('#password-strength-meter').should('have.text', '\nPassword Strength:\nVery Strong\n')
    cy.get('#password-confirmation').type('kelompok17!')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.url().should('include', '/customer/account')
    cy.get('.message-success > div').should('contain.text', 'Thank you')
    cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
    cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').click()
    cy.url()
  })

  

  //after(()=>{
  //  cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
  //  cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').click()
  //  cy.url()
  //})
})
