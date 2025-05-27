
"use client";
import { useState } from "react";
import Link from "next/link";

const bookStyle = {
  transform:
    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
  transformStyle: "preserve-3d",
};

const books = [
    // New Arrivals
    {
      id: 1,
      title: "Caaele Bipin",
      author: "Floyd Mila",
      price: "$12.00 USD",
      category: "New Arrival",
    },
    {
      id: 2,
      title: "A Novel Designer",
      author: "Robert Fox",
      price: "$14.00 USD",
      category: "New Arrival",
    },
    {
      id: 3,
      title: "Shadows of the Mind",
      author: "Eliza Green",
      price: "$15.00 USD",
      category: "New Arrival",
    },
    {
      id: 4,
      title: "Echoes of Eternity",
      author: "Martin Blake",
      price: "$17.00 USD",
      category: "New Arrival",
    },
    {
      id: 5,
      title: "The Lost Path",
      author: "Cassandra Lee",
      price: "$13.50 USD",
      category: "New Arrival",
    },
    {
      id: 6,
      title: "Whispers in the Forest",
      author: "Hannah Green",
      price: "$14.00 USD",
      category: "New Arrival",
    },
    {
      id: 7,
      title: "The Golden Key",
      author: "Arthur Gable",
      price: "$15.50 USD",
      category: "New Arrival",
    },
    {
      id: 8,
      title: "Dreams of Tomorrow",
      author: "Sophia Turner",
      price: "$16.00 USD",
      category: "New Arrival",
    },
  
    // Best Sellers
    {
      id: 9,
      title: "Desil A Magazine",
      author: "B. Simmons",
      price: "$12.00 USD",
      category: "Best Seller",
    },
    {
      id: 10,
      title: "Better Reading",
      author: "Floyd Mila",
      price: "$12.00 USD",
      category: "Best Seller",
    },
    {
      id: 11,
      title: "Breaking Barriers",
      author: "Emma Roberts",
      price: "$18.00 USD",
      category: "Best Seller",
    },
    {
      id: 12,
      title: "Legends of the Sky",
      author: "Andrew Miles",
      price: "$19.50 USD",
      category: "Best Seller",
    },
    {
      id: 13,
      title: "Voices of the Sea",
      author: "Clara Johnson",
      price: "$20.00 USD",
      category: "Best Seller",
    },
    {
      id: 14,
      title: "Rays of Hope",
      author: "Michael Grey",
      price: "$21.00 USD",
      category: "Best Seller",
    },
    {
      id: 15,
      title: "Journey to the Stars",
      author: "Evelyn Harper",
      price: "$22.00 USD",
      category: "Best Seller",
    },
    {
      id: 16,
      title: "Winds of Change",
      author: "Daniel Craig",
      price: "$18.50 USD",
      category: "Best Seller",
    },
  
    // Featured
    {
      id: 17,
      title: "The Art of Design",
      author: "John Doe",
      price: "$16.00 USD",
      category: "Featured",
    },
    {
      id: 18,
      title: "Nature Wonders",
      author: "Jane Smith",
      price: "$18.00 USD",
      category: "Featured",
    },
    {
      id: 19,
      title: "Timeless Treasures",
      author: "Rachel King",
      price: "$25.00 USD",
      category: "Featured",
    },
    {
      id: 20,
      title: "Secrets of the Universe",
      author: "David Stone",
      price: "$24.00 USD",
      category: "Featured",
    },
    {
      id: 21,
      title: "Beyond the Horizon",
      author: "Amy Porter",
      price: "$23.00 USD",
      category: "Featured",
    },
    {
      id: 22,
      title: "Reflections of the Past",
      author: "William Clarke",
      price: "$22.50 USD",
      category: "Featured",
    },
    {
      id: 23,
      title: "Threads of Fate",
      author: "Isabella Brooks",
      price: "$21.50 USD",
      category: "Featured",
    },
    {
      id: 24,
      title: "Enchanted Realms",
      author: "Sophia Morgan",
      price: "$26.00 USD",
      category: "Featured",
    },
  ];
  


export default function Secondmain() {
  const [activeTab, setActiveTab] = useState("New Arrival");
  // const [data , setData]= useState();
  // useEffect(()=>{
  //   getData();
  // },[]);

  // const getData = async () => {
  //    const response = await $axios.get("/book/newArrivalsBook");
  //           console.log(response);
  //           if (!response) {
  //               throw new Error(`HTTP error status: ${response.status}`);
  //           }
  //           setData(response?.data.data);
  //       };
        
  

  // Filter books based on the active tab
  const filteredBooks = books.filter((book) => book.category === activeTab);

  return (
    <div className="p-6 flex flex-col items-center mt-8" data-aos="zoom-in-up">
      <h1 className="text-5xl font-serif font-bold text-[#6d433d] mb-6">
        Book Collections
      </h1>
      <p className="font-serif text-2xl text-gray-500 text-center">
        Explore our handpicked selections ranging from timeless literature to</p>
        <p className="font-serif text-2xl text-gray-500 text-center"> contemporary bestsellers across various genres.
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-4 mt-6">
        {["New Arrival", "Best Seller", "Featured"].map((tab) => (
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
            key={book.id}
            className="flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <img
              src="/photos/cursed.jpeg"
              alt={book.title}
              style={bookStyle}
              className="w-40 h-60 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-medium mb-2">{book.title}</h3>
              <p className="text-gray-500 text-sm mb-1">By {book.author}</p>
              <p className="text-gray-800 font-medium">{book.price}</p>
            </div>
            <Link href={`/book/${book.id}`}>
            
            </Link>
          </div>
        ))}
      </div>
 
    </div>

  );
}

