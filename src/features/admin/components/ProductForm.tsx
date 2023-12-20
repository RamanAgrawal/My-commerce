/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux"
import {
    clearSelectedProduct,
    createProductAsync,
    fetchSingleProductAsync,
    selectBrands,
    selectCategories,
    selectSingleProduct,
    updateProductAsync
} from "../../product/ProductSlice"
import { useForm } from "react-hook-form"
import { AppDispatch } from "../../../store/store"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Model from "../../../components/Model";
import { toast } from 'react-toastify';


const ProductForm = () => {

    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const selectedProduct = useSelector(selectSingleProduct);
    const [openModel, setOpenModel] = useState(false);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        // formState: { errors },
    } = useForm();

    useEffect(() => {
        if (params.id) {
            dispatch(fetchSingleProductAsync(params.id))
        } else {
            dispatch(clearSelectedProduct({}))
        }
    }, [params.id, dispatch])

    useEffect(() => {
        if (selectedProduct && params.id) {
            setValue('title', selectedProduct.title);
            setValue('description', selectedProduct.description);
            setValue('price', selectedProduct.price);
            setValue('discountPercentage', selectedProduct.discountPercentage);
            setValue('thumbnail', selectedProduct.thumbnail);
            setValue('stock', selectedProduct.stock);
            setValue('image1', selectedProduct.images[0]);
            setValue('image2', selectedProduct.images[1]);
            setValue('image3', selectedProduct.images[2]);
            setValue('brand', selectedProduct.brand);
            setValue('category', selectedProduct.category);
        }

    }, [selectedProduct, params.id, setValue])


    const submitHandler = async (data: any) => {
        const product = { ...data };
        product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail
        ]
        delete product['image1'];
        delete product['image2'];
        delete product['image3'];
        product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage;
        if (params.id) {
            product.id = params.id;
            await dispatch(updateProductAsync(product));
            toast.success("product updated", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                
            })
            navigate('/admin')
        } else {
            await dispatch(createProductAsync(product));
            navigate('/admin')
        }
        reset()
    }


    const handleDelete = async () => {
        if (selectedProduct) {
            const product = {
                ...selectedProduct,
                deleted: true,
            };
            await dispatch(updateProductAsync(product))
            setOpenModel(false)
            navigate('/admin');
            toast.error('Product Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }

    }


    return (
        <form className='w-[80%]  pt-16 mx-auto bg-white px-10'
            onSubmit={
                handleSubmit(submitHandler)}>
           
            {openModel && <Model setOpenModel={setOpenModel} handleDelete={handleDelete} />}
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="title"
                                className="label"
                            >
                                Product Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('title', {
                                            required: 'name is required',
                                        })}
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="description"
                                className="label"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    {...register('description', {
                                        required: 'description is required',
                                    })}
                                    rows={3}
                                    className="input"
                                    defaultValue={''}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Write a few sentences about product.
                            </p>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="brand"
                                className="label"
                            >
                                Brand
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register('brand', {
                                        required: 'brand is required',
                                    })}
                                >
                                    <option value="">--choose brand--</option>
                                    {brands.map((brand) => (
                                        <option key={brand.value} value={brand.value}>
                                            {brand.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="category"
                                className="label"
                            >
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register('category', {
                                        required: 'category is required',
                                    })}
                                >
                                    <option value="">--choose category--</option>
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="price"
                                className="label"
                            >
                                Price
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        {...register('price', {
                                            required: 'price is required',
                                            min: 1,
                                            max: 10000,
                                        })}
                                        id="price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="discountPercentage"
                                className="label"
                            >
                                Discount Percentage
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        {...register('discountPercentage', {
                                            required: 'discountPercentage is required',
                                            min: 0,
                                            max: 100,
                                        })}
                                        id="discountPercentage"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="stock"
                                className="label"
                            >
                                Stock
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        {...register('stock', {
                                            required: 'stock is required',
                                            min: 0,
                                        })}
                                        id="stock"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="thumbnail"
                                className="label"
                            >
                                Thumbnail
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('thumbnail', {
                                            required: 'thumbnail is required',
                                        })}
                                        id="thumbnail"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image1"
                                className="label"
                            >
                                Image 1
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image1', {
                                            required: 'image1 is required',
                                        })}
                                        id="image1"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image2"
                                className="label"
                            >
                                Image 2
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image2', {
                                            required: 'image is required',
                                        })}
                                        id="image2"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image2"
                                className="label"
                            >
                                Image 3
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image3', {
                                            required: 'image is required',
                                        })}
                                        id="image3"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-6 flexEnd gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                {selectedProduct && <button
                    type="button"
                    onClick={() => setOpenModel(prev => !prev)}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Delete
                </button>}
                <button
                    type="submit"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default ProductForm