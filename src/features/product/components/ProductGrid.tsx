import { Link } from "react-router-dom";
import { ProductDataI } from "../../../models/Models";
import { discountedPrice } from "../../../utils";
import { FC } from "react";
import { useSelector } from "react-redux";
import { selectProductStatus } from "../ProductSlice";
import ProductListSkeleton from "../../loaders/ProductListSkeleton";

interface ConnectedProductListProps {
    products: ProductDataI[];
}
const ProductGrid: FC<ConnectedProductListProps> = ({ products }) => {
    const status = useSelector(selectProductStatus)
    return (<>
        <div className="lg:col-span-3">
            <div className="bg-white">
                <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-0 lg:max-w-full lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900"> Products</h2>
                    {status === 'loading' && <ProductListSkeleton />}

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {products.map((product: ProductDataI) => (
                            <div key={product.id} style={{ boxShadow: 'rgba(218, 223, 225) 1px 2px 15px 0px' }} className="group relative p-5 rounded-md">
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
    </>
    )
}

export default ProductGrid