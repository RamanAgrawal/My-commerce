import { useEffect, useState } from "react";
import { discountedPrice } from "../../utils";
interface ProductI {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

interface SecondCardProps {
  products: ProductI[];
}
const SecondCard = ({ products }: SecondCardProps) => {
  const [data, setData] = useState({ active: 0, product: products[0] });

  useEffect(() => {
    const intervel = setInterval(() => {
      if (data.active < products.length - 1) {
        setData({
          active: data.active + 1,
          product: products[data.active + 1],
        });
      } else {
        setData({ active: 0, product: products[0] });
      }
    }, 3000);

    return () => clearInterval(intervel);
  }, [data.active,products]);

  return (
    <div className="w-full h-[450px] p-4 bg-white">
      <h1 className="font-bold text-2xl uppercase">Explore</h1>
      <div className="flexCenter flex-col h-[75%]">
        <img
          src={data.product.thumbnail}
          className="object-cover h-2/3 mx-auto"
        />
        <p className=" text-sm">{data.product.description}</p>
        <div className="flex justify-start items-center w-full gap-3">
          <span className="text-4xl tracking-tight text-gray-900">
            ${discountedPrice(data.product)}
          </span>
          <p>
            <span className="text-1xl tracking-tight text-gray-600">
              M.R.P.:
            </span>
            <span className="text-1xl tracking-tight text-gray-600 line-through">
              ${data.product.price}
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 w-full">
        {products.map((product, i) => (
          <div
            key={i}
            onClick={() => setData({ active: i, product })}
            className={`p-3 flexCenter rounded-lg cursor-pointer ${
              data.active == i
                ? "border-4 border-blue-600"
                : "border-2 border-gray-500 "
            }`}
          >
            <img src={product.thumbnail} className="h-10 w-10" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondCard;
