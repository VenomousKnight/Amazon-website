export let cart ;

loadFromStorage(); 


export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));


        if(!cart){
            cart =  [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:1,
                deliveryId:'1'
         }];
}

}
export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(cartItemId, number){
    let quantity = Number(number);
    
    let matchingProduct;

    cart.forEach(cartItem=>{
        if(cartItem.productId === cartItemId){
            matchingProduct = cartItem;
        }
    });
    if(matchingProduct){
        matchingProduct.quantity += quantity;
    }else{
        cart.push({
            productId: `${cartItemId}`,
            quantity:quantity,
            deliveryId:'1'
        });
    }

    saveToStorage();
}
export function removeFromCart(cartItemId){
    cart.forEach((item, index)=>{
        if(item.productId === cartItemId){
            cart.splice(index, 1);
        }
        saveToStorage();
    });

}

export function getCartItems(){
    let totalItems = 0;
    cart.forEach(item=>{
        totalItems += item.quantity;
    });

    return totalItems;
}

export function updateDeliveryDate(productId, deliveryOptionId){

    cart.forEach(cartItem=>{
        if(cartItem.productId === productId)
            cartItem.deliveryId = deliveryOptionId;
    });

    saveToStorage();
}


export function upDateCart(cartItemId, number) {
    let quantity = Number(number);
    let matchingProduct = cart.find(cartItem => cartItem.productId === cartItemId);
  
    if (matchingProduct) {
      matchingProduct.quantity = quantity; // Directly update the quantity if the product exists
    }

    saveToStorage();
}