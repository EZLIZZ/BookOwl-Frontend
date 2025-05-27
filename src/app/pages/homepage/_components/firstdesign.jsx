"use client";
// import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import "aos/dist/aos.css"; // Import AOS styles
import Link from "next/link"
export default function FirstDesign() {
  return (
    <div
      className=" px-[5%] pt-[80px] bg-[#af886b] text-white p-8 flex flex-col lg:flex-row items-center justify-between"
      data-aos="fade-down"
    >
      {/* Left Section */}
      <div
        className="max-w-xl mb-8 lg:mb-0 lg:mr-14 text-center lg:text-left"
        data-aos="fade-right" // AOS animation for the left section
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif">
          DISCOVER OUR LATEST BOOK COLLECTIONS
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-serif mt-6">
          Dive into the pages, and let the story find you.
        </p>
        <div className="mt-6">
        <Link href="./categorypage">
          <Button className="bg-[#5d768a] text-lg w-40 h-12 text-white hover:scale-105 rounded-full">
            Explore Now
          </Button>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:ml-14" data-aos="fade-left">
        <img
          src="/photos/ballad.jpeg"
          alt="Book"
          className="rounded-3xl shadow-lg max-w-full h-auto"
          width={400}
          height={500}
        />
      </div>
    </div>
  );
}
