require('cypress-xpath');
import shoppingCartPage from '../../support/pageObject/shopping-cart/shopping-cart.page';
const fixture = require('../../fixtures/shopping-cart.json');

describe('Magento-Shopping Cart', () => {
    before(() => {
      cy.visit('');
      cy.get(shoppingCartPage.singInButton).click();
      cy.login(fixture.validEmail,fixture.validPassword);
      cy.get('.logged-in').should('contain', 'Welcome, Kim Seungmin!');
      cy.wait(1000);
    })
    
    it('[TC0001] User can access cart page by hitting url directly', () => {
      shoppingCartPage.visitCartUrl();
      cy.xpath(`//div[@class='cart-empty']/p`).first().should('contain', 'You have no items in your shopping cart.');
    })

    it('[TC0002] User can add products to cart', () => {
      shoppingCartPage.addProductToCart(2);
    })

    it('[TC0003] User can access cart page after adding products ', () => {
      cy.get('.showcart').click();
      cy.xpath(`//a[@class="action viewcart"]`).click();
      cy.wait(2000);
      cy.get('.base').should('contain.text', 'Shopping Cart');
      cy.get('.summary').should('be.visible');
      shoppingCartPage.orderTotalTextIsVisible();
    })

    it('[TC0004] User can update product quantity on cart page with valid number', () => {
      cy.wait(2000);
      var ele = cy.xpath(`(//input[@title="Qty"])[1]`);
      ele.clear();
      ele.type('2');
      cy.xpath(`(//td[2]//span[@class="price"])[1]`).then(function ($element) {
        var eleText = $element.text();
        cy.log("teks " + eleText);
        //validate subtotal
        var price = parseInt(eleText.substring(1, 3));
        var subtotal = price * 2;
        cy.get('.update').click();
        cy.xpath(`(//td[4]//span[@class="price"])[1]`).should('contain', subtotal);
        shoppingCartPage.orderTotalTextIsVisible();

      })
    })

    it('[TC0005] User can not update product quantity on cart page with decimal number', () => {
      cy.wait(500);
      var ele = cy.xpath(`(//input[@title="Qty"])[1]`);
      ele.clear();
      ele.type('2.5');
      cy.get('.update').click();
      cy.contains('You cannot use decimal quantity for this product.').should('be.visible');
      cy.xpath(`//button/span[contains(text(),'OK')]`).click();
    })

    it('[TC0006] User can not update product quantity on cart page with empty field', () => {
      cy.wait(500);
      var ele = cy.xpath(`(//input[@title="Qty"])[1]`);
      ele.clear();
      cy.get('.update').click();
      cy.xpath(`//td[3]//div[contains(text(),'This is a required field.')]`).should('be.visible');
    })

    it('[TC0007] User can delete a product on cart page', () => {
      cy.deleteCartProduct();
      shoppingCartPage.orderTotalTextIsVisible();
      cy.xpath(`(//td[2]//span[@class="price"])[1]`).then(function ($element) {
        var subtotal = $element.text();
        // validate subtotal 
        cy.xpath(`(//td[4]//span[@class="price"])[1]`).should('contain', subtotal);
        shoppingCartPage.orderTotalTextIsVisible();
        cy.xpath(`//tr[@class="grand totals"]//span[@class="price"]`).should('contain', subtotal);
      })
    })

    it('[TC0008] User can not apply discount code with invalid values on cart page', () => {
      shoppingCartPage.orderTotalTextIsVisible();
      var invalidValues = 'string ' + shoppingCartPage.randomText(5);
      shoppingCartPage.inputDiscountCode(invalidValues);
      shoppingCartPage.orderTotalTextIsVisible();
      cy.get('.message-error').should('contain', `The coupon code "${invalidValues}" is not valid.`);
    })

    it('[TC0009] User can not apply discount code with empty values on cart page', () => {
      shoppingCartPage.inputDiscountCode('');
      shoppingCartPage.orderTotalTextIsVisible();
      var validationEmptyCode = cy.xpath(`//div[@id="coupon_code-error"]`);
      validationEmptyCode.should('be.visible');
      validationEmptyCode.should('contain', 'This is a required field.');
    })

    it('[TC0010] User can move product to wishlist from cart page', () => {      
      cy.contains('Move to Wishlist').first().click();
      //validate success alert
      cy.get('.message-success').should('contain'," has been moved to your wish list.");

    })

    it('[TC0011] User can delete all product on cart page and see no data', () => {
      shoppingCartPage.addProductToCart(2);
      shoppingCartPage.visitCartUrl();
      for (let i = 1; i <=2; i++) {
        cy.deleteCartProduct();
      }
      
    })

    after(()=>{
      cy.signOut();
    })
})
  