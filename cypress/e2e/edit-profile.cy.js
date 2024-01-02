describe('Edit Account Information', () => {
    let password = 'Hanitest123'
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.contains('Sign In').click() 
        cy.get('#email').type('hani.test@mailinator.com')
        cy.get('#pass').type(password) 
        cy.get('#send2').click()
        cy.contains('Welcome')
        cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a').click()
        cy.contains('My Account')
    })

    it('Ensure All Fields in Account Information are Mandatory', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#firstname').clear()
        cy.get('#lastname').clear()
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('#firstname-error').should('contain.text', 'This is a required field.')
        cy.get('#lastname-error').should('contain.text', 'This is a required field.')
    })
    it('Edit Account Information with Correct Input', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#firstname').clear()
        cy.get('#firstname').type('hani edit')
        cy.get('#lastname').clear()
        cy.get('#lastname').type('success')
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('.message-success').should('contain.text', 'You saved the account information.')
        cy.contains('hani edit')
        cy.contains('success')

      })
      
})

describe('Change Email', () => {
    let password = 'Hanitest123'
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.contains('Sign In').click() 
        cy.get('#email').type('hani.test@mailinator.com')
        cy.get('#pass').type(password) 
        cy.get('#send2').click()
        cy.contains('Welcome')
        cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a').click()
        cy.contains('My Account')
    })

      it('Negative Case - Change Email with Incrrect Email Format', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#change-email').click()
        cy.get('.fieldset.password > .legend > span').should('contain.text', 'Change Email')
        cy.get('#email').clear()
        cy.get('#email').type('hani.test')
        cy.get('#current-password').type(password)
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('#email-error').should('contain.text', 'Please enter a valid email address.')
      })

      it('Negative Case - Change Email with Wrong Current Password', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#change-email').click()
        cy.get('.fieldset.password > .legend > span').should('contain.text', 'Change Email')
        cy.get('#email').clear()
        cy.get('#email').type('hani.test@mailinator.com')
        cy.get('#current-password').type('test123')
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('.message-error').should('contain.text', "The password doesn't match this account. Verify the password and try again.")
      })

      it('Ensure All Fields in Change Email are Mandatory', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#change-email').click()
        cy.get('.fieldset.password > .legend > span').should('contain.text', 'Change Email')
        cy.get('#email').clear()
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('#email-error').should('contain.text', "This is a required field.")
        cy.get('#current-password-error').should('contain.text', "This is a required field.")
      })

      it('Change Email with Correct Email Format', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#change-email').click()
        cy.get('.fieldset.password > .legend > span').should('contain.text', 'Change Email')
        cy.get('#email').clear()
        cy.get('#email').type('hani.qa@mailinator.com')
        cy.get('#current-password').type(password)
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('.message-success').should('contain.text', 'You saved the account information.')
        // login with the new email
        cy.get('#email').type('hani.qa@mailinator.com')
        cy.get('#pass').type(password)
        cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
        cy.contains('hani.qa@mailinator.com')
      })
})

describe('Change Password', () => {
    let password = 'Hanitest123'
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.contains('Sign In').click() 
        cy.get('#email').type('hani.qa@mailinator.com')
        cy.get('#pass').type(password) 
        cy.get('#send2').click()
        cy.contains('Welcome')
        cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a').click()
        cy.contains('My Account')
    })

    it('Ensure All Fields in Change Password are Mandatory', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#change-password').click()
        cy.get('.fieldset.password > .legend > span').should('contain.text', 'Change Password')
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('#current-password-error').should('contain.text', "This is a required field.")
        cy.get('#password-error').should('contain.text', "This is a required field.")
        cy.get('#password-confirmation-error').should('contain.text', "This is a required field.")
    })


    it('Change Password with Wrong Current Password', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#change-password').click()
        cy.get('.fieldset.password > .legend > span').should('contain.text', 'Change Password')
        cy.get('#current-password').type('1213asasA')
        cy.get('#password').type('Testaja123')
        cy.get('#password-confirmation').type('Testaja123')
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('.message-error').should('contain.text', "The password doesn't match this account. Verify the password and try again.")
    })

    it('Change Password with Weak Password', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#change-password').click()
        cy.get('.fieldset.password > .legend > span').should('contain.text', 'Change Password')
        cy.get('#current-password').type(password)
        cy.get('#password').type('testaja123')
        cy.get('#password-confirmation').type('testaja123')
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('#password-strength-meter').should('exist')
    })

    it('Change Password with Correct Input', () => {
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click()
        cy.contains('Edit Account Information')
        cy.get('#change-password').click()
        cy.get('.fieldset.password > .legend > span').should('contain.text', 'Change Password')
        cy.get('#current-password').type(password)
        cy.get('#password').type('Testaja123')
        cy.get('#password-confirmation').type('Testaja123')
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
        cy.get('.message-success').should('contain.text', "You saved the account information.")
    })
})