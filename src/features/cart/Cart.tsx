import { useDispatch, useSelector } from 'react-redux';
import {ChangeEvent} from 'react'
import {Link} from 'react-router-dom'
import {  deleteItemFromCartAsync, selectCart, updateCartAsync,} from './CartSlice';
import { AppDispatch } from '../../store/store';
import { CartItemI } from '../../models/Models';



const Cart:React.FC =()=> {
const products=useSelector(selectCart)
const dispatch=useDispatch<AppDispatch>()
const totalAmount=products.reduce((amount,item)=>item.price*item.quantity + amount,0)
const totalItems=products.reduce((total,item)=>item.quantity + total,0)
const handleQuntity=(e:ChangeEvent<HTMLSelectElement>,item:CartItemI)=>{

  dispatch(updateCartAsync({...item,quantity:+e.target.value}))
}
const handleDelete=(id:any)=>{
  console.log("firstID:  ",id);
  
dispatch(deleteItemFromCartAsync(id))
}

  return (
<>
<div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 bg-white pt-24">
<h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Shopping Cart</h1>
 <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {products&&products.map((product) => (
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
                <select name="quntity" id="quntity" value={product.quantity} onChange={(e)=>handleQuntity(e,product)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                </div>

                <div className="flex">
                  <button
                  onClick={()=>handleDelete(product.id)}
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
  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
 
    <Link
      to="/checkout"
      className="flex mt-6 items-center justify-center rounded-md border border-transparent bg-yellow-400 px-6 py-3 text-base font-semibold text-black shadow-sm hover:bg-yellow-500"
    >
      Checkout
    </Link>
 
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    <p>
      or
      <Link to="/">
      <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
        // onClick={() => setOpen(false)}
      >
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
      </Link>
      
    </p>
  </div>
</div>
</div>
</>
   
  )
}
export default Cart