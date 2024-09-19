import {renderCartSummary}from "../../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage} from "../../../data/cart.js";
import { products } from "../../../data/products.js";


describe('Test suite: Render cart summary',() => {
    let cartItem1Id = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    let cartItem2Id =  "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeEach(() => {
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: cartItem1Id,
                quantity:1,
                deliveryId:'1'
            },
            {
                productId: cartItem2Id,
                quantity:2,
                deliveryId:'1'
            }
             ]);
        });
        loadFromStorage();

        renderCartSummary();
    });

    afterEach(() => {
        document.querySelector('.checkout').innerHTML =``;
        document.querySelector('.js-return-to-home-link').innerHTML =``;
        document.querySelector('.js-order-summary').innerHTML =``;
        document.querySelector('.js-payment-summary').innerHTML =``;
    });

    it('Displays the cart',() =>{

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelectorAll('.js-quantity-label').item(0).innerHTML).toEqual(`1`);
        expect(document.querySelectorAll('.js-quantity-label').item(1).innerHTML).toEqual(`2`);


        

    });

    
    it('Deletes an item from the cart',() => {
        

        document.querySelector(`.js-delete-quantity-link-${cartItem2Id}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${cartItem2Id}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${cartItem1Id}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(cartItem1Id);

        
    });
});