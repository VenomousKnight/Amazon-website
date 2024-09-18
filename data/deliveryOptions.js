export const deliveryOptions = [
    {
        id:'1',
        deliveryDays:7,
        priceCents:0
    },
    {
        id:'2',
        deliveryDays:3,
        priceCents:499
    },
    {
        id:'3',
        deliveryDays:1,
        priceCents:999
    }
];

export function getDeliveryDay(cartItem){

    let day = 0;
  
    deliveryOptions.forEach(option=>{
      if(cartItem.deliveryId === option.id)
        day = option.deliveryDays;
    });
  
    return day;
  }

  
export function getShippingCost(cartItemDeliveryId){

    let cost = 0;
    deliveryOptions.forEach(option=>{
        if(option.id === cartItemDeliveryId)
            cost = option.priceCents;
    });

    return cost;
}