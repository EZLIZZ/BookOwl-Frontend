"use client"; // Enable client-side rendering

import { useEffect } from "react";
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
    AOS.init();
  }, []);

  return (
    <div className="bg-white py-4 sm:py-8 px-4 rounded-lg shadow-md border mx-[5%] mb-10 ">
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 2 }, // 2 per view on small screens (phones)
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {data.map((book) => (
          <SwiperSlide key={book.book_id}>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="flex flex-col items-center p-2 sm:p-4 space-y-4 bg-gray-50 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <img
                src={book.coverImage}
                alt={book.bookName}
                className="w-36 h-56 sm:w-44 sm:h-64 md:w-48 md:h-72 object-cover rounded-lg cursor-pointer"
                onClick={() => handleBookClick(book.book_id)}
              />
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-bold">{book.bookName}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
