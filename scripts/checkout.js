import { cart, getCartItems, removeFromCart , updateDeliveryOption} from "../data/cart.js";
import { products } from "../data/products.js";
import currencyFormat from "../utils/functions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

function getProduct(productId){
    let matchingProduct;
    products.forEach(product=>{
        if(product.id === productId){
            matchingProduct = product;
        }     
    });
    return matchingProduct;
}

function getDeliveryOption(optionId){
  let delivery;
  deliveryOptions.forEach(option=>{
    if(option.id === optionId)
      delivery = option;
  });

  return delivery;
}

renderCartSummary();

function renderCartSummary(){
    let cartSummaryHTML = ``;

    cart.forEach(cartItem => {        
        let itemId = cartItem.productId;
        let product = getProduct(itemId);
        let deliveryId = cartItem.deliveryOptionId;
        let deliveryOption = getDeliveryOption(deliveryId);
    
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${itemId}">
                <div class="delivery-date">
                  Delivery date: ${dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D')}
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
                    ${deliveryOptionsHTML(cartItem)}    
                  </div>
                </div>
              </div>
    
        `;
    });
    document.querySelector('.checkout').innerHTML = `Checkout(${getCartItems()})`;
    document.querySelector('.js-return-to-home-link').innerHTML = `${getCartItems()} items`;
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    
}


function deliveryOptionsHTML(cartItem){

  let deliveryHTML = ``;
  deliveryOptions.forEach(option=>{
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays,'days').format('dddd, MMMM D');

    let price = option.priceCents === 0?'FREE':`$${currencyFormat(option.priceCents)}-`;

    let isChecked = cartItem.deliveryOptionId === option.id;

    deliveryHTML += `
        <div class="delivery-option js-delivery-option" data-product-id="${cartItem.productId}" data-delivery-option-id="${option.id}">
          <input type="radio" ${isChecked ? 'checked  ' : ''} class="delivery-option-input"
            name="delivery-option-${cartItem.productId}">
          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${price}Shipping
            </div>
          </div>
        </div>
    `;
  });
  return deliveryHTML;
}





document.querySelectorAll('.js-delete-quantity-link').forEach(deleteBt=>{
    deleteBt.addEventListener('click',()=>{
        let linkId = deleteBt.dataset.itemId;
        removeFromCart(linkId);
        document.querySelector('.checkout').innerHTML = `Checkout(${getCartItems()})`;
        document.querySelector(`.js-cart-item-container-${linkId}`).remove();
        document.querySelector('.js-return-to-home-link').innerHTML = `${getCartItems()} items`;
    });
});


document.querySelectorAll('.js-delivery-option').forEach(element=>{
  element.addEventListener('click', ()=>{
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});