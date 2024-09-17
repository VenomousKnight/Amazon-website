export const cart = [
    {
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2   
    }
];

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
            quantity:1
        });
    }
}
export function removeFromCart(cartItemId){
    cart.forEach((item, index)=>{
        if(item.productId === cartItemId){
            cart.splice(index, 1);
        }

    });

}