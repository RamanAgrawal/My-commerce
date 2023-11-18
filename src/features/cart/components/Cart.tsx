import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteItemFromCartAsync, selectCart, updateCartAsync, } from '../CartSlice';
import { AppDispatch } from '../../../store/store';
import { CartItemResI } from '../../../models/Models';
import { discountedPrice } from '../../../utils';
import { selectLoggedInUser } from '../../auth/authSlice';
import Model from '../../../components/Model';
import { toast } from 'react-toastify';



const Cart: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);
  const [editID,setEditId]=useState<string>('')
  const cart = useSelector(selectCart)
  const dispatch = useDispatch<AppDispatch>()
  const totalAmount = cart.reduce((amount, item) => discountedPrice(item.product) * item.quantity + amount, 0)
  const totalItems = cart.reduce((total, item) => item.quantity + total, 0);
  const user = useSelector(selectLoggedInUser)


  const handleQuantity = (e: ChangeEvent<HTMLSelectElement>, item: CartItemResI) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }))
  }

  const handleDelete = (id: string) => {
    setOpenModel(true);
    setEditId(id)
  }
  const deleteHandler=async()=>{
    await dispatch(deleteItemFromCartAsync(editID))
    setOpenModel(false)
    toast.error('Item removed from cart', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  return (<>
    {openModel && <Model setOpenModel={setOpenModel} handleDelete={deleteHandler} />}
    <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 bg-white pt-24">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Shopping Cart</h1>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cart && cart.map((item) => (
              <li key={item.product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <p >{item.product.title}</p>
                      </h3>
                      <p className="ml-4">${discountedPrice(item.product)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.product.rating}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">Qty-
                      <select name="quntity" id="quntity" value={item.quantity} onChange={(e) => handleQuantity(e, item)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={() => handleDelete(item.id)}
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
      {/* <div className="flex justify-center h-36 items-center"> */}



      {/* </div> */}

      {cart.length ? <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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
                className="font-medium text-indigo-600 hover:text-indigo-500 pl-1"
              // onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>

          </p>
        </div>
      </div> :
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1>Your Cart is Empty</h1>
          {!user && <div className='flex flex-wrap gap-2'>
            <Link
              to="/signin"
              className="flex mt-6 items-center justify-center rounded-lg border border-transparent bg-yellow-400 px-6 text-base font-semibold text-black shadow-sm hover:bg-yellow-500"
            >
              Sign in to your account
            </Link>
            <Link
              to="/signup"
              className="flex mt-6 py-1 items-center justify-center rounded-lg border border-transparent px-6 text-base font-semibold text-black shadow-sm shadow-slate-600 hover:bg-gray-200"
            >
              Sign up now
            </Link>
          </div>}
        </div>
      }
    </div></>
  )
}
export default Cart