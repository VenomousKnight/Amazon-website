import { cart, getCartItems, removeFromCart ,updateDeliveryDate} from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { currencyFormat } from "../../utils/functions.js";
import datejs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryDay } from "../../data/deliveryOptions.js";



renderCartSummary();

export function renderCartSummary(){
    let cartSummaryHTML = ``;

    cart.forEach(cartItem => {        
        let itemId = cartItem.productId;
        let product = getProduct(itemId);
        let today = datejs();
        let dateString  = today.add(getDeliveryDay(cartItem), 'days').format('dddd, MMMM D');
        
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${itemId}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${product.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                      ${product.name}
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
                    
                    ${generateDeliveryOptions(cartItem)}
                   
                  </div>
                </div>
              </div>
    
        `;
    });
    document.querySelector('.checkout').innerHTML = `Checkout(${getCartItems()})`;
    document.querySelector('.js-return-to-home-link').innerHTML = `${getCartItems()} items`;
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    






document.querySelectorAll('.js-delete-quantity-link').forEach(deleteBt=>{

    deleteBt.addEventListener('click',()=>{
        let linkId = deleteBt.dataset.itemId;
        removeFromCart(linkId);
        document.querySelector('.checkout').innerHTML = `Checkout(${getCartItems()})`;
        document.querySelector(`.js-cart-item-container-${linkId}`).remove();
        document.querySelector('.js-return-to-home-link').innerHTML = `${getCartItems()} items`;
        renderPaymentSummary();
    });
});


function generateDeliveryOptions(cartItem){
  let deliveryOptionsHTML =``;

  deliveryOptions.forEach((option)=>{

    let today = datejs();
    let dateString  = today.add(option.deliveryDays, 'days').format('dddd, MMMM D');
    let deliveryCost = option.priceCents === 0 ? `FREE ` : `$${currencyFormat(option.priceCents)} -`;
    let checked = option.id === cartItem.deliveryId ? `checked` : ``;
    deliveryOptionsHTML +=`
        <div class="delivery-option js-delivery-option"
         data-product-id="${cartItem.productId}" 
         data-delivery-option-id="${option.id}">
          <input type="radio" ${checked} class="delivery-option-input"
            name="delivery-option-${cartItem.productId}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${deliveryCost} Shipping
            </div>
          </div>
        </div>
    `;
  });

  return deliveryOptionsHTML;
}


document.querySelectorAll('.js-delivery-option').forEach(element=>{
  element.addEventListener('click',()=>{
    let {productId, deliveryOptionId} =  element.dataset;
    console.log();
    updateDeliveryDate(productId, deliveryOptionId);
    
    renderCartSummary();
    renderPaymentSummary();
  })
});

}