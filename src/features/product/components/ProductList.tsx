/* eslint-disable @typescript-eslint/no-explicit-any */

import { Fragment, useEffect, useState, ChangeEvent, Dispatch, SetStateAction, FC } from 'react'
import { fetchProductsByFiltersAsync, selectAllProducts, selectTotalItems, selectCategories, fetchCategoriesAsync, fetchBrandsAsync, selectBrands } from '../ProductSlice'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { discountedPrice } from '../../../utils'
import { ITEM_PER_PAGE} from '../../../constent'
import { ProductDataI } from '../../../models/Models'
import Pagination from '../../../components/Pagination'

interface Sort {
    name: string;
    sort: string;
    order: string;
    current: boolean;
}
interface FilterOptions {
    value: string;
    label: string;
    checked: boolean
}

interface Filter {
    id: string,
    name: string,
    options: FilterOptions[]
}

const sortOptions: Sort[] = [

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
    const filters: Filter[] = [

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

    const HandleFilter = (e: ChangeEvent<HTMLInputElement>, section: Filter, option: FilterOptions) => {
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
    const handleSort = (option: Sort) => {
        const newSort = { _sort: option.sort, _order: option.order }
        setSort(newSort)
        // dispatch(fetchProductsByFiltersAsync(newSort))
    }
    const handlePagination = (page: number) => {
        setPage(page)
    }

    return (
        <div className="bg-white border-2 ">
            <div className='mt-10'>
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

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
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
        </div>
    )
}

interface FilterProps {
    HandleFilter: (e: React.ChangeEvent<HTMLInputElement>, section: Filter, option: FilterOptions) => void;
    filters: Filter[]
}
const DesktopFilters: FC<FilterProps> = ({ HandleFilter, filters }) => {
    return <form className="hidden lg:block">


        {filters.map((section) => (
            <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                {({ open }) => (
                    <>
                        <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                            </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            id={`filter-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            onChange={(e) => HandleFilter(e, section, option)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                            className="ml-3 text-sm text-gray-600"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        ))}
    </form>
}
interface MobileFiltersProps extends FilterProps {
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>
}
const MobileFilters: FC<MobileFiltersProps> = ({ mobileFiltersOpen, setMobileFiltersOpen, HandleFilter, filters }) => {

    return (<Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button
                                type="button"
                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">


                            {filters.map((section) => (
                                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-mx-2 -my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-6">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                onChange={(e) => HandleFilter(e, section, option)}
                                                                type="checkbox"
                                                                defaultChecked={option.checked}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </form>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>)
}

interface ConnectedProductListProps {
    products: ProductDataI[];
}
const ProductGrid: FC<ConnectedProductListProps> = ({ products }) => {
    return (<div className="lg:col-span-3">
        <div className="bg-white">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-0 lg:max-w-full lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900"> Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product: ProductDataI) => (
                        <div key={product.id} style={{boxShadow: 'rgba(218, 223, 225) 1px 2px 15px 0px'}} className="group relative p-5 rounded-md">
                            <Link to={`product-detail/${product.id}`}>

                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-44">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">

                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}

                                        </h3>
                                        <h3 className="text-sm text-gray-700">

                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.rating}

                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div>

                                        <p className="text-sm font-medium text-gray-900">${discountedPrice(product)}</p>
                                        <p className="text-sm font-medium text-gray-600 line-through">${product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProductList