import { useDispatch, useSelector } from 'react-redux'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { AddressI } from '../../../models/Models'
import { selectUserInfo, updateUserAsync } from '../userSlice'
import { AppDispatch } from '../../../store/store'
import EditAddressModal from './EditAddressModal'

const UserProfile: FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const userInfo = useSelector(selectUserInfo)
  const dispatch = useDispatch<AppDispatch>()
  const [address, setAddress] = useState<AddressI>({ name: '', street: '', state: '', pincode: '', phoneNo: '' ,city:'',email:''})
  const [selectedEditIndex, setSelectedEditIndex] = useState<number>(-1);

  const handleDelete = (index: number) => {
    const newItem = userInfo?.addresses.filter((_, i) => i !== index)
    if (userInfo) {
      dispatch(updateUserAsync({ ...userInfo, addresses: newItem || [] }))
    }
  }

  const handleEdit = (addressUpdate:AddressI) => {
    
    if(userInfo){
      const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
      newUser.addresses.splice(selectedEditIndex, 1, addressUpdate);
      dispatch(updateUserAsync(newUser))
      setSelectedEditIndex(-1);
      setOpenModal(false)
    }
  };
  const handleEditForm = (address:AddressI,index:number) => {
    setOpenModal(true)
    setAddress(address)
    setSelectedEditIndex(index)
  }

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 bg-white 4 pt-44">
      <EditAddressModal editAddressData={address} open={openModal} setOpen={setOpenModal} handleSubmitHandler={handleEdit} />
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          <h2 className='text-2xl font-bold mb-2'>
            Name: {userInfo?.name ? userInfo.name : 'Guest'}</h2>
          <h3 className='text-2xl font-bold mb-2'>
            {userInfo?.email}</h3>

        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className='mt-0.5 text-3xl text-gray-500'> Your Address</h1>
        <div className="grid grid-cols-3 gap-5">
          <Link to={'/addaddress'} className=' self-stretch flex justify-center mt-3 items-center p-4 border-dotted border-2 border-gray-400 h-60 rounded-md'>
            <p className='text-4xl'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

              Add Address </p>
          </Link>
          {
            userInfo?.addresses?.map((address, index) => (

              <div key={index} className='p-4 mt-3 self-stretch border-2 relative border-gray-400 h-60 box-border rounded-md'>

                <div className='font-bold'>{address.name}</div>
                <div>{address.street}</div>
                <div>{address.state}</div>
                <div>{address.pincode}</div>
                <div>{address.phoneNo}</div>

                <div className='flex gap-2 absolute bottom-[20px]'>
                  <button
                    onClick={() => handleEditForm(address,index)}
                    type="button"

                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <div>|</div>
                  <button
                    onClick={() => handleDelete(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div >
    </div>


  )
}

export default UserProfile