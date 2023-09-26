import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import{useCart}from "../context/cart"
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Swal from "sweetalert2";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart]=useCart()

  const handleSignOut = () => {
    setAuth({
      ...auth,
      user: null,
    });
    localStorage.removeItem("user");
    Swal.fire({
      position: "top-mid",
      icon: "success",
      title: "Logout-Success",
      showConfirmButton: false,
      timer: 1700,
    });
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-12 w-12"
                      src="https://www.totalitycorp.com/_next/static/media/logo.f83b3df6.webp"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link
                        to="/"
                        className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Home
                      </Link>
                      {auth.user ? (
                        <>
                                         <div className="text-white flex  mt-2.5 font-bold capitalize absolute  right-24">
                                          <p>Hi ! {auth.user.name}</p>
                                          <p className="ml-2">{auth.user.lastname}</p>
                                         </div>

                        </>
                      ) : (
                        <>
                          <Link
                            to="/register"
                            className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Sign up
                          </Link>
                          <Link
                            to="/login"
                            className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Login
                          </Link>
                          
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                   
                  <Link to="/cart">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      
                      <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{cart.length}</div>
                      <BellIcon className="h-7 w-6" aria-hidden="true" />
                    </button>
                  </Link>
                  {auth.user ? (
                          <>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1695673128~exp=1695673728~hmac=c386ec7327b5765a62ea8a428faf4554997a11f8701c0399d595593d8667a7d7"
                          alt=""
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      
                         



                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={handleSignOut}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                          </>
                        ) : (
                          <></>
                        )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Disclosure.Button>
                  <div className="flex space-x-4">
                    <Link
                      to="/"
                      className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Login
                    </Link>
                  </div>
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Header;
