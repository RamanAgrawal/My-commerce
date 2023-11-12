/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchProductsByFiltersAsync, selectAllProducts, selectTotalItems, selectCategories, fetchCategoriesAsync, fetchBrandsAsync, selectBrands } from '../ProductSlice'
import { Fragment, useEffect, useState, ChangeEvent, FC } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { ITEM_PER_PAGE } from '../../../constent'

import Pagination from '../../../components/Pagination'
import ProductGrid from './ProductGrid'
import { ProductFilterI, ProductFilterOptionsI, ProductSortI } from '../../../models/Models'
import { DesktopFilters, MobileFilters } from './ProductFilters'


const sortOptions: ProductSortI[] = [

    { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
    { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
    { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]



const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
}
const ProductList: FC = () => {

    const [filter, setFilter] = useState({})
    const [sort, setSort] = useState({})
    const [page, setPage] = useState<number>(1)
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectAllProducts)
    const totalItems = useSelector(selectTotalItems)
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
    const filters: ProductFilterI[] = [

        {
            id: 'category',
            name: 'Category',
            options: categories
        },
        {
            id: 'brand',
            name: 'Brand',
            options: brands
        },
    ]

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEM_PER_PAGE }
        dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }))
    }, [dispatch, filter, sort, page])

    useEffect(() => {
        setPage(1)
    }, [totalItems])

    useEffect(() => {
        dispatch(fetchCategoriesAsync())
        dispatch(fetchBrandsAsync())
    }, [dispatch])

    const HandleFilter = (e: ChangeEvent<HTMLInputElement>, section: ProductFilterI, option: ProductFilterOptionsI) => {
        const newFilter: any = { ...filter }
        if (e.target.checked) {
            if (newFilter[section.id]) {
                newFilter[section.id].push(option.value)
            } else {
                newFilter[section.id] = [option.value]
            }

        } else {
            const index = newFilter[section.id].findIndex((el: string) => el === option.value)
            newFilter[section.id].splice(index, 1)
        }
        setFilter(newFilter)

    }
    //function for handling soring
    const handleSort = (option: ProductSortI) => {
        const newSort = { _sort: option.sort, _order: option.order }
        setSort(newSort)
        // dispatch(fetchProductsByFiltersAsync(newSort))
    }
    const handlePagination = (page: number) => {
        setPage(page)
    }

    return (
        <div className="bg-white border-2 pt-10">
            {/* Mobile filter dialog */}
            <MobileFilters
                filters={filters}
                HandleFilter={HandleFilter}
                mobileFiltersOpen={mobileFiltersOpen}
                setMobileFiltersOpen={setMobileFiltersOpen}
            />

            <main className=" px-4 sm:px-6 lg:px-8 border-red-400">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-9">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">All Products</h1>
                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="p-2">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option.name}>
                                                {({ active }) => (
                                                    <div
                                                        onClick={() => handleSort(option)}

                                                        className={classNames(
                                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <DesktopFilters
                            filters={filters}
                            HandleFilter={HandleFilter} />
                        <ProductGrid products={products} />
                    </div>
                </section>
                <Pagination handlePagination={handlePagination} page={page} totalItems={totalItems} />
            </main>

        </div>
    )
}


export default ProductList