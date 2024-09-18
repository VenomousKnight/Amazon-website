export let cart = JSON.parse(localStorage.getItem('cart'));


if(!cart){
    cart =  [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryId:'1'
    }];
}

export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(cartItemId){

    let matchingProduct;

    cart.forEach(cartItem=>{
        if(cartItem.productId === cartItemId){
            matchingProduct = cartItem;
        }
    });
    if(matchingProduct){
        matchingProduct.quantity++;
    }else{
        cart.push({
            productId: `${cartItemId}`,
            quantity:1,
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