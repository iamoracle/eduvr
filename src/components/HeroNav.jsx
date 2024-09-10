import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useState } from "react";

const HeroNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex flex-col w-full py-2">
      <div className="flex flex-row items-center gap-x-5 text-sm px-6 md:px-12 py-2 justify-between">
        <div className="flex items-center flex-row">
          <Image
            src="/logo/logo_black2.png"
            width={150}
            height={150}
            className="w-28 object-contain"
            alt="EduVr Logo"
          />

          <ul
            className={`${
              isMenuOpen ? "showNav" : "hideNav"
            } bg-[#fff] shadow-2xl md:shadow-none md:bg-transparent w-full px-6 py-6 gap-y-6 md:gap-y-0 absolute left-0 top-[65px] md:top-0 z-50 ml-0 flex flex-col md:w-auto md:relative md:px-0 md:py-0 md:h-auto md:flex-row gap-x-5 md:ml-12 text-slate-800 md:items-center text-sm font-medium`}
          >
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-none">
                      Mint Passport
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-2 w-full md:w-[370px] lg:w-[370px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md from-muted/50 to-muted no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <Image
                                src="/NFT/educhain.webp"
                                width={200}
                                height={200}
                                alt="NFT Passport"
                                className="w-full object-cover h-[170px] rounded-sm"
                              />
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <div className="text-xs">
                          Mint your Classroom NFT Passport and unlock the
                          ability to create and manage your own classroom in the
                          3D
                        </div>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <Link href="/login">
              <li>Login</li>
            </Link>
          </ul>
        </div>
        <div className="block md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-slate-800"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-slate-800"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
            </svg>
          )}
        </div>
        <ConnectButton accountStatus="address" />
      </div>
    </div>
  );
};

export default HeroNav;
