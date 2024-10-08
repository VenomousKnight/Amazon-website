import { addToCart, getCartItems} from "../data/cart.js";
import { products , loadProductsFetch} from "../data/products.js";
import "../data/products.js";


loadProductsFetch().then(() => {
  renderProductGrid();
});

function renderProductGrid(){
let productsHTML = ``;


products.forEach((product)=>{
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-product-quantity js-product-quantity-${product.id}">
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
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`;

        updateCartQuantity();

       
});

function updateCartQuantity(){

    document.querySelector('.js-cart-quantity').innerHTML = getCartItems() === 0 ? `` : getCartItems();
}


document.querySelector('.js-products-grid').innerHTML = productsHTML;


document.querySelectorAll('.js-product-quantity').forEach(element => {
  element.addEventListener('change', event=>{

    let quantity = event.target.value;
    element.dataset.quantity = quantity;
  });
});

document.querySelectorAll('.js-add-to-cart-button').forEach((button)=>{
    
    button.addEventListener('click',async ()=>{
        let cartItemId = button.dataset.productId;
        let addedToCart = document.querySelector(`.js-added-to-cart-${cartItemId}`);
        let element= document.querySelector(`.js-product-quantity-${cartItemId}`);

        let quantity = 1;

        if(element.dataset.quantity){
          quantity = element.dataset.quantity;
        }else{

          quantity = 1;
        }
        addedToCart.style.opacity = 0;
        addedToCart.style.transition = "none";
        
        setTimeout(() => {
          addedToCart.style.opacity = 1;
          addedToCart.style.transition = "opacity 1s ease-in";
        }, 100);


        addToCart(cartItemId, quantity);
        updateCartQuantity();

    });
});

}