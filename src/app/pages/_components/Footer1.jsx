import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer1() {
  return (
    <div className="hidden lg:block"> {/* Footer is hidden on small & medium screens */}
      {/* Main Footer Section */}
      <div className="w-full px-4 sm:px-[5%] grid sm:grid-cols-3 grid-cols-1 m-auto gap-8 bg-[#E6D4B9] z-40 border-2 border-[#265073] py-5">
        {/* Logo and Description */}
        <div className="flex flex-col items-center sm:items-start">
          <img src="/photos/logo.png" alt="Book Owl Logo" className="w-32 sm:w-40" />
          <p className="text-[#265073] font-serif text-sm sm:text-lg text-center sm:text-left mt-4">
            BookOwl: Guiding You to Your Next Great Adventure, One Page at a Time!
          </p>
        </div>

        {/* Quick Links, Contact Us, and Location in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-60">
          {/* Quick Links Section */}
          <div className="text-gray-600 w-60">
            <p className="font-bold pb-4 text-lg sm:text-xl text-[#B83214]">Quick Links</p>
            <Link href="/pages/about-us">
              <h1 className="cursor-pointer hover:underline text-sm sm:text-base">About us</h1>
            </Link>
            <Link href="/pages/contactus">
              <h1 className="cursor-pointer hover:underline text-sm sm:text-base">Contact us</h1>
            </Link>
            <Link href="/pages/homepage">
              <h1 className="cursor-pointer hover:underline text-sm sm:text-base">Home</h1>
            </Link>
            <Link href="/pages/categorypage">
              <h1 className="cursor-pointer hover:underline text-sm sm:text-base">Our Collections</h1>
            </Link>
          </div>

          {/* Contact Us Section */}
          <div className="text-gray-600 w-60">
            <p className="font-bold pb-4 text-lg sm:text-xl text-[#B83214]">Contact us</p>
            <h1 className="text-sm sm:text-base flex items-center gap-2">
              <Phone /> +977 9843987416
            </h1>
            <h1 className="text-sm sm:text-base flex items-center gap-2 mt-2">
              <Mail /> bookowl@gmail.com
            </h1>
          </div>

          {/* Location Section */}
          <div className="text-gray-600 w-72">
            <p className="font-bold pb-4 text-lg sm:text-xl text-[#B83214]">Our Location</p>
            <p className="text-sm sm:text-base">Visit us at:</p>
            <p className="text-sm sm:text-base">
              Nepal College of Information Technology (NCIT), Balkumari, Lalitpur, Nepal.
            </p>
            <Link
              href="https://www.google.com/maps?q=Nepal+College+of+Information+Technology"
              target="_blank"
              className="text-[#265073] hover:underline mt-2 block"
            >
              View on Google Maps
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="w-full px-4 sm:px-[5%] bg-[#265073] flex flex-col sm:flex-row justify-between items-center text-white text-sm sm:text-base py-4">
        <h1 className="text-center sm:text-left">@ 2024 BookOwl. All rights reserved</h1>
        <h2 className="mt-2 sm:mt-0 text-center sm:text-right">
          Nepal College Of Information Technology
        </h2>
      </div>
    </div>
  );
}
