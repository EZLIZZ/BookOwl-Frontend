"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ShoppingCart } from "lucide-react";
import $axios from "@/lib/axios.instance";
import Link from "next/link";
export default function CartPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const userId = localStorage.getItem("id");
    try {
      const response = await $axios.get(`/cart/getCartDetails/${userId}`);
      if (!response) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const book_cart = response?.data.data.items
      setData(response?.data.data.items);
      localStorage.setItem("Book_cart", JSON.stringify(book_cart));
      setTotalPrice(response?.data.data.totalPrice); // Store total price from backend
    } catch (error) {
      console.error("Error fetching cart details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Increase Quantity
  const handleIncreaseQuantity = async (bookId) => {
    const userId = localStorage.getItem("id");
    try {
      await $axios.put(`/cart/updateCart/${userId}`, {
        bookId,
        quantity: 1,
      });
      getData(); // Refresh cart
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // Decrease Quantity
  const handleDecreaseQuantity = async (bookId) => {
    const userId = localStorage.getItem("id");
    try {
      await $axios.put(`/cart/updateCart/${userId}`, {
        bookId,
        quantity: -1,
      });
      getData();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  // Remove Single Item
  const handleDeleteItem = async (bookId) => {
    const userId = localStorage.getItem("id");
    try {
      await $axios.put(`/cart/removeFromCart/${userId}`, { bookId });
      getData();
    } catch (error) {
      console.error("Error removing book from cart:", error);
    }
  };

  // Remove All Items
  const handleDeleteAll = async () => {
    const userId = localStorage.getItem("id");
    if (!confirm("Are you sure you want to remove all items?")) return;

    try {
      await $axios.put(`/cart/deleteCart/${userId}`);
      setData([]);
      setTotalPrice(0); // Reset total price
    } catch (error) {
      console.error("Error deleting all items:", error);
    }
  };

  const findQuantity = (itemId) => {
    const item = data.find((q) => q._id === itemId);
    return item ? item.quantity : 1;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E6D4B9] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-[#E6D4B9] flex flex-col items-center justify-center py-10 px-4 mt-16">
        <Card className="max-w-6xl w-full bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold font-serif text-center mb-6 text-[#B83214]">
            <ShoppingCart size={32} className="text-[#B83214] mr-2" />
            My Cart
          </h1>
          <p className="text-lg text-gray-700 text-center">
            Your cart is empty, nothing to show here.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6D4B9] flex flex-col items-center py-10 px-4 mt-16">
      <Card className="max-w-6xl w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold font-serif text-center mb-6 text-[#B83214]">
          <ShoppingCart size={32} className="text-[#B83214] mr-2" />
          My Cart
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="relative flex flex-col items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => handleDeleteItem(item.bookId._id)}
              >
                <X size={20} />
              </button>
              <img
                src={item.bookId.coverImage}
                alt={item.bookId.bookName}
                className="w-40 h-60 object-cover rounded-md mb-4"
              />
              <h2 className="font-medium text-gray-700 text-center">
                {item.bookId.bookName}
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Price: Rs {item.bookId.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  className="px-3 py-1"
                  onClick={() => handleDecreaseQuantity(item.bookId._id)}
                >
                  -
                </Button>
                <span>{findQuantity(item._id)}</span>
                <Button
                  variant="outline"
                  className="px-3 py-1"
                  onClick={() => handleIncreaseQuantity(item.bookId._id)}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Display Total Price */}
        <div className="mt-6 flex justify-between items-center">
          <h2 className="text-xl font-serif font-semibold text-gray-700">
            Total Price: Rs {totalPrice.toFixed(2)}
          </h2>
        </div>

        {/* Buttons for actions */}
        <div className="flex justify-end items-center mt-6">
          <div className="flex gap-4">
            <Button
              className="bg-[#b83214] text-white hover:bg-[#e75433]"
              onClick={handleDeleteAll}
            >
              Delete All Items
            </Button>
            <Link href="/pages/order">
            <Button className="bg-[#b83214] text-white hover:bg-[#e75433]">
              Proceed to Checkout
            </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
