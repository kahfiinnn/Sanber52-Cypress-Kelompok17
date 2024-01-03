class EditAddressCy{
    telephone = '#telephone'
    address = '#street_1'
    city = '#city'
    state = '#region_id'
    posCode = '#zip'
    country = '#country'
    SaveBtn = '#form-validate > .actions-toolbar > div.primary > .action'

    ClickSaveBtn(){
        cy.get(this.SaveBtn).click()
    }
}

export default new EditAddressCy();