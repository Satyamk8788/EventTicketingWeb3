import Link from 'next/link'
import ConnectBtn from './ConnectBtn'
import React, { useState } from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import { FaTimes } from 'react-icons/fa'
import Icon from "../utils/logo-transparent-svg.ccd037f9.svg";
import Image from "next/image";

const navigation = [
  { name: "Create", href: "/events/create" },
  { name: "Personal", href: "/events/personal" },
  
]; 
const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
    <header className="absolute inset-x-0 top-0 z-50 ">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <Link href={'/indexy'} className="flex lg:flex-1">
            <Image src={Icon} height={200} width={200} alt="Product Logo" />
          </Link>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >ghgh
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-4    ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 bg-transparent border border-[#f02e65]  hover:[#f02e65] 
                py-2 px-6 text-[#f02e65]  hover:text-white hover:bg-[#f02e65]  rounded-full
                transition duration-300 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
            <div className='mt-'>
            <ConnectBtn networks />
            </div>
            
          </div>
        </nav>
      </header>
    {/* <header className="h-20 shadow-md p-5 sm:px-0 fixed z-50 top-0 right-0 left-0 bg-white">
      <main className="lg:w-2/3 w-full mx-auto flex justify-between items-center flex-wrap">
        <Link href={'/'} className="text-lg font-bold">
          <Image src={Icon} height={200} width={200} alt="Product Logo" />
        </Link>
        <Desktop />
        <Mobile />
      </main>
    </header> */}
    </>
  )
}

const Desktop: React.FC = () => (
  <div className="hidden sm:flex justify-end items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
    <Link
      href={'/events/create'}
      className="text-md hover:text-orange-500 duration-300 transition-all"
    >
      Create
    </Link>
    <Link
      href={'/events/personal'}
      className="text-md hover:text-orange-500 duration-300 transition-all"
    >
      Personal
    </Link>

    <ConnectBtn networks />
  </div>
)

const Mobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="sm:hidden">
      <button onClick={() => setIsOpen(!isOpen)}>
        <CgMenuLeft size={25} />
      </button>
      {isOpen && (
        <div
          className="flex flex-col space-y-4 fixed top-0 right-0 h-full w-64 bg-white
        shadow-md p-4 transition duration-500 ease-in-out transform-all"
        >
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FaTimes size={25} />
            </button>
          </div>

          <Link
            href={'/events/create'}
            className="text-md hover:text-orange-500 duration-300 transition-all block py-1"
          >
            Create
          </Link>

          <Link
            href={'/events/personal'}
            className="text-md hover:text-orange-500 duration-300 transition-all block py-1"
          >
            Personal
          </Link>
          <ConnectBtn />
        </div>
      )}
    </div>
  )
}

export default Header
