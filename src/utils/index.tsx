/* eslint-disable @typescript-eslint/no-explicit-any */

export const discountedPrice=(item:any)=>{
    return Math.round(item.price*(1-item.discountPercentage/100))
}