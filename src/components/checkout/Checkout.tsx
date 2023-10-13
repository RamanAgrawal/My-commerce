/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Navigate } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, deleteItemFromCartAsync, selectCart, updateCartAsync, } from '../cart/CartSlice';
import { AppDispatch } from '../../store/store';
import { useForm } from 'react-hook-form';
import { selectLoggedInuser, updateUserAsync } from '../auth/authSlice';
import { Order, createOrderAsync, selectCurrentOrder } from '../order/OrderSlice';



export interface Address {
    name: string;
    city: string,
    pincode: string,
    street: string,
    state: string,
    email: string,
    phoneNo: string,
}

// Checkout component
const Checkout = () => {
    // React Hook Form setup for form handling
    const { register, handleSubmit, reset } = useForm<Address>();


    // States to manage selected address and payment method
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('cash');

    // Selecting data from Redux store using useSelector
    const products = useSelector(selectCart);
    const user = useSelector(selectLoggedInuser);
    const currentOrder = useSelector(selectCurrentOrder);

    // Dispatch function for Redux actions
    const dispatch = useDispatch<AppDispatch>();

    // Calculate total amount and total items in the cart
    const totalAmount = products.reduce((amount, item) => item.price * item.quantity + amount, 0);
    const totalItems = products.reduce((total, item) => item.quantity + total, 0);

    // Function to handle quantity change for items in the cart
    const handleQuantity = (e: ChangeEvent<HTMLSelectElement>, item: CartItem) => {
        dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
    }

    // Function to delete an item from the cart
    const handleDelete = (id: number) => {
        dispatch(deleteItemFromCartAsync(id));
    }

    // Function to handle address selection
    const handleAddress = (addressIndex: number) => {
        if (user) {
            setSelectedAddress(user?.addresses[addressIndex]);
        }
    }

    // Function to handle payment method selection
    const handlePayment = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedPaymentMethod(e.target.value);
    }

    // Function to place an order
    const handleOrder = () => {
        if (selectedAddress && selectedPaymentMethod) {
            const order: Order = {
                products,
                totalAmount,
                totalItems,
                user,
                selectedAddress,
                selectedPaymentMethod,
                status: 'pending'
            };
            dispatch(createOrderAsync(order));
        } else {
            alert('Enter Address and Payment method');
        }
    }

    const handleSubmitHandler = (data: any) => {
        if (user) {
            dispatch(
                updateUserAsync({ ...user, addresses: [...user.addresses, data] })
            );
        }
        reset();
    }


    return (
        <>  {!products.length && (alert("please add something first"), <Navigate to={'/'} />)}
            {currentOrder && <Navigate to={`/order-succcess/${currentOrder.id}`} replace={true} />}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 p-10">
                <div className="lg:col-span-3 bg-white p-10">
                    <form onSubmit={handleSubmit(handleSubmitHandler)}>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("name", { required: 'name is required' })}
                                            type="text"
                                            id="name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("email", { required: "please enter a valid email", pattern: { value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi, message: 'invalid email' } })}

                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone No.
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type='tel'
                                            id="phone"
                                            {...register("phoneNo", { required: 'phoneNo is required' })}
                                            autoComplete="phone"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        />

                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("street", { required: 'street is required' })}
                                            id="street-address"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("city", { required: 'city is required' })}
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("state", { required: 'state is required' })}
                                            id="state"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("pincode", { required: 'pincode is required' })}
                                            id="pincode"
                                            autoComplete="pincode"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Address
                            </button>
                        </div>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Choose from Existing Address
                            </p>
                            <ul role="list" className="divide-y divide-gray-100">
                                {user && user.addresses.map((address: Address, index) => (
                                    <li key={index} className="flex justify-between gap-x-6 py-3 border-solid border-4 mb-3 p-2">
                                        <div className="flex gap-x-4 overflow-hidden">
                                            <input type="radio"
                                                onChange={() => handleAddress(index)}
                                                name="address"
                                                value={index}
                                                className='h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600'
                                            />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                <span className="mt-1 truncate text-xs leading-5 text-gray-500">,{address.city}</span>

                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.state}</p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">{address.phoneNo}</p>
                                            <p className="text-sm leading-6 text-gray-900">{address.email}</p>

                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">{address.pincode}</p>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 space-y-10">
                                {/* ******************************Payments**************************** */}
                                <fieldset>
                                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                                        Payment Methods
                                    </legend>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                onChange={handlePayment}
                                                id="cash"
                                                name="payment"
                                                value="cash"
                                                type="radio"
                                                checked={selectedPaymentMethod === "cash"}
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                Cash
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                onChange={handlePayment}
                                                id="card"
                                                name="payment"
                                                value="card"
                                                type="radio"
                                                checked={selectedPaymentMethod === "card"}
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                Card
                                            </label>
                                        </div>

                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </form>
                </div >
                <div className="lg:col-span-2">
                    <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 bg-white pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Shopping Cart</h1>
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <li key={product.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <p >{product.title}</p>
                                                        </h3>
                                                        <p className="ml-4">{product.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="text-gray-500">Qty-
                                                        <select name="quntity" id="quntity" value={product.quantity} onChange={(e) => handleQuantity(e, product)}>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                        </select>
                                                    </div>

                                                    <div className="flex">
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${totalAmount}</p>
                            </div>
                            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                <p>Total Items in Cart</p>
                                <p>{totalItems} items</p>
                            </div>
                            {/* <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p> */}

                            <div
                                onClick={handleOrder}
                                className="flex mt-6 items-center justify-center rounded-lg border border-transparent bg-yellow-400 px-6 py-3 text-base font-medium text-black
                         shadow-lg hover:bg-yellow-500 cursor-pointer" >
                                Order Now
                            </div>

                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or
                                    <Link to="/">
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        //onClick={() => setOpen(false)}
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </Link>

                                </p>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default Checkout