
import { useSelector } from 'react-redux'
import { selectLoggedInuser } from '../auth/authSlice'
import { FC } from 'react'
import { Address } from '../checkout/Checkout'


const UserProfile: FC = () => {

  const user = useSelector(selectLoggedInuser)


  const handleDelete = (id: number) => {
    console.log(id);
  }

const handleEdit=(address:Address,id:number) :void=>{
console.log(address,id);

}

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 bg-white 4 pt-44">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          <h2 className='text-2xl font-bold mb-2'>
            Name: {user?.name ? user.name : 'Guest'}</h2>
          <h3 className='text-2xl font-bold mb-2'>
            {user?.email}</h3>

        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <p className='mt-0.5 text-sm text-gray-500'> Your Address</p>
        <div className="flex gap-3 flex-wrap">
        {
          user?.addresses.map((address, index) => (
          
          <div key={index} className='p-4 border-solid border-2 border-gray-400 h-60 w-72 rounded-md'>
             <div className='font-bold'>{address.name}</div>
             <div>{address.street}</div>
             <div>{address.state}</div>
             <div>{address.pincode}</div>
             <div>{address.phoneNo}</div>

             <div className='flex gap-1 absolute bottom-5'>
             <button
                onClick={() => handleEdit(address,index)}
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