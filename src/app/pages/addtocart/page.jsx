"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ShoppingCart } from "lucide-react";
import $axios from "@/lib/axios.instance";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "react-toastify";

export default function CartPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
  const userId = localStorage.getItem("id");
  try {
    const response = await $axios.get(`/cart/getCartDetails/${userId}`);
    const book_cart = response?.data.data.items;
    setData(book_cart);
    localStorage.setItem("Book_cart", JSON.stringify(book_cart));
    setTotalPrice(response?.data.data.totalPrice);
  } catch (error) {
    if (error?.response?.status === 404) {
      setData([]);
      setTotalPrice(0);
    } else {
      toast.error("Something went wrong while fetching cart.");
    }
  } finally {
    setLoading(false);
  }
};


  const handleIncreaseQuantity = async (bookId) => {
    const userId = localStorage.getItem("id");
    try {
      await $axios.put(`/cart/updateCart/${userId}`, {
        bookId,
        quantity: 1,
      });
      getData();
    } catch (error) {
      toast.error("Error increasing quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (bookId) => {
    const userId = localStorage.getItem("id");
    try {
      await $axios.put(`/cart/updateCart/${userId}`, {
        bookId,
        quantity: -1,
      });
      getData();
    } catch (error) {
      toast.error("Error decreasing quantity:", error);
    }
  };

  const handleDeleteItem = async (bookId) => {
    const userId = localStorage.getItem("id");
    try {
      await $axios.put(`/cart/removeFromCart/${userId}`, { bookId });
      getData();
    } catch (error) {
      toast.error(error.message)
      // console.error("Error removing book from cart:", error);
    }
  };

  const handleDeleteAll = async () => {
    const userId = localStorage.getItem("id");
    if (!confirm("Are you sure you want to remove all items?")) return;
    try {
      await $axios.put(`/cart/deleteCart/${userId}`);
      setData([]);
      setTotalPrice(0);
    } catch (error) {
      toast.error(error.message)
      // console.error("Error deleting all items:", error);
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
        <Card className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-6 text-[#B83214]">
            <ShoppingCart size={32} className="inline-block text-[#B83214] mr-2" />
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
      <Card className="w-full max-w-7xl bg-white p-3 sm:p-6 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-6 text-[#B83214]">
          <ShoppingCart size={32} className="inline-block text-[#B83214] mr-2" />
          My Cart
        </h1>

        {/* Responsive Cart Items Grid */}
        {/* Table View for Mobile */}
<div className="block sm:hidden overflow-x-auto">
  <Table className="w-full text-sm text-left text-gray-700 ">
    <TableHeader className="bg-[#f5e9dc] text-[#B83214]">
      <TableRow>
        <TableHead className="p-2 ">Image</TableHead>
        <TableHead className="p-2 ">Book</TableHead>
        <TableHead className="p-2 ">Price</TableHead>
        <TableHead className="p-2 ">Qty</TableHead>
        <TableHead className="p-2 "></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((item) => (
        <TableRow key={item._id} className="">
          <TableCell className="p-2 ">
            <img
              src={item.bookId.coverImage}
              alt={item.bookId.bookName}
              className="w-12 h-16 object-cover rounded"
            />
          </TableCell>
          <TableCell className="p-2 ">{item.bookId.bookName}</TableCell>
          <TableCell className="p-2 ">Rs {item.bookId.price.toFixed(2)}</TableCell>
          <TableCell className="p-2 ">
            <div className="flex items-center ">
              <Button variant="transparent" size="sm" onClick={() => handleDecreaseQuantity(item.bookId._id)}>
                -
              </Button>
              <span>{findQuantity(item._id)}</span>
              <Button variant="transparent" size="sm" onClick={() => handleIncreaseQuantity(item.bookId._id)}>
                +
              </Button>
            </div>
          </TableCell>
          <TableCell className="p-2  text-center">
            <button
              onClick={() => handleDeleteItem(item.bookId._id)}
              className="text-gray-500 hover:text-red-600"
            >
              <X size={18} />
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

{/* Grid View for Desktop and Tablet */}
<div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {data.map((item) => (
    <div
      key={item._id}
      className="relative flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white"
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
        className="w-32 h-48 sm:w-36 sm:h-52 md:w-40 md:h-60 object-cover rounded-md mb-4"
      />
      <h2 className="font-medium text-gray-700 text-center">
        {item.bookId.bookName}
      </h2>
      <p className="text-sm text-gray-500 text-center">
        Price: Rs {item.bookId.price.toFixed(2)}
      </p>
      <div className="flex items-center gap-2 mt-4">
        <Button variant="outline" className="px-3 py-1" onClick={() => handleDecreaseQuantity(item.bookId._id)}>
          -
        </Button>
        <span>{findQuantity(item._id)}</span>
        <Button variant="outline" className="px-3 py-1" onClick={() => handleIncreaseQuantity(item.bookId._id)}>
          +
        </Button>
      </div>
    </div>
  ))}
</div>


        {/* Total Price & Actions */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-gray-700">
            Total Price: Rs {totalPrice.toFixed(2)}
          </h2>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
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
