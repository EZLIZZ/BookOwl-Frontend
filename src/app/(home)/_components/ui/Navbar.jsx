"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, SquareX } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const navDarkItems = [
  { id: 1, name: "Browse", href: "/browse" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <MobileNav />
      <div
        className={`hidden fixed w-full lg:flex justify-between items-center pl-[5%] z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#BA9C84] shadow-md" : "bg-transparent"
        }`}
        data-aos="fade-down"
      >
        <Link href="/">
          <img src="/photos/logo.png" alt="Logo" />
        </Link>

        <NavigationMenu className="flex gap-10 text-[#945F39] px-[5%] mr-[5%]">
          <NavigationMenuList className="flex gap-24">
            {navDarkItems.map((item) => (
              <NavigationMenuItem key={item.id}>
                <Link href={item.href} className="text-white">
                  {item.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <Button asChild variant="outline" className="text-white ml-16 bg-transparent">
            <Link href="/login">Login</Link>
          </Button>
        </NavigationMenu>
      </div>
    </div>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden fixed w-full z-50">
      <div className="h-[50px] bg-[#f5dac7] w-full flex justify-between items-center px-[10px]">
        <img src="/photos/logoBird.png" alt="Logo" className="h-12"  />

        <Menu className="size-8 cursor-pointer" onClick={toggleMenu} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
          <div className="absolute right-0 w-[70%] h-screen bg-[#945F39] z-50 p-4 shadow-lg flex flex-col">
            <div className="flex justify-end">
              <SquareX className="size-8 cursor-pointer text-white" onClick={toggleMenu} />
            </div>

            <NavigationMenu className="text-white block">
              <NavigationMenuList className="flex flex-col gap-y-5 items-start">
                {navDarkItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <Link href={item.href} className="text-white">
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>

              <Button asChild variant="outline" className="text-white mt-5 bg-transparent">
                <Link href="/login">Login</Link>
              </Button>
            </NavigationMenu>
          </div>
        </>
      )}
    </div>
  );
}
