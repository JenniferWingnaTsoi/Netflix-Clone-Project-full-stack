import React, { useCallback, useEffect, useState } from 'react';
import { AiFillBell, AiOutlineSearch } from 'react-icons/ai'
import { BsChevronCompactDown } from 'react-icons/bs';

import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  //styles
  const navBarBox:string = "w-full fixed z-40"
  const navBarBg:string = `px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`
  const navbarItemsBox:string = "flex-row ml-8 gap-7 hidden lg:flex"
  const navBarInSmallScr:string = "lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
  const chevDownMobMenuIcon:string =`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`
  const functionBar:string="flex flex-row ml-auto gap-7 items-center"
  const searchBox:string="text-gray-200 hover:text-gray-300 cursor-pointer transition"
  const notifyBox:string="text-gray-200 hover:text-gray-300 cursor-pointer transition"
  const accountMenu:string = "flex flex-row items-center gap-2 cursor-pointer relative"
  const userIcon:string = "w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden"
  const chevDownAccMenuIcon =`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`
  return (
    <nav className={navBarBox}>
      <div className={navBarBg}>
        <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" />
        <div className={navbarItemsBox}>
          <NavbarItem label="Home" active />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div onClick={toggleMobileMenu} className={navBarInSmallScr}>
          <p className="text-white text-sm">Browse</p>
          <BsChevronCompactDown className={chevDownMobMenuIcon} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className={functionBar}>
          <div className={searchBox}>
            <AiOutlineSearch size={30} className="w-6" />
          </div>
          <div className={notifyBox}>
            <AiFillBell size={30} className="w-6" />
          </div>
          <div onClick={toggleAccountMenu} className={accountMenu}>
            <div className={userIcon}>
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronCompactDown size={30} className={chevDownAccMenuIcon} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
