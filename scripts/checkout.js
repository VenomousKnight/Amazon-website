import { renderCartSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import '../data/cart-class.js';
//import "../data/bakcend-practice.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";
import { getCartItems } from "../data/cart.js";


loadPage();

async function loadPage() {
    console.log('hello');
    let value;

    try {
       // throw 'error1';
        await loadProductsFetch();

        value = await new Promise((resolve, reject) => {
             // throw 'error';
                loadCart(() => {
                    //reject('errorq');
                    resolve('value');
                });
        });
    } catch (error){

        console.log('Oops something went wrong try again later');
    }
    console.log(value);

    console.log('Page ready');


    renderCartSummary();
    renderPaymentSummary();
    
}


// Promise.all ([
//     loadProductsFetch(),
//     new Promise(resolve => {
//         loadCart(() =>{
//             resolve(getCartItems());
//     }   );
//     })
// ]).then((values) => {
//     console.log(values);
//     renderCartSummary();
//     renderPaymentSummary();
// });

// loadProductsFetch().then(() => {
//     renderCartSummary();
//     renderPaymentSummary();
// });
// loadProducts(() => {
//     renderCartSummary();
//     renderPaymentSummary(); 
// });


// new Promise(resolve => {
//     console.log('start promise');
//     loadProducts(() => {
//         console.log('loaded products');
//         resolve();
//     });
// }).then(() => {
//     console.log('Next step');
// });

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });
// }).then(() =>{
//     renderCartSummary();
//     renderPaymentSummary();
// });



// loadProducts(() => {
//     loadCart(() => {
//         renderCartSummary();
//         renderPaymentSummary();
//     });
// });


// new Promise(resolve => {
//     loadProducts(() =>{
//         loadCart(() => {
//             resolve();
//         });
// }   );
// }).then(() => {
//     renderCartSummary();
//     renderPaymentSummary();
// });

// new Promise(resolve => {
//     loadProducts(() =>{
//         resolve('some value');
// }   );
// }).then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//         loadCart(() =>{
//             resolve()
//         });
//     });
// }).then(() => {
//     renderCartSummary();
//     renderPaymentSummary();
// });


// Promise.all ([
//     new Promise(resolve => {
//         loadProducts(() =>{
//             resolve(getCartItems());
//     }   );
//     }),
//     new Promise(resolve => {
//         loadCart(() =>{
//             resolve(getCartItems());
//     }   );
//     })
// ]).then((values) => {
//     console.log(values);
//     renderCartSummary();
//     renderPaymentSummary();
// });