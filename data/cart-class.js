class Cart{
    cartItems;
    #storageKey;
    constructor(storageKey){
        this.#loadFromStorage();
        this.#storageKey = storageKey;
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#storageKey));
    
    
            if(!this.cartItems){
                this.cartItems =  [{
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity:1,
                    deliveryId:'1'
            }];
            }
    }


    saveToStorage(){
        localStorage.setItem(this.#storageKey,JSON.stringify(this.cartItems));
    }

    addToCart(cartItemId){

        let matchingProduct;
    
        this.cartItems.forEach(cartItem=>{
            if(cartItem.productId === cartItemId){
                matchingProduct = cartItem;
            }
        });
        if(matchingProduct){
            matchingProduct.quantity++;
        }else{
            this.cartItems.push({
                productId: `${cartItemId}`,
                quantity:1,
                deliveryId:'1'
            });
        }
    
        this.saveToStorage();
    }

    removeFromCart(cartItemId){
        this.cartItems.forEach((item, index)=>{
            if(item.productId === cartItemId){
                this.cartItems.splice(index, 1);
            }
            this.saveToStorage();
        });
    
    }

    getCartItems(){
        let totalItems = 0;
        this.cartItems.forEach(item=>{
            totalItems += item.quantity;
        });
    
        return totalItems;
    }

    updateDeliveryDate(productId, deliveryOptionId){

        this.cartItems.forEach(cartItem=>{
            if(cartItem.productId === productId)
                cartItem.deliveryId = deliveryOptionId;
        });
    
        this.saveToStorage();
    }

}


const cart = new Cart('normal');
const businessCart = new Cart('business');

cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');


businessCart.addToCart('58b4fc92-e98c-42aa-8c55-b6b79996769a');





export function loadCart(fun){
    let xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load',() =>{

        
        if (typeof fun === 'function') {
          fun();  // Call the passed callback function
        } else {
          console.warn("Callback 'fun' is not a function.");
        }
    
    });

    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
}