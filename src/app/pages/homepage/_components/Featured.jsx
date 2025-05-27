// import React, { useState } from "react";

// export default function Featured() {
//   const [isVisible, setIsVisible] = useState(false);

//   const bookGroups = [
//     [
//       {
//         id: 1,
//         title: "Caaele Bipin",
//         author: "Floyd Mila",
//         price: "$12.00 USD",
//       },
//       {
//         id: 2,
//         title: "A Novel Designer",
//         author: "Robert Fox",
//         price: "$14.00 USD",
//       },
//       {
//         id: 3,
//         title: "Desil A Magazine",
//         author: "B. Simmons",
//         price: "$12.00 USD",
//       },
//       {
//         id: 4,
//         title: "Better Reading",
//         author: "Floyd Mila",
//         price: "$12.00 USD",
//       },
//     ],
//     [
//       {
//         id: 5,
//         title: "The Art of Design",
//         author: "John Doe",
//         price: "$16.00 USD",
//       },
//       {
//         id: 6,
//         title: "Nature Wonders",
//         author: "Jane Smith",
//         price: "$18.00 USD",
//       },
//       {
//         id: 7,
//         title: "World of Books",
//         author: "Emily Davis",
//         price: "$10.00 USD",
//       },
//       {
//         id: 8,
//         title: "Creative Minds",
//         author: "Chris Lee",
//         price: "$20.00 USD",
//       },
//     ],
//   ];

//   const handleToggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   return (
//     <div className="space-y-8 p-4">
//       <button
//         onClick={handleToggleVisibility}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//       >
//         {isVisible ? "Hide Books" : "Show Books"}
//       </button>

//       {isVisible && (
//         <div>
//           {bookGroups.map((group, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6"
//             >
//               {group.map((book) => (
//                 <div
//                   key={book.id}
//                   className="flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
//                 >
//                   <img
//                     src="/photos/cursed.jpeg"
//                     alt={book.title}
//                     className="w-full object-cover rounded-t-lg"
//                   />
//                   <div className="p-4 text-center">
//                     <p className="text-sm text-gray-500">By {book.author}</p>
//                     <h3 className="font-medium text-lg">{book.title}</h3>
//                     <p className="text-sm font-semibold text-gray-700">
//                       {book.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
