import { useEffect, useState } from 'react'
import {
    fetchAllOrdersAsync,
    selectOrders,
    //  selectTotalOrders
} from '../../order/OrderSlice';
import { discountedPrice } from '../../../utils';
import { ITEM_PER_PAGE} from '../../../constent'
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { PencilIcon, EyeIcon } from '@heroicons/react/24/outline';


const AdminOrders = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(1)

    const orders = useSelector(selectOrders);
    // const totalOrders = useSelector(selectTotalOrders);

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEM_PER_PAGE }
        dispatch(fetchAllOrdersAsync(pagination))
      
    }, [dispatch, page])

    return (
        <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen flex mt-14 justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full lg:w-5/6">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Order#</th>
                                    <th className="py-3 px-6 text-left">Products</th>
                                    <th className="py-3 px-6 text-center">Total</th>
                                    <th className="py-3 px-6 text-center">Shipping Add</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {
                                    orders.map((order) => (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2">

                                                    </div>
                                                    <span className="font-medium">{order.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">{order.products.map(item => (
                                                <div className="flex items-center">
                                                    <div className="mr-2">
                                                        <img
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.thumbnail}
                                                        />
                                                    </div>
                                                    <span>{item.title} - #{item.quantity} - ${discountedPrice(item)}</span>
                                                </div>))}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center">
                                                    ${order.totalAmount}
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="">
                                                    <strong>{order.selectedAddress.name} </strong>
                                                    <div>{order.selectedAddress.street}</div>
                                                    <div>{order.selectedAddress.state}</div>
                                                    <div>{order.selectedAddress.pincode}</div>
                                                    <div>{order.selectedAddress.phoneNo}</div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <EyeIcon className='w-6 h-6' onClick={ ()=> setPage(1)} />
                                                    </div>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <PencilIcon className='w-6 h-6' />
                                                    </div>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">

                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminOrders