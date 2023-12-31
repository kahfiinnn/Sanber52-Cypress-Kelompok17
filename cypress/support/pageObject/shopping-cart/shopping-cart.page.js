class ShoppingCartPage{
    singInButton = '.panel > .header > .authorization-link > a';

    randomText(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    addProductToCart(product=1) {
      //click Add to Cart - redirected to detail page
      for (let i = 1; i <= product ; i++) {
        cy.accessWhatsNewPage();
        cy.xpath(`(//div[@class="product-item-inner"])[${i}]//button/span[contains(text(),'Add to Cart')]`).click({ force: true });
        cy.wait(3000);
        //choose size
        cy.xpath(`(//div[@role="listbox"]/div[@option-label="XS"])[${i}]`).click();
        //choose color
        cy.xpath(`(//div[@class="swatch-attribute color"])[${i}]/div/div[1]`).click();
        // click add to cart
        cy.xpath(`//*[@id="product-addtocart-button"]`).click();
        cy.get('.message-success').should('be.visible');
        // let productName;
        // cy.get('.base').then(($el) => {
        //     const productName = $el.text(); 
        //     // cy.log(this.productName);
        //   });
        // cy.log("baru ", productName);
      }
      
    }
}

export default new ShoppingCartPage();