import { useState, useEffect } from "react";
// import Link from "next/link";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";

export default function Secondmain() {
  const [activeTab, setActiveTab] = useState("New Arrival");
  const [newArrivalData, setNewArrivalData] = useState([]);

  // Static data for other tabs

  useEffect(() => {
    if (activeTab === "New Arrival") {
      getNewArrivalData();
    }
  }, [activeTab]);

  const getNewArrivalData = async () => {
    try {
      const response = await $axios.get("/book/newArrivalsBook");
      console.log(response);
      setNewArrivalData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  };

  const getFilteredData = () => {
    switch (activeTab) {
      case "New Arrival":
        return newArrivalData;
    
      default:
        return [];
    }
  };

  const filteredBooks = getFilteredData();
  const router = useRouter();
  const handleBookClick = (id) => {
    router.push(`/pages/bookpage/${id}`);
    console.log(id);
  };

  return (
    <div className="p-6 flex flex-col items-center mt-8" data-aos="zoom-in-up">
      <h1 className="text-5xl font-serif font-bold text-[#6d433d] mb-6">
        Book Collections
      </h1>
      <p className="font-serif text-2xl text-gray-500 text-center">
        Explore our handpicked selections ranging from timeless literature to
      </p>
      <p className="font-serif text-2xl text-gray-500 text-center">
        contemporary bestsellers across various genres.
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-4 mt-6">
        {["New Arrival"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-[#5d768a] text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-[#9BACB9] transition`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20 mt-6 p-4">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            onClick={() => handleBookClick(book._id)} // Corrected here

            className="flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={book.coverImage || "/images/default-cover.jpg"}
              alt={book.bookName}
              className="w-40 h-60 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-medium mb-2">{book.bookName}</h3>
              <p className="text-gray-500 text-sm mb-1">
                {/* Check if author is an object or a string */}
                By{" "}
                {typeof book.author === "object"
                  ? book.author?.authorName
                  : book.author}
              </p>{" "}
              <p className="text-gray-800 font-medium">Rs {book.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
