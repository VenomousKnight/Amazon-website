export const cart = [];

export function addToCart(cartitemId){

    let matchingProduct;

    cart.forEach(cartItem=>{
        if(cartItem.productId === cartitemId){
            matchingProduct = cartItem;
        }
    });
    if(matchingProduct){
        matchingProduct.quantity++;
    }else{
        cart.push({
            productId: `${cartitemId}`,
            quantity:1
        });
    }
}

