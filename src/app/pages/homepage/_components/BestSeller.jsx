"use client"
import $axios from "@/lib/axios.instance";
import { useEffect, useState } from "react";

export default function BestSeller() {
    // const bookGroups = [
    //   [
    //     {
    //       id: 1,
    //       title: "Caaele Bipin",
    //       author: "Floyd Mila",
    //       price: "$12.00 USD",
         
    //     },
    //     {
    //       id: 2,
    //       title: "A Novel Designer",
    //       author: "Robert Fox",
    //       price: "$14.00 USD",
          
    //     },
    //     {
    //       id: 3,
    //       title: "Desil A Magazine",
    //       author: "B. Simmons",
    //       price: "$12.00 USD",
        
    //     },
    //     {
    //       id: 4,
    //       title: "Better Reading",
    //       author: "Floyd Mila",
    //       price: "$12.00 USD",
          
    //     },
    //   ],
    //   [
    //     {
    //       id: 5,
    //       title: "The Art of Design",
    //       author: "John Doe",
    //       price: "$16.00 USD",
          
    //     },
    //     {
    //       id: 6,
    //       title: "Nature Wonders",
    //       author: "Jane Smith",
    //       price: "$18.00 USD",
          
    //     },
    //     {
    //       id: 7,
    //       title: "World of Books",
    //       author: "Emily Davis",
    //       price: "$10.00 USD",
          
    //     },
    //     {
    //       id: 8,
    //       title: "Creative Minds",
    //       author: "Chris Lee",
    //       price: "$20.00 USD",
          
    //     },
    //   ],
    // ];
  
    const [data, setData] = useState([]);
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      // try {
      const response = await $axios.get("/book/getBooks");
      console.log(response);
      if (!response) {
        throw new Error(`HTTP erroe!:Status: ${response.status}`);
      }
      setData(response?.data.data);
      // } catch (err) {
      // setErrorMap(err.message);
      // }
    };
    return (
      <div className="space-y-8 p-4">
        {/* {data.map((group, index) => ( */}
          <div
            // key={index}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {data.map((book) => (
              <div
                key={book.ISBN}
                className="flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                {/* <img
                  src= "/photos/cursed.jpeg"
                  alt={book}
                  className="w-full  object-cover rounded-t-lg"
                /> */}
                 <img
                      src={
                        book.coverImage.replace(/\\/g, "/")  
                          // : "/images/default-cover.jpg"
                      }
                      alt="Cover Image"
                      className="w-full h-full object-contain"
                    />
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-500">By {book.author.authorName}</p>
                  <h3 className="font-medium text-lg">{book.bookName}</h3>
                  <p className="text-sm font-semibold text-gray-700">
                    {book.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        {/* // ))} */}
      </div>
    );
  }
  