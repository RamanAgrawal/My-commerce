import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Profile from "../../assets/profile.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../user/userSlice";
import CartButton from "./CartButton";
import { MenuItems, Navigation_Items } from "../../constents";

const classNames = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(" ");
};

const Navbar: React.FC = () => {
  const user = useSelector(selectUserInfo);
  const location = useLocation();
  const { pathname } = location;
  const filteredNavigation = Navigation_Items.filter((item) => {
    if (user) {
      if (user.role === "user" && item.user) {
        return true;
      }
      if (user.role === "admin" && item.admin) {
        return true;
      }
    }
    return false;
  });

  return (
    <Disclosure
      as="nav"
      className="bg-gray-800 border-red-600 fixed w-full z-10"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flexCenter rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to={"/"} className="flex flex-shrink-0 items-center">
                  <img
                    height={32}
                    width={32}
                    className="h-8 w-auto"
                    src="/ecommerce.png"
                    alt="Your Company"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {filteredNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={classNames(
                          item.path === pathname
                            ? " text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.path ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <CartButton />
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    {user ? (
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none ">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full bg-white"
                          src={Profile}
                          alt=""
                        />
          
                      </Menu.Button>
                    ) : (
                      <Link
                        className=" text-white hover:text-gray-400 "
                        to={"/signin"}
                      >
                        login
                      </Link>
                    )}
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {MenuItems.map((item) => (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={item.path}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.title}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {filteredNavigation.map((item) => (
                <Disclosure.Button key={item.name}>
                  <Link
                    to={item.path}
                    className={classNames(
                      item.path === pathname
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.path ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
