import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Team", href: "/team", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppBar() {
  return (
    <>
      <Disclosure as="nav" className="bg-red-500 fixed w-full z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-red-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="src/assets/pokemon_logo.svg"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href} // Use 'to' for NavLink
                      className={(
                        { isActive } // className is now a function
                      ) =>
                        classNames(
                          isActive
                            ? "bg-red-700 text-white"
                            : "text-white hover:bg-red-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )
                      }
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive, isPending }) =>
                  classNames(
                    isActive
                      ? "bg-red-900 text-white"
                      : isPending
                      ? "text-white bg-red-800"
                      : "text-white hover:bg-red-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div className="pt-16"></div>
    </>
  );
}
