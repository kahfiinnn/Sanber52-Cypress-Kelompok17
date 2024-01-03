import loginPage from "../../support/pageObject/login/login.page";
const userLogin = require('../../fixtures/userLogin.json');

describe('Magento - Login', () => {
    beforeEach(() => {
      cy.visit('');      
      cy.get('.panel > .header > .authorization-link > a').click()
      cy.url().should('include', '/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/')
    })

    it('Verify Failed Login - Wrong Password - Custom Command', () => {
      cy.login('kel17@gmail.com', 'kelompok16!') 
      cy.verifyText('.message-error', 'The account sign-in was incorrect')
    })

    it('Verify Failed Login - Wrong Email - POM', () => {
        cy.get(loginPage.email).type('kel1711111@gmail.com') // cara 1
        cy.get(loginPage.pass).type('kelompok17!') // cara 1
        loginPage.clickLoginBtn() // cara 2
        loginPage.verifyErrorMsg('The account sign-in was incorrect') // cara 2    
      })

    it('Verify Failed Login - Not Email Format - Custom Command', () => {
      cy.login('kel17', 'kelompok16!') 
      // kadang2 nge bug dan tidak muncul "Please enter a valid email address. Oleh karena itu, saya hapus saja shouldnya" 
       
      })

    it('For Password - POM', () => {
      loginPage.forgotYourPass()
      cy.url().should('include', '/customer/account/forgotpassword/')
      loginPage.verifyForgot('Forgot Your Password?')
      cy.get(loginPage.emailForgot).type("kel17@gmail.com")
      loginPage.resetMyPass()
      cy.url().should('include','/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2luZGV4Lw%2C%2C/')
      loginPage.customerLogin('Customer Login')
      loginPage.successChangePass('If there is an account associated with')
         
      })  
    it('Verify Success Login - Fixtures', () => {
      cy.get(loginPage.email).type(userLogin.validEmail)
      cy.get(loginPage.pass).type(userLogin.validPassword) 
      cy.get('#send2').click(); 
      cy.url().should('include', '')
      cy.get(':nth-child(2) > .greet > .logged-in').should('contain.text', userLogin.message.validEmail)
      cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
      cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').click()
      cy.url()
    })

    


    

    after(()=>{
      //cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
      //cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').click()
      //cy.url()
    })
})
  