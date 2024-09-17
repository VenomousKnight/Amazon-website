export function currencyFormat(money){
    return ((Math.round(money)/100).toFixed(2));
}

export default currencyFormat;

//EACH FILE CAN ONLY HAVE ONE DEFAULT EXPORT