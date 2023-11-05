
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

export interface PaginationI {
    _page: number;
    _limit: number;
}
export interface SortI {
    _sort: string;
    _order: string;
}

export interface AuthResI extends UserDataI {
    id: string;
    addresses: AddressI[]
    role: string;
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
    id: string;
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
    deleted?: boolean
}

export interface CategoryI {
    value: string,
    label: string,
    checked: boolean
}

export interface CartItemI {
    product: string
    // user: string;
    quantity: number
}

export interface CartItemResI {
    id: string;
    product: ProductDataI;
    user: string;
    quantity: number
}

export interface OrderI {
    items: { product: string, quantity: number }[];
    totalAmount: number;
    totalItems: number;
    user: string;
    selectedAddress: AddressI;
    PaymentMethod: string;
    status: string;
}
export interface UpdateOrderI {
    status: string;
    id: string
}
export interface OrderResI {
    totalAmount: number;
    totalItems: number;
    user: string;
    selectedAddress: AddressI;
    PaymentMethod: string;
    status: string;
    items: CartItemResI[];
    id: string
}

export interface AdminOrdersI {
    orders: OrderResI[];
    totalOrders: number;
}