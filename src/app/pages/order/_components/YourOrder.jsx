"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import $axios from "@/lib/axios.instance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function YourOrder() {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const userId = localStorage.getItem("id");
    try {
      const response = await $axios.get(`/cart/getCartDetails/${userId}`);
       console.log(response);
      if (!response) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const book_cart = response?.data.data.items;
      setData(book_cart);
      localStorage.setItem("Book_cart", JSON.stringify(book_cart));

      // Dynamically calculate total price
      const calculatedTotal = book_cart.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      setTotalPrice(calculatedTotal);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-5">
      <h1 className="text-lg w-full text-[#8b3623] font-semibold font-serif">
        Your Order Information
      </h1>
      <Card className="rounded-sm h-fit px-7 py-5 space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <h1>Product</h1>
          <p>Total Price</p>
        </div>
        <Separator className="mb-5" />

        {/* Order Items */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            {data.map((item) => (
              <div className="flex flex-col" key={item._id}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center w-[50%] sm:w-[70%]">
                    <img
                      src={
                        item.bookId.coverImage
                          ? item.bookId.coverImage.replace(/\\/g, "/")
                          : "/images/default-cover.jpg"
                      }
                      width={100}
                      height={100}
                      alt="Book Cover"
                    />
                    <h1 className="font-semibold pl-3 text-base text-black">
                      {item.name}
                    </h1>
                  </div>

                  {/* Displaying Item Total (Quantity * Price) */}
                  <p className="pl-5 sm:pl-10 text-right text-themePrimary text-md sm:text-lg font-semibold">
                    {item.quantity} x Rs {item.price} = Rs{" "}
                    {item.quantity * item.price}
                  </p>
                </div>
                <Separator className="my-5" />
              </div>
            ))}
          </div>
        )}
        <Separator />
        {/* Displaying Grand Total */}
        <div className="text-xl flex justify-between">
          <h1 className="text-lg font-semibold">Total</h1>
          <h1 className="text-themePrimary font-semibold">Rs {totalPrice}</h1>
        </div>
      </Card>
    </div>
  );
}
