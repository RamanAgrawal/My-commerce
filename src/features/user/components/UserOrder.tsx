import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUserOrders, selectUserStatus } from '../userSlice'
import { discountedPrice, setOrderStatusColor } from '../../../utils'
import OrderSkeleton from '../../loaders/OrderSkeleton'



const UserOrder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUserInfo);
  const order = useSelector(selectUserOrders);
  const status=useSelector(selectUserStatus)
  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserOrderAsync());
    }

  }, [dispatch, user]);



  return (
    <div className='pt-16 mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 bg-white'>
      <h1 className='text-4xl font-bold'>Your Orders</h1>
      {status==='loading' && <OrderSkeleton/>}
      {order.length? order.map(order => (
        <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 bg-white 4">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <h2 className='text-2xl font-bold mb-2'>Order #{order.id}</h2>
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
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
            <span>Status : </span>
            <span className={setOrderStatusColor(order.status)}>{order.status}</span>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Item</p>
              <p>{order.totalItems} items</p>
            </div>

          </div>
        </div>
      )):
      <h1 className='mt-16 text-center text-2xl'>Please Order Something</h1>
      }
    </div>
  )
}

export default UserOrder