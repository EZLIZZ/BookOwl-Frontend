"use client"; // For client-side rendering

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";

const CollectionCarousel = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await $axios.get("/category/getCategory");
      if (response?.data?.data) {
        setData(response.data.data);
      } else {
        setError("Unexpected response structure");
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    }
  };

  const handleClick = (id) => {
    router.push(`/pages/categorypage?category=${id}`);
  };

  return (
    <div className="bg-white mt-10 px-4 sm:px-6 md:px-10 lg:px-16 sm:py-10 py-5 rounded-full border border-black mx-4 sm:mx-6 md:mx-10 lg:mx-20">
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {data.map((category) => (
          <SwiperSlide key={category._id}>
            <div
              onClick={() => handleClick(category._id)}
              className="flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="h-14 w-14  sm:h-16 sm:w-16 flex items-center justify-center rounded-full bg-slate-400 overflow-hidden">
                <img
                  src={category.categoryIcon}
                  alt={category.categoryName}
                  className="p-1 sm:p-2 w-3/4 h-3/4 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 truncate w-24">
                {category.categoryName}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {error && (
        <p className="mt-4 text-red-500 text-center text-sm">{error}</p>
      )}
    </div>
  );
};

export default CollectionCarousel;
