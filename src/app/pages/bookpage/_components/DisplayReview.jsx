"use client";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import $axios from "@/lib/axios.instance";

export default function DisplayReview({ data }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await $axios.get(`book/getReviewsAndRating/${data._id}`);
      
      // Check if the response data exists and has reviews
      if (!response || !response.data || !response.data.data || response.data.data.length === 0) {
        setReviews([]); // Set reviews to an empty array
        setError(null);  // Clear any previous error
      } else {
        setReviews(response.data.data); // Set reviews from response
        setError(null);  // Clear any previous error
      }
    } catch (err) {
      if (err.response && err.response.status === 500) {
        setReviews([]);
        setError("No reviews available.");
      }
      setError("Book has no Reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Customize duration as needed
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 shadow-lg rounded-lg bg-gray-50 max-w-5xl mx-auto mt-8" data-aos="fade-out">
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="flex items-start gap-4 bg-white p-4 rounded-md shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <img src="/photos/user.jpg" alt="Avatar" className="rounded-full" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h5 className="text-lg font-medium text-gray-800">
                    {review.user ? review.user.name : "Anonymous User"}
                  </h5>
                  <span className="text-sm text-gray-500">{review.createdAt}</span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mt-2">
                  {review.reviewText || "No review text available."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
