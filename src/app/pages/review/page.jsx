"use client"
import { Card, CardContent } from "@/components/ui/card";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Review(){ 
  const [reviews,setReviews] = useState([]);
  const router  = useRouter();
useEffect(()=>{
  getReviews();
},[])

const getReviews = async ()=>{
  const user = localStorage.getItem("id");
  try {
    const response = await $axios.get(`/book/getReviewByUserId/${user}`); 
    console.log(response?.data.data);
    setReviews(response?.data.data);
  } catch (error) {
    console.error(error);
  }
 
}
const handleClick = (bookId)=>{
router.push(`/pages/bookpage/${bookId}`)
}

  return (
    <div className="p-6 mt-20 flex justify-center bg-[#f8f1e4]">
      <Card className="w-full max-w-3xl p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl  text-[#8B3623]  font-serif font-bold mb-4">My Reviews</h2>
        {reviews.length === 0 ? (
          <p>Loading..</p>
        ) : (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <Card key={review._id} className="p-4 border rounded-lg shadow"  onClick={()=>{handleClick(review.book._id)}}>
                <CardContent>
                  <h3 className="text-lg text-[#AF886B] font-semibold">{review.book.bookName}</h3>
                  <p className="text-sm text-gray-600">Rating: {review.rating} ⭐</p>
                  <p className="mt-2 text-[#265073]">{review.reviewText}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};


