/* eslint-disable @typescript-eslint/no-explicit-any */

export const discountedPrice=(item:any)=>{
    return Math.round(item.price*(1-item.discountPercentage/100))
}

export const setOrderStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'text-purple-600'
        case 'dispatched':
            return 'text-yellow-600'
        case 'delivered':
            return 'text-green-600'
        case 'cancelled':
            return 'text-red-600'
        default:
            break;
    }
}