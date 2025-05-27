"use client"; // Enable client-side rendering

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";

export default function Recommendation({ data }) {
  const router = useRouter();
  const handleBookClick = (bookId) => {
    router.push(`/pages/bookpage/${bookId}`);
  };
  useEffect(() => {
    AOS.init(); // Initialize AOS for scroll animations
  }, []);

  return (
    <div className="bg-white py-8 px-4  rounded-lg shadow-md border mx-[5%] -mt-3">
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {data.map((book) => (
          <SwiperSlide key={book.book_id}>
            {/* Book Card with AOS Animation */}
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="flex flex-col items-center -mt-5 p-4 space-y-4 bg-gray-50 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              {/* Book Image */}
              <img
                src={book.coverImage}
                alt={book.bookName}
                className="  w-48 h-72 object-cover rounded-lg"
                onClick={() => handleBookClick(book.book_id)}
              />
              {/* Book Info */}
              <div className="text-center">
                {/* <p className="text-gray-600 text-sm">By {book.author}</p> */}
                <h3 className="text-lg font-bold">{book.bookName}</h3>
                {/* <p className="text-gray-800 text-sm">{book.price}</p> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
