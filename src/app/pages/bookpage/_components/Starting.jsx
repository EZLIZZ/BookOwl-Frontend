"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Starting({ data }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const router = useRouter();
  const rating = data.averageRating || 0;
  const userId = localStorage.getItem("id");

  // State for showing the notification
  // const [notification, setNotification] = useState("");

  const handleAddCart = async () => {
    try {
      const bookkoId = { bookId: data._id };
      const response = await $axios.post(`/cart/addToCart/${userId}`, bookkoId);
      toast(
        () => (
          <div className="flex items-center gap-4">
            <span>Book added to cart!</span>
            <Button
              onClick={() => {
                router.push("/pages/addtocart"); // Optional: close the toast manually
              }}
              className="bg-[#AF886B] hover:opacity-90 text-white px-3 py-1 rounded text-sm"
            >
              Go to Cart
            </Button>
          </div>
        ),
        { autoClose: 5000 } // Optional: controls how long toast stays visible
      );
      console.log(response);

      // Show success notification
      // setNotification("Book successfully added to cart!");

      // Hide notification after 5 seconds
      // setTimeout(() => setNotification(""), 6000);
    } catch (error) {
      console.log(error);
      // setNotification("Failed to add book to cart.");
      setTimeout(() => setNotification(""), 6000);
    }
  };

  return (
    <div className="relative p-6 max-w-5xl mx-auto bg-white shadow flex flex-row gap-3 sm:gap-8 mt-20">
      {/* Notification Message */}
      {/* {notification && (
        <div className="absolute top-0 right-0 bg-[#AF886B] text-white font-serif px-4 py-2 rounded shadow flex items-center gap-4">
          <span>{notification}</span>
          {notification === "Book successfully added to cart!" && (
            <Button
              className="bg-white text-[#A98D78] hover:bg-[#E6D4B9] px-3 py-1 rounded-full font-serif"
              onClick={() => router.push("/pages/addtocart")}
            >
              View Cart
            </Button>
          )}
        </div>
      )} */}

      {/* Left Column: Book Cover */}
      <div
        className="flex flex-col items-center w-1/3 sm:w-1/2"
        data-aos="fade-right"
      >
        <img
          src={
            data?.coverImage
              ? data.coverImage.replace(/\\/g, "/")
              : "/images/default-cover.jpg"
          }
          alt="Cover Image"
          className="w-auto sm:w-80 h-auto object-contain rounded-sm"
        />
      </div>

      {/* Right Column: Book Details */}
      <div
        className="flex flex-col mt-50 sm:mt-24 lg:mt-3 w-2/3 lg:w-1/2"
        data-aos="fade-left"
      >
        <p className="text-gray-500 text-md sm:text-lg italic">
          By {data.author.authorName}
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-[#b68a6a] mb-2">
          {data.bookName}
        </h1>

        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 sm:h-6 w-5 sm:w-6 ${
                i < Math.floor(rating) || (i < rating && rating % 1 !== 0)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              fill={i < Math.floor(rating) ? "currentColor" : "none"}
            />
          ))}
          <span className="ml-2 text-gray-600">
            ({Number(rating).toFixed(2)})
          </span>
        </div>

        <p className="text-md sm:text-lg font-semibold text-green-600 mb-2">
          Price: Rs {data.price}
        </p>
        <p className="text-gray-600 mb-2">{data.bookSummary}</p>
        <p className="text-gray-500">
          <span className="font-bold">Category:</span>{" "}
          {data.category.length > 0
            ? data.category.map((cat) => cat.categoryName).join(", ")
            : "N/A"}
        </p>
        <p className="text-gray-500">
          <span className="font-bold">Pages:</span> {data.pages}
        </p>
        <p className="text-gray-500">
          <span className="font-bold">Published Date:</span>{" "}
          {new Date(data.publishedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-gray-500">
          <span className="font-bold">Language:</span> {data.language}
        </p>
        <p className="text-gray-500">
          <span className="font-bold">ISBN:</span> {data.ISBN}
        </p>
        <p className="text-gray-500">
          <span className="font-bold">Published By:</span> {data.publisher}
        </p>
        <p className="text-gray-500">
          <span className="font-bold">Mood:</span>{" "}
          {data.mood.length > 0 ? data.mood.join(", ") : "N/A"}
        </p>

        <div className="flex gap-4 mt-6">
          {/* <Button className="rounded-full bg-[#265073]">Buy Now</Button> */}
          <Button className="rounded-full bg-[#265073]" onClick={handleAddCart}>
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
