import { cart , getCartItems} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { currencyFormat } from "../../utils/functions.js";
import { getShippingCost } from "../../data/deliveryOptions.js";


export function renderPaymentSummary(){

    
    let itemsCost = 0;
    let shippingCost = 0;
    let tax = 0;
    let total = 0;
    let totalBeforeTax = 0;
    cart.forEach(cartItem => {
        shippingCost += getShippingCost(cartItem.deliveryId);
        itemsCost +=  getProduct(cartItem.productId).priceCents * cartItem.quantity;
    });

    tax = Math.round((itemsCost+shippingCost)*0.1);
    total = (tax+shippingCost+itemsCost);
    totalBeforeTax = (itemsCost+shippingCost);
    

    let paymentHTML =`
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${getCartItems()}):</div>
            <div class="payment-summary-money">$${currencyFormat(itemsCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currencyFormat(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currencyFormat(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currencyFormat(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currencyFormat(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;

}