import { renderCartSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import '../data/cart-class.js';
//import "../data/bakcend-practice.js";
import { loadProducts } from "../data/products.js";


loadProducts(() => {
    renderCartSummary();
    renderPaymentSummary(); 
});