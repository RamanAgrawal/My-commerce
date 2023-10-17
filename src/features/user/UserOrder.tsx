import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { selectLoggedInuser } from '../auth/authSlice'
import { fetchLoggedInUserOrderAsync, selectUserOrders } from './userSlice'



const UserOrder = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectLoggedInuser)
  const order = useSelector(selectUserOrders)
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchLoggedInUserOrderAsync(+user.id))
    }

  }, [dispatch,user])
  console.log(order);

  return (
    <div className='pt-16'>{order && order.map(order => (
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 bg-white 4">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <h2 className='text-2xl font-bold mb-2'>Order #{order.id}</h2>
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {order.products.map((product) => (
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
                      <div className="text-gray-500">Qty-{order.totalItems}
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
            <p>${order.totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{order.totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

        </div>
      </div>
    ))}</div>

  )
}

export default UserOrder