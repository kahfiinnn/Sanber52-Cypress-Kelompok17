class registPage {
    firstname = '#firstname'
    lastname = '#lastname'
    email = '#email_address'
    pass = '#password'
    confirmPass = '#password-confirmation'
    registBtn = '#form-validate > .actions-toolbar > div.primary > .action'
    errorMsg = '#password-confirmation-error'
    passStrength = '#password-strength-meter'

    clickRegistBtn(){
        cy.get(this.registBtn).click()
    }
    verifyErrorMsg(message){
        cy.get(this.errorMsg).should('contain.text', message)
    }
    verifyPass(message){
        cy.get(this.passStrength).should('have.text', message)
    }
}

export default new registPage()
    