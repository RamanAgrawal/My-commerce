import { useForm } from "react-hook-form";
import { AddressI } from "../models/Models";

import { useEffect } from 'react'
import { Link } from "react-router-dom";

interface AddAddressFormProps {
    handleSubmitHandler: (address: AddressI) => void;
    editAddressData?:AddressI;
    hideCancelButton?:boolean;
}

const AddAddressForm = ({ handleSubmitHandler,editAddressData,hideCancelButton }: AddAddressFormProps) => {
    const { register, handleSubmit, setValue } = useForm<AddressI>();
    
    useEffect(() => {
        if (editAddressData) {
            // Iterate through the fields in editAddressData and set their values
            Object.keys(editAddressData).forEach((field) => {
                const key = field as keyof AddressI;
                const value = editAddressData[key];
                setValue(key, value);
            });
        }
    }, [editAddressData, setValue]);

    return (
        <form onSubmit={handleSubmit(handleSubmitHandler)}>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"> */}
                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="label">
                        Full name
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("name", { required: 'name is required' })}
                            type="text"
                            id="name"
                            autoComplete="given-name"
                            className="input"
                        />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label htmlFor="email" className="label">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("email", { required: "please enter a valid email", pattern: { value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi, message: 'invalid email' } })}

                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="input"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="phone" className="label">
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
                    <label htmlFor="street-address" className="label">
                        Street address
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register("street", { required: 'street is required' })}
                            id="street-address"
                            autoComplete="street-address"
                            className="input"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="label">
                        City
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register("city", { required: 'city is required' })}
                            id="city"
                            autoComplete="address-level2"
                            className="input"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="state" className="label">
                        State / Province
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register("state", { required: 'state is required' })}
                            id="state"
                            autoComplete="address-level1"
                            className="input"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="pinCode" className="label">
                        ZIP / Postal code
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register("pincode", { required: 'pincode is required' })}
                            id="pincode"
                            autoComplete="pincode"
                            className="input"
                        />
                    </div>
                </div>
                {/* </div> */}
            </div>
            <div className="mt-6 flexEnd gap-x-6">
               {!hideCancelButton&& <Link
                    to='/profile'
                    className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </Link>}
                <button
                    type="submit"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {editAddressData ? 'Edit' : 'Add'} Address
                </button>
            </div>

        </form>
    )
}

export default AddAddressForm