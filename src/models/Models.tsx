
export interface UserDataI {
    name?: string;
    email: string;
    password: string
}
export interface AddressI {
    name: string;
    city: string,
    pincode: string,
    street: string,
    state: string,
    email: string,
    phoneNo: string,
}

export interface PaginationI{
    _page:number;
    _limit:number;
}

export interface AuthResI extends UserDataI {
    id?: string | undefined;
    addresses: AddressI[]
    role:string;
}
export interface LoginFormDataI {
    email: string;
    password: string;
}

export interface SignupFormDataI {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface ProductDataI {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    imageAlt: string;
    color: string;
    rating: number;
    images: string[];
    description: string;
    stock?: number;
    discountPercentage?: number;
    brand?: string;
    category?: string;
    deleted?:boolean
}

export interface CategoryI {
    value: string,
    label: string,
    checked: boolean
}

export interface CartItemI {
    id?: number;
    title: string;
    price: number;
    thumbnail: string;
    imageAlt: string;
    color: string;
    rating: number;
    images: string[];
    description: string;
    user: number;
    quantity: number
}

export interface OrderI {
    products: CartItemI[];
    totalAmount: number;
    totalItems: number;
    user: AuthResI | null;
    selectedAddress: AddressI;
    selectedPaymentMethod: string;
    status: string;
    id?: string
}
export interface OrderResI extends OrderI {
    id?: string
}

export interface AdminOrdersI {
    orders:OrderResI[];
    totalOrders:number;
}