import { FC } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ITEM_PER_PAGE} from '../constent'

interface PaginationProps {
    handlePagination: (page: number) => void
    page: number;
    totalItems: number
}

const Pagination: FC<PaginationProps> = ({ handlePagination, page, totalItems }) => {
    return (
        <div className="flexBetween border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {page > 1 ? <div
                    onClick={() => handlePagination(page - 1)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </div> : <div></div>}
                {<div
                    onClick={() => handlePagination(page + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </div>}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(page - 1) * ITEM_PER_PAGE + 1}</span> to <span className="font-medium">{page * ITEM_PER_PAGE < totalItems ? page * ITEM_PER_PAGE : totalItems}</span> of
                        <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {page > 1 && <div
                            onClick={() => handlePagination(page - 1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </div>}
                        {/* Current: "z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {Array.from({ length: Math.ceil(totalItems / ITEM_PER_PAGE) }).map((_, index) => (
                            <div
                                onClick={() => handlePagination(index + 1)}
                                key={index}
                                aria-current="page"
                                className={`relative cursor-pointer z-10 inline-flex items-center ${index + 1 === page ? 'bg-primary text-white' : 'bg-white text-indigo-600'} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                {index + 1}
                            </div>
                        )

                        )}
                        {page * ITEM_PER_PAGE !== totalItems &&totalItems>ITEM_PER_PAGE && <div
                            onClick={() => handlePagination(page + 1)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </div>}
                    </nav>
                </div>
            </div>
        </div>
    )
}


export default Pagination