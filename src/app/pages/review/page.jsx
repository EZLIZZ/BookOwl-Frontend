"use client";
import { Card, CardContent } from "@/components/ui/card";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Review() {
  const [reviews, setReviews] = useState(null); // <-- Start with null to differentiate between loading and empty
  const router = useRouter();

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    const user = localStorage.getItem("id");
    try {
      const response = await $axios.get(`/book/getReviewByUserId/${user}`);
      console.log(response?.data.data);
      setReviews(response?.data?.data || []); // fallback to [] if null
    } catch (error) {
      console.error(error);
      setReviews([]); // set empty if error
    }
  };

  const handleClick = (bookId) => {
    router.push(`/pages/bookpage/${bookId}`);
  };

  return (
    <div className="p-6 mt-20 flex justify-center bg-[#f8f1e4]">
      <Card className="w-full max-w-3xl p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl text-[#8B3623] font-serif font-bold mb-4">
          My Reviews
        </h2>

        {reviews === null ? ( // if still loading
          <p>Loading..</p>
        ) : reviews.length === 0 ? ( // if loaded but empty
          <p>No reviews yet.</p>
        ) : (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <Card
                key={review._id}
                className="pt-6 border rounded-lg shadow cursor-pointer"
                onClick={() => {
                  handleClick(review.book._id);
                }}
              >
                <CardContent className="flex gap-3 items-center">
                  <img
                    src={review.book.coverImage}
                    className="h-20 w-14 object-cover"
                    alt={review.book.bookName}
                  />
                  <div>
                    <h3 className="text-lg text-[#AF886B] font-semibold">
                      {review.book.bookName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Rating: {Number(review.rating).toFixed(2)} ⭐
                    </p>
                    <p className="mt-2 text-[#265073]">{review.reviewText}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
