"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ShoppingCart, Menu, X } from "lucide-react";
import $axios from "@/lib/axios.instance";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { id: 1, name: "Home", href: "/pages/homepage" },
  { id: 2, name: "About Us", href: "/pages/about-us" },
  { id: 3, name: "Contact Us", href: "/pages/contactus" },
];

export default function Navbar1() {
  const router = useRouter();
  const [userInitial, setUserInitial] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("name");
    if (userName) setUserInitial(userName.charAt(0).toUpperCase());
    const storedProfilePicture = localStorage.getItem("profilePicture");
    if (storedProfilePicture) setProfilePicture(storedProfilePicture);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      await $axios.post("/auth/logout");
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#E6D4B9] shadow-lg" : "bg-white"
      } text-[#5d768a]`}
    >
      <div className="flex justify-between items-center px-[5%] py-2">
        {/* Logo */}
        <Link href="/pages/homepage">
          <img
            src="/photos/logo.png"
            alt="Logo"
            className="h-14 object-contain"
          />
        </Link>

        {/* Right Side: Mobile buttons + desktop nav */}
        <div className="flex items-center gap-4">
          {/* Mobile: Menu + User */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* User avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 font-medium">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-[#af886b] rounded-full text-white font-semibold select-none uppercase">
                      {userInitial}
                    </div>
                  )}

                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white border z-50 border-gray-200 rounded-md shadow-md w-44 mt-2"
                align="end"
              >
                {/** user menu items... (same as your original) */}
                <DropdownMenuItem asChild>
                  <Link
                    href="/pages/userdashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/pages/mypurchase"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Purchase History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/pages/myorder"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/pages/review"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Reviews
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                        Logout
                      </div>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#8F3623] font-serif text-xl">
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[#265073] font-serif text-lg">
                          Do you really want to logout?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-[#8F3623]">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-[#265073] text-white"
                          onClick={logout}
                        >
                          OK
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-lg hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/pages/addtocart" aria-label="Cart">
              <ShoppingCart className="w-6 h-6 hover:text-gray-900" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 font-medium">
                 {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-[#af886b] rounded-full text-white font-semibold select-none uppercase">
                      {userInitial}
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white border border-gray-200 rounded-md shadow-md w-44 mt-2"
                align="end"
              >
                {/** user menu items... (same as your original) */}
                <DropdownMenuItem asChild>
                  <Link
                    href="/pages/userdashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/pages/mypurchase"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Purchase History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/pages/myorder"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/pages/review"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Reviews
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                        Logout
                      </div>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#8F3623] font-serif text-xl">
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[#265073] font-serif text-lg">
                          Do you really want to logout?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-[#8F3623]">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-[#265073] text-white"
                          onClick={logout}
                        >
                          OK
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-4 px-[5%] py-4 z-40">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-base text-[#5d768a] hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/pages/addtocart"
            className="flex items-center gap-2 text-base hover:text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart className="w-5 h-5" /> Cart
          </Link>
        </div>
      )}
    </header>
  );
}
