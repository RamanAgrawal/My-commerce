import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { resetCartAsync } from "../features/cart/CartSlice";
import { resetOrder } from "../features/order/OrderSlice";
import { selectUserInfo } from "../features/user/userSlice";

const OrderSuccess = () => {

  const param = useParams()
  const user = useSelector(selectUserInfo)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (user?.id) {
      console.log("in orderpage:  ",user.id);
      dispatch(resetCartAsync(+user.id))
      dispatch(resetOrder)
    }
  }, [dispatch,user])


  return (
    <>
      {!param.id && <Navigate to={'/'} replace={true} />}
      <section className="relative min-h-[100vh] max-w-full z-10 bg-indigo-500 py-[120px]">
        <div className="container h-full max-w-fit mx-auto">
          <div className="flex -mx-4">
            <div className="max-w-full mx-auto">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                  Thank You!
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                  Order Placed Successfully               </h4>
                <p className="mb-8 text-lg text-white">
                  Order ID: #{param.id}
                </p>
                <Link
                  to={'/'}
                  className="inline-block px-8 py-3 text-base font-semibold text-center text-white transition border border-white rounded-lg hover:bg-white hover:text-primary"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full space-x-4 -z-10 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
          <div className="flex w-1/3 h-full">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
        </div>
      </section>
    </>
  );
};

export default OrderSuccess;
