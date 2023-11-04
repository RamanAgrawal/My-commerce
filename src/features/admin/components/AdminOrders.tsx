import { useEffect, useState, ChangeEvent, FC } from 'react'
import {
    fetchAllOrdersAsync,
    selectOrders,
    selectTotalOrders,
    updateOrderAsync
} from '../../order/OrderSlice';
import { discountedPrice, setOrderStatusColor } from '../../../utils';
import { ITEM_PER_PAGE } from '../../../constent'
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { PencilIcon, EyeIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import {  OrderResI, SortI } from '../../../models/Models';
import Pagination from '../../../components/Pagination';


const AdminOrders = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<SortI>({ _sort: 'id', _order: 'desc' })
    const [editableOrderId, setEditableOrderId] = useState<string>('')

    const orders = useSelector(selectOrders);
    
    const totalOrders = useSelector(selectTotalOrders);

    const handlePagination = (page: number) => {
        setPage(page)
    }

    const handleSort = (sortOption: SortI) => {
        const sort = { _sort: sortOption._sort, _order: sortOption._order };
        console.log({ sort });
        setSort(sort);
    };

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEM_PER_PAGE };
        dispatch(fetchAllOrdersAsync({ pagination, sort }));
    }, [dispatch, page, sort])



    const handleEdit = (order: OrderResI) => {
        if (order.id) {
            setEditableOrderId(order.id)
        }

    }

    const handleOrderStatus = (e: ChangeEvent<HTMLSelectElement>, order: OrderResI) => {
        const updatedOrder = {id:order.id, status: e.target.value} ;
        console.log(updatedOrder);
        
        dispatch(updateOrderAsync(updatedOrder))
        setEditableOrderId('')
    }


    const SortIcon: FC<{ sortOrder: string }> = ({ sortOrder }) => {
        if (sortOrder === 'desc') {
            return <ArrowDownIcon className='w-4 h-4 inline' />
        } else {
            return <ArrowUpIcon className='w-4 h-4 inline' />
        }
    }


    return (
        <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen flex mt-14 justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full lg:w-5/6">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left" onClick={() => handleSort({
                                        _sort: 'id',
                                        _order: sort?._order === 'asc' ? 'desc' : 'asc',
                                    })}
                                    >
                                        Order# {sort._sort === 'id' && <SortIcon sortOrder={sort._order} />}
                                    </th>
                                    <th className="py-3 px-6 text-left">Products</th>
                                    <th className="py-3 px-6 text-center"
                                        onClick={() => handleSort(
                                            {
                                                _sort: 'totalAmount',
                                                _order: sort?._order === 'asc' ? 'desc' : 'asc',
                                            })
                                        }
                                    >
                                        Total Amount {sort._sort === 'totalAmount' && <SortIcon sortOrder={sort._order} />}</th>
                                    <th className="py-3 px-6 text-center">Shipping Add</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {
                                    orders?.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2">

                                                    </div>
                                                    <span className="font-medium">{order.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">{order.items.map(item => (
                                                <div className="flex items-center" key={item.id}>
                                                    <div className="mr-2">
                                                        <img
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.product.thumbnail}
                                                        />
                                                    </div>
                                                    <span>{item.product.title} - #{item.quantity} - ${discountedPrice(item.product)}</span>
                                                </div>))}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center">
                                                    ${order.totalAmount}
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="max-w-xs">
                                                    <strong>{order.selectedAddress.name} </strong>
                                                    <div>{order.selectedAddress.street}</div>
                                                    <div>{order.selectedAddress.state}</div>
                                                    <div>{order.selectedAddress.pincode}</div>
                                                    <div>{order.selectedAddress.phoneNo}</div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {order.id && order.id == editableOrderId ? <select onChange={(e) => handleOrderStatus(e, order)}>
                                                    <option value="pending">Pending</option>
                                                    <option value="dispatched">Dispatched</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select> :
                                                    <span className={`${setOrderStatusColor(order.status)}py-1 px-3 rounded-full text-xs`}>
                                                        {order.status}
                                                    </span>
                                                }
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <EyeIcon className='w-6 h-6' />
                                                    </div>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <PencilIcon className='w-6 h-6' onClick={() => handleEdit(order)} />
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
            <Pagination handlePagination={handlePagination} page={page} totalItems={totalOrders} />
        </div>

    )
}

export default AdminOrders