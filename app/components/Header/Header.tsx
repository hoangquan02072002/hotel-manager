'use client'

import { useSession } from "next-auth/react";
import ThemeContext from "../../context/themeContext";
import Link from "next/link";
import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import Image from "next/image";

const Header = () => {
const {darkTheme, setDarkTheme} = useContext(ThemeContext);
const { data: session } = useSession();
console.log("user",session)
  return (
    <header className="container flex flex-wrap justify-between items-center px-4 py-10 mx-auto text-xl md:flex-nowrap">
      <div className="flex items-center w-full md:2/3">
        <Link href="/" className="font-black text-tertiary-light">
          Hotel
        </Link>
        <ul className="flex items-center ml-5">
          <li className="flex items-center">
            {session?.user ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (<div className="overflow-hidden w-10 h-10 rounded-full">
                  <Image src={session.user.image} alt={session.user.name ?? 'User'} width={40} height={40} className="img scale-animation"/>
                </div>) : (<FaUserCircle className="cursor-pointer" />)}
            </Link>
            ) : (
              <Link href="/auth">
              <FaUserCircle className="cursor-pointer" />
            </Link>
            )}
          </li>
          <li className="ml-2">
           {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                onClick={() => { setDarkTheme(false);
                    localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => { setDarkTheme(true);
                    localStorage.setItem("hotel-theme",'true');
                }}
              />
            )}
          </li>
        </ul>
      </div>
      <ul className="flex justify-between items-center mt-4 w-full md:w-1/3">
        <li className="transition-all duration-500 hover:translate-y-2">
          <Link href="/"> Home</Link>
        </li>
        <li className="transition-all duration-500 hover:translate-y-2">
          <Link href="/rooms"> Rooms</Link>
        </li>
        <li className="transition-all duration-500 hover:translate-y-2">
          <Link href="/"> Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
