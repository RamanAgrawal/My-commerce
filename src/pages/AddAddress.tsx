import AddAddressForm from "../features/AddAddressForm"
import { AddressI } from "../models/Models";
import {  updateUserAsync } from "../features/auth/authSlice";
import { AppDispatch } from "../store/store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../features/user/userSlice";

const AddAddress = () => {
    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch<AppDispatch>();
    const navigate=useNavigate()
    // React Hook Form setup for form handling
    const { reset } = useForm<AddressI>();
    const handleSubmitHandler = (address: AddressI) => {
        if (user) {
            dispatch(
                updateUserAsync({ ...user, addresses: [...user.addresses, address] })
            );
        }
        reset();
        navigate('/profile')
       
    }
    return (
        <div className="mx-auto max-w-xl px-2 sm:px-6 lg:px-8 bg-white pt-4">
            <AddAddressForm handleSubmitHandler={handleSubmitHandler} />
        </div>
    )
}

export default AddAddress
