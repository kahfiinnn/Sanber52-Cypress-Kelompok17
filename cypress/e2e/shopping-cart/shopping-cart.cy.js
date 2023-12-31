require('cypress-xpath');
import shoppingCartPage from '../../support/pageObject/shopping-cart/shopping-cart.page';
const fixture = require('../../fixtures/shopping-cart.json')

describe('Magento-Shopping Cart', () => {
    before(() => {
      cy.visit('');
      cy.get(shoppingCartPage.singInButton).click();
      cy.login(fixture.validEmail,fixture.validPassword);
      cy.get('.logged-in').should('contain', 'Welcome, Kim Seungmin!');
      cy.wait(1000);

    })
    
    it('[TC0001] User can access cart page by hitting url directly', () => {
      cy.visit('https://magento.softwaretestingboard.com/checkout/cart/');
      cy.wait(2000);
      cy.get('.base').should('contain.text', 'Shopping Cart');
      cy.xpath(`//div[@class='cart-empty']/p`).first().should('contain', 'You have no items in your shopping cart.');
    })

    it('[TC0002] Add a product to cart', () => {
      shoppingCartPage.addProductToCart(1);
      // cy.log(productAdded);
    })

    it('[TC0003] Access cart page after adding product ', () => {
      cy.get('.showcart').click();
      cy.xpath(`//a[@class="action viewcart"]`).click();
      cy.wait(2000);
      cy.get('.base').should('contain.text', 'Shopping Cart');
      cy.get('.summary').should('be.visible');
    })

    it('[TC0004] User can delete product on cart page', () => {
      cy.get('.action-delete').click();
      cy.wait(3000);
    })

    after(()=>{
      cy.signOut();
    })
})
  