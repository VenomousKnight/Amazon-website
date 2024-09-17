import { cart, getCartItems, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { currencyFormat } from "../utils/functions.js";


function getProduct(productId){
    let matchingProduct;
    products.forEach(product=>{
        if(product.id === productId){
            matchingProduct = product;
        }     
    });
    return matchingProduct;
}

renderCartSummary();

function renderCartSummary(){
    let cartSummaryHTML = ``;

    cart.forEach(cartItem => {        
        let itemId = cartItem.productId;
        let product = getProduct(itemId);
        
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${itemId}">
                <div class="delivery-date">
                  Delivery date: Wednesday, June 15
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${product.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                      Intermediate Size Basketball
                    </div>
                    <div class="product-price">
                      $${currencyFormat(product.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span data-item-id="${cartItem.productId}" class="delete-quantity-link link-primary js-delete-quantity-link">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
    
                    <div class="delivery-option">
                      <input type="radio" class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio" checked class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                          Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio" class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                          Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
        `;
    });
    
    document.querySelector('.js-return-to-home-link').innerHTML = `${getCartItems()} items`;
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    
}





document.querySelectorAll('.js-delete-quantity-link').forEach(deleteBt=>{

    deleteBt.addEventListener('click',()=>{
        let linkId = deleteBt.dataset.itemId;
        removeFromCart(linkId);
        document.querySelector(`.js-cart-item-container-${linkId}`).remove();
        document.querySelector('.js-return-to-home-link').innerHTML = `${getCartItems()} items`;
    });
});
