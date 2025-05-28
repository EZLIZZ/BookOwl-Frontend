"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";

export default function DealsCarousel({ data }) {
  useEffect(() => {
    AOS.init();
  }, []);

  const router = useRouter();

  const handleBookClick = (id) => {
    router.push(`/pages/bookpage/${id}`);
  };

  return (
    <div className="bg-white py-6 px-4 sm:px-6 md:px-10 lg:px-16 rounded-xl shadow-md border mx-4 sm:mx-6 md:mx-10 lg:mx-20 mt-4 sm:mt-6 md:mt-10">
      <Swiper
        spaceBetween={16}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 2 }, // Mobile
          640: { slidesPerView: 3 }, // Small tablets
          768: { slidesPerView: 4 }, // Tablets
          1024: { slidesPerView: 5 }, // Desktops
        }}
      >
        {data.map((book) => (
          <SwiperSlide key={book._id}>
            <div
              onClick={() => handleBookClick(book._id)}
              data-aos="fade-up"
              data-aos-duration="1000"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              {/* Book Cover */}
              <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden flex items-center justify-center">
                <img
                  src={
                    book?.coverImage
                      ? book.coverImage.replace(/\\/g, "/")
                      : "/images/default-cover.jpg"
                  }
                  alt={book.bookName}
                  className="object-contain max-h-full"
                />
              </div>

              {/* Book Info */}
              <div className="text-center mt-4 space-y-1">
                <p className="text-xs sm:text-sm text-gray-600">
                  By {book.author.authorName}
                </p>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 w-full line-clamp-2 h-10 sm:h-12">
                  {book.bookName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  Rs {book.price}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
