export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order){


    orders.unshift(order);

    saveOrder();
}

function saveOrder(){
    localStorage.setItem('orders', JSON.stringify(orders));
}