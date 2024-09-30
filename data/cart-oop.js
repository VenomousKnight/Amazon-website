function Cart(storageKey){

    const cart = {
        cartItems: undefined,

        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(storageKey));
        
        
                if(!this.cartItems){
                    this.cartItems =  [{
                        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        quantity:1,
                        deliveryId:'1'
                }];
                }
        },


        saveToStorage(){
            localStorage.setItem(storageKey,JSON.stringify(this.cartItems));
        },

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
        
            this.saveToStorage(storageKey);
        },

        removeFromCart(cartItemId){
            this.cartItems.forEach((item, index)=>{
                if(item.productId === cartItemId){
                    this.cartItems.splice(index, 1);
                }
                this.saveToStorage(storageKey);
            });
        
        },

        getCartItems(){
            let totalItems = 0;
            this.cartItems.forEach(item=>{
                totalItems += item.quantity;
            });
        
            return totalItems;
        },

        updateDeliveryDate(productId, deliveryOptionId){

            this.cartItems.forEach(cartItem=>{
                if(cartItem.productId === productId)
                    cartItem.deliveryId = deliveryOptionId;
            });
        
            this.saveToStorage(storageKey);
        }
    }
    return cart;
}

const cart = Cart('normal');
const businessCart = Cart('business');

cart.loadFromStorage();
cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');


businessCart.loadFromStorage();
businessCart.addToCart('58b4fc92-e98c-42aa-8c55-b6b79996769a');
