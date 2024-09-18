export function currencyFormat(money){
    return ((Math.round(money)/100).toFixed(2));
}