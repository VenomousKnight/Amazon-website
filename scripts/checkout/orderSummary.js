import { cart, getCartItems, removeFromCart ,updateDeliveryDate,upDateCart} from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { currencyFormat } from "../../utils/functions.js";
import datejs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryDay } from "../../data/deliveryOptions.js";
import "../../data/products.js"



//renderCartSummary();

export function renderCartSummary(){
    let cartSummaryHTML = ``;

    cart.forEach(cartItem => {        
        let itemId = cartItem.productId;
        let product = getProduct(itemId);
        let today = datejs();
        let dateString  = today.add(getDeliveryDay(cartItem), 'days').format('dddd, MMMM D');
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${itemId}">
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
                      $${product.getPrice()}
                    </div>
                    <div class="product-quantity">
                      <span class="js-cartSelector-${cartItem.productId}">
                        Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity-link-${cartItem.productId}" data-product-id = ${cartItem.productId}>
                        Update
                      </span>
                      <span data-item-id="${cartItem.productId}" class="delete-quantity-link link-primary js-delete-quantity-link js-delete-quantity-link-${cartItem.productId}">
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



      document.querySelectorAll(`.update-quantity-link`).forEach((updateBt) => {
          updateBt.addEventListener(`click`, () => {
            let productId = updateBt.dataset.productId;
            

            let cartSelector = document.querySelector(`.js-cartSelector-${productId}`);
            let updateState = document.querySelector(`.js-update-quantity-link-${productId}`);

            if(updateState.innerHTML.trim() === `Update`){
              updateState.innerHTML = 'Save';

              let updateQuantityHTML = `
                    <select class="js-product-quantity js-product-quantity">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>`;
                
                cartSelector.innerHTML = updateQuantityHTML;

                  cartSelector.addEventListener('change', event=>{
                
                    let quantity = event.target.value;               
                    cartSelector.dataset.quantity = quantity;
                  });
                


            }else{
              updateState.innerHTML = 'Update';
              let quantity = cartSelector.dataset.quantity;

              if(quantity){
                upDateCart(productId, quantity);
              }else{
                quantity = 1;
                upDateCart(productId, quantity);
              }
              
              

              let newHTML = `
                      <span class="js-cartSelector-${productId}">
                        Quantity: <span class="quantity-label js-quantity-label">${quantity}</span>
                      </span>`;

              cartSelector.innerHTML = newHTML;

              renderCartSummary();
              renderPaymentSummary();
                          
            }
            

          })
      });

  
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