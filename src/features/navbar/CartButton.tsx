import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCart } from "../cart/CartSlice";
import { useEffect, useState } from "react";

const CartButton = () => {
  const cart = useSelector(selectCart);
  const cartItems = cart.reduce((total, item) => item.quantity + total, 0);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState<boolean>(false);

  useEffect(() => {
    if (cartItems === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItems]);

  return (
    <>
      <Link to="/cart" className={btnIsHighlighted ? "bump" : ""}>
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </Link>
      {cartItems > 0 && (
        <span
          className={`${
            btnIsHighlighted ? "bump" : ""
          }inline-flex items-center z-10 rounded-md mb-7 -ml-3 bg-yellow-100 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-red-600/10`}
        >
          {cartItems}
        </span>
      )}
    </>
  );
};

export default CartButton;
