import { FC } from "react";
import { Link } from "react-router-dom";
interface SlideData {
  heading: string;
  img: string;
  path: string;
  discount: string;
}

interface SaleSectionCardProps {
  data: SlideData[];
}
const SaleSectionCard: FC<SaleSectionCardProps> = ({ data }) => {
  return (
    <section className="flex flex-col-reverse lg:flex-row w-[96%] m-auto">
      <div className="w-full lg:w-1/2 grid grid-cols-2 gap-2 ">
        {data.map((item) => (
          <Link key={item.heading} to={item.path}>
            <div className=" bg-white p-4 h-full shadow-md  transition-all overflow-hidden">
              <h1 className="tracking-wider font-bold text-xl text-black">
                {item.heading}
              </h1>
              <img
                src={item.img}
                height={500}
                width="full"
                className="h-52 m-auto category-img object-fill hover:scale-110"
                alt=""
              />
              <div className="my-5">
                <span className="bg-red-700 font-bold rounded-md p-1 px-2  text-white">
                  upto {item.discount}% off
                </span>
                <span className="text-red-700 font-bold p-2">Shop Now</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full lg:h-auto h-96 object-center lg:w-1/2 bg-cover align-middle">
        <img src="https://images.bewakoof.com/uploads/grid/app/YearEndSale-1x1-commmon-RMIK--1--1703076004.gif" />
      </div>
    </section>
  );
};

export default SaleSectionCard;
