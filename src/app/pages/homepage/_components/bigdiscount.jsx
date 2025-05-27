import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Bigdiscount() {
  return (
    <div>
      {/* Aesthetic Big Discount Section (just below the navbar) */}
      <section className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 px-6 text-center overflow-hidden mt-16">
      

        {/* Discount Content */}
        <Card className="relative z-10 max-w-4xl mx-auto rounded-2xl  ">
          <h1 className="text-5xl font-serif font-bold text-gray-800 mt-4 ">
          Dive into  <span className="text-[#5d768a]">our collection</span> and let the magic begin! 
          </h1>
          <p className="text-lg text-gray-700 mb-6 font-serif mt-4">
          "Timeless classics and trending bestsellers – all in one place."
          </p>
          <Link href="/pages/categorypage">
            <button className="bg-[#5d768a] text-white py-3 px-8 rounded-md shadow-md hover:bg-blue-400 mb-4">
              Grab Now
            </button>
          </Link>
        </Card>

        {/* Decorative Animations */}
        <div className="absolute top-16 left-8 w-32 h-32 bg-[#d1d5db] rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#8b5f3f] rounded-full opacity-70 animate-bounce"></div>
       
      </section>
    </div>
  );
}
