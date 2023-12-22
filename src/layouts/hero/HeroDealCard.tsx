import { Link } from "react-router-dom";

/**
 * HeroDealCard component
 * @param {object} cardData - Data for the card
 * @param {string} cardData.heading - Heading for the card
 * @param {string} cardData.img - Image for the card
 * @param {string} cardData.discount - Discount for the card
 * @param {string} cardData.alt - Alt text for the image
 * @param {string} cardData.path - Path for the link
 */

interface HeroDealCardProps {
  cardData: {
    heading: string;
    img: string;
    discount: string;
    alt: string;
    path: string;
  };
}


const HeroDealCard: React.FC<HeroDealCardProps> = ({ cardData }) => {
  return (
    <div className="h-[370px] w-full bg-white rounded-lg p-4 z-[6] shadow-md hover:scale-110 transition-all">
      {/* Heading */}
      <h1 className="tracking-wider font-semibold text-2xl text-black">
        {cardData.heading}
      </h1>
      {/* Image */}
      <img
        src={cardData.img}
        className="h-52 mx-auto category-img object-fill"
        alt={cardData.alt} // Alt text for accessibility
      />
      {/* Discount and Deals */}
      <div className="my-5">
        <span className="bg-red-700 font-bold rounded-md p-1 px-2 text-white">
          Up to {cardData.discount}% off
        </span>
        <span className="text-red-700 font-bold p-2">Best Deals</span>
      </div>
      {/* See More link */}
        <Link to={cardData.path}>
      <div className="rounded p-3 text-center font-semibold text-white bg-primary">
     See More </div></Link>
    </div>
  );
};

export default HeroDealCard;
