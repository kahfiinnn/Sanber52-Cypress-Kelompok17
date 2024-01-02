import EditAddressCy from "../../../support/PageObject-EditAddress/EditAddress.cy"
const UserLogin = require('../../../fixtures/Edit-Address.json')


describe('Verify Update Address for New User',()=>{

    beforeEach('User Already login',()=>{
        cy.visit(' ')
        cy.get('.panel > .header > .authorization-link > a').click({force:true})

        cy.url().should('include','https://magento.softwaretestingboard.com')

        //cy.log('user06@yopmail.com', 'Userenam06') ->Command

        cy.log(UserLogin.NewUser_Email,UserLogin.NewUser_Pass) //Fixtures

        cy.url().should('include', 'https://magento.softwaretestingboard.com/')
        
        const myacc = cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a')
        myacc.click({force:true})

        cy.url().should('eq', 'https://magento.softwaretestingboard.com/customer/account/')
        cy.get('.block-title > .action > span').click()
        cy.url().should('eq','https://magento.softwaretestingboard.com/customer/address/new/') 
    
    })

    it('Check UI Form Address',()=>{

        //cek title
        cy.get('.base').should('have.text','Add New Address')
        cy.get(':nth-child(1) > .legend > span').should('have.text','Contact Information')
        cy.get(':nth-child(2) > .legend > span').should('have.text','Address')

        //cek nama field
        cy.get('.field-name-firstname > .label > span').should('have.text','First Name')
        cy.get('.field-name-lastname > .label > span').should('have.text','Last Name')
        cy.get('.company > .label > span').should('have.text','\nCompany ')
        cy.get('.telephone > .label > span').should('have.text','\nPhone Number ')
        cy.get('.street > :nth-child(1) > span').should('have.text','Street Address')
        cy.get('.city > .label > span').should('have.text','City')
        cy.get('.region > .label > span').should('have.text','State/Province').should('have.value', '')
        cy.get('.zip > .label > span').should('have.text','Zip/Postal Code')
        cy.get('.country > .label > span').should('have.text','Country')

        //cek dropdown state
        cy.get('#region_id').should('have.value','').select('California')

        //cek dropdown country
        cy.get('#country').should('have.value','US').select('Indonesia')

        //cek design button
        const button = cy.get('#form-validate > .actions-toolbar > div.primary > .action')
        button.should('have.css','background-color', 'rgb(25, 121, 195)')
        button.should('have.css','color', 'rgb(255, 255, 255)')
        button.contains('Save Address')

    })

    it('Update address without filling mandatory data',()=>{
        
        cy.visit('customer/address/new')

        cy.get(EditAddressCy.telephone).type('0211223344') //POM 
        cy.get(EditAddressCy.address).type('Jalan apel') //POM
        cy.get('#city').type('Jakarta')
        cy.get('#region_id').should('have.value','').select('California')
        cy.get('#zip').type('12321')
        cy.get('#country').should('have.value','US').select('')

        cy.get(EditAddressCy.SaveBtn).click() //POM cara A

        cy.get('#country-error').should('have.text','Please select an option.')
    })

    it('Update address with filling all data',()=>{

        cy.visit('customer/address/new')

        cy.get('#company').type('PT. Travelindo')
        cy.get('#telephone').type('0211223344')
        cy.get('#street_1').type('Jalan apel')
        cy.get('#city').type('Bandung')
        cy.get('#region_id').should('have.value','').select('California')
        cy.get('#zip').type('12321')
        cy.get('#country').should('have.value','US').select('Indonesia')

        EditAddressCy.ClickSaveBtn() //POM cara B

        cy.url().should('eq','customer/address/index/')
        cy.get('.message-success > div').should('have.text','You saved the address')

    })

})