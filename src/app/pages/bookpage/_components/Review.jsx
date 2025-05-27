"use client";
// import { useState, useEffect } from "react";
// import { Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import $axios from "@/lib/axios.instance";
export default function Review({ data }) {
  // const [Reviews, setReviews] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await $axios.get(`book/getReviewsAndRating/${data._id}`);
    console.log("Review", response);
    if (!response) {
      throw new Error(`HTTP erroe!:Status: ${response.status}`);
    }
    setReviews(response?.data.data);
  };


  useEffect(() => {
    AOS.init({ duration: 1000 }); // Customize duration as needed
  }, []);

  // const [reviews, setReviews] = useState(initialReviews);
  // const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  // const [selectedRating, setSelectedRating] = useState(null); // For filtering

  // const handleReviewSubmit = () => {
  //   if (!newReview.comment || newReview.rating === 0) {
  //     alert("Please provide both a rating and a comment.");
  //     return;
  //   }

  //   const newReviewData = {
  //     id: reviews.length + 1,
  //     userName: "Anonymous",
  //     rating: newReview.rating,
  //     comment: newReview.comment,
  //     date: new Date().toLocaleDateString(),
  //     avatar: "", // Optional: Could be dynamically fetched
  //   };

  //   setReviews([...reviews, newReviewData]);
  //   setNewReview({ rating: 0, comment: "" });
  // };

  // const filteredReviews = selectedRating
  //   ? reviews.filter((review) => review.rating === selectedRating)
  //   : reviews;

  return <>hello</>;
}
// <div className="p-6 shadow-lg rounded-lg bg-gray-50 max-w-5xl mx-auto mt-8"
// data-aos="fade-out">
//   {/* Ratings Summary */}
//   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
//     <div>
//       <h3 className="text-4xl font-bold font-serif text-gray-800">Ratings & Reviews</h3>
//       <p className="text-gray-600 mt-2">Share your thoughts about this book!</p>
//     </div>
{
  /* <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-yellow-500">4.2</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < 4.2 ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500">({reviews.length} reviews)</span>
        </div> */
}
// </div>

{
  /* Add Review Section */
}
{
  /* <div className="bg-white p-6 rounded-md shadow-md mb-8">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Write a Review</h4>
        <div className="flex items-center gap-2 mb-4">
          <span>Rate this book:</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 cursor-pointer ${
                  i < newReview.rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() =>
                  setNewReview((prev) => ({ ...prev, rating: i + 1 }))
                }
              />
            ))}
          </div>
        </div>
        <textarea
          placeholder="Write your review here..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview((prev) => ({ ...prev, comment: e.target.value }))
          }
          className="w-full h-24 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
        />
        <button
          onClick={handleReviewSubmit}
          className="bg-[#265073] text-white px-4 py-2 rounded-md"
        >
          Submit Review
        </button>
      </div> */
}

{
  /* Reviews Display */
}
{
  /* <div className="space-y-6">
        {data.length > 0 ? (
          data.map((review) => (
            <div
              key={review._id}
              className="flex items-start gap-4 bg-white p-4 rounded-md shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt="Avatar"
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-lg font-bold text-gray-700">
                    {review.userName[0]}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h5 className="text-lg font-medium text-gray-800">
                    {review.userName}
                  </h5>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div> */
}
