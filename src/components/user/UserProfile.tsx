
import { useSelector } from 'react-redux'
import { selectLoggedInuser } from '../auth/authSlice'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AddressI } from '../../models/Models'


const UserProfile: FC = () => {

  const user = useSelector(selectLoggedInuser)


  const handleDelete = (id: number) => {
    console.log(id);
  }

  const handleEdit = (address: AddressI, id: number): void => {
    console.log(address, id);

  }

  return (
    <div
      className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-32 bg-white 4 pt-36"
    >
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          <h2 className='text-2xl font-bold mb-2'>
            Name: {user?.name ? user.name : 'Guest'}</h2>
          <h3 className='text-2xl font-bold mb-2'>
            {user?.email}</h3>

        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className='mt-0.5 text-3xl text-gray-500'> Your Address</h1>
        <div className="flex justify-between flex-wrap">
          <Link to={'/addaddress'} className='flex justify-center mt-3 items-center p-4 border-dotted border-2 border-gray-400 h-60 lg:w-[32%] sm:w-auto rounded-md'>
            <p className='text-4xl'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

              Add Address </p>
          </Link>
          {
            user?.addresses.map((address, index) => (

              <div key={index} className='p-4 mt-3 border-2 relative border-gray-400 h-60 lg:w-[32%] md:w-[24rem] box-border rounded-md'>

                <div className='font-bold'>{address.name}</div>
                <div>{address.street}</div>
                <div>{address.state}</div>
                <div>{address.pincode}</div>
                <div>{address.phoneNo}</div>

                <div className='flex gap-2 absolute bottom-[20px]'>
                  <button
                    onClick={() => handleEdit(address, index)}
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