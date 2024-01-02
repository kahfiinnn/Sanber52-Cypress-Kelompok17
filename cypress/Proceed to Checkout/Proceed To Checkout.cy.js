describe('template spec', () => {
  it('Go To Website', () => {
    cy.viewport(1400, 900)
    cy.visit('https://magento.softwaretestingboard.com/', { timeout: 10000 })
    // cy.get('a').should("contain.text", "Sign In").click();
    cy.contains("Sign In").click()

    cy.get('#email').type("testing987@mail.com").should("have.value", "testing987@mail.com")
    cy.get('#pass').type("123!@#Qwe").should("have.value", "123!@#Qwe")

    cy.get('#send2').click()

    //cy.contains('My Cart').click()
    cy.get('[class="action showcart"]').click()
    cy.get('span').should('contain', 'Shopping Cart')

    cy.get('[title="Qty"]').type('{backspace} 3')

    cy.get('[data-role="proceed-to-checkout"]').click()

    //Form Address
   
    cy.get('[name="company"]').should('not.be.visible').then(($company) => {
      if($company === 0){

        cy.get('[name="company"]').type('PT Sejahtera Abadi').should("have.value", "PT Sejahtera Abadi")
        cy.get('[class="block items-in-cart"]').click()
        cy.contains('View Details').click()
        
        cy.get('[name="street[0]"]').type('Jl. Melati 3 No. 2').should('have.value','Jl. Melati 3 No. 2')
        cy.get('[name="street[1]"]').type('Kel. Batu').should('have.value','Kel. Batu')
        cy.get('[name="street[2]"]').type('Kec. Ampera').should('have.value','Kec. Ampera')

        cy.get('[name="city"]').type('Jakarta').should('have.value','Jakarta')

        cy.get('[name="country_id"]').select('Indonesia')
        cy.get('[name="region"]').type('Jakarta')
        cy.get('[name="postcode"]').type('12132')
        cy.get('[name="telephone"]').type('+628125456545')
        cy.get('[value="flatrate_flatrate"]').click()

        

      }else {
        // Tindakan yang akan dilakukan jika elemen tidak terlihat
        cy.log('Element is visible');
      }
    })
    cy.contains('Next').click()
    cy.get('[class="action primary checkout"]').should('have.text', '\n                    Place Order\n                ').click()

    cy.get('[data-ui-id="page-title-wrapper"]').should('have.text', 'Thank you for your purchase!')
  });
  
  // it('Login', () => {
  //   cy.get('a').should("contain.text", "Sign In").click();
  // })
})