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

export interface AuthResI extends UserDataI {
    id?: string | undefined;
    addresses: AddressI[]
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
    thumbnail:string;
    imageAlt:string;
    color:string;
    rating:number; 
    images:string[];
    description:string
  }

export interface CartItemI {
    id: number;
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

export interface OrderI{
    products: CartItemI[];
    totalAmount: number;
    totalItems: number;
    user: AuthResI | null;
    selectedAddress: AddressI;
    selectedPaymentMethod: string;
    status: string;
}
export interface OrderResI extends OrderI{
    id:string
}