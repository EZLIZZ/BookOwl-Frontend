"use client";
import $axios from "@/lib/axios.instance";
import { Box, Calendar, CreditCard } from "lucide-react"; // Import Lucide icons
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Orderdetails() {
  const { slug } = useParams();
  const [order, setOrder] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      getOrderDetails();
    }
  }, [slug]);

  const getOrderDetails = async () => {
    try {
      const response = await $axios.get(`/order/getOrderDetailsById/${slug}`);
      console.log(response.data.data._id);
      console.log(response.data.data);
      setOrder(response?.data.data); // Assuming response follows your ApiResponse structure
    } catch (error) {
      console.error(error);
    }
  };

  if (!order) {
    return <p className="text-center text-lg">Loading order details...</p>;
  }

  // if (error) {
  //   return <p className="text-center text-red-500">{error}</p>;
  // }

  return (
    <div className="min-h-screen bg-[#e6d4b9] flex items-center justify-center p-6 mt-10">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold font-serif text-[#8F3623] mb-4">
          Order Details
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Purchased Date:</strong> {order.purchaseDate}
            <Calendar className="inline-block ml-2" size={16} />
          </p>
          <p>
            <strong>Total:</strong> Rs {order.totalPrice}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}{" "}
            <CreditCard className="inline-block ml-2" size={16} />
          </p>
          <p>
            <strong>Shipping Address:</strong> {order.customerDetails.shippingAddress.street},{" "}
            {order.customerDetails.shippingAddress.city}, {order.customerDetails.shippingAddress.state}
          </p>
          <p
            className={`font-semibold ${
              order.deliveryStatus === "Delivered"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {order.deliveryStatus} <Box className="inline-block ml-2" size={16} />
          </p>
        </div>

        <h3 className="text-lg font-semibold text-[#8F3623] font-serif mt-4">Ordered Items</h3>
        <div className="mt-2 space-y-3">
          {order.items.map((item) => (
            <div key={item._id} className="flex items-center space-x-3 border rounded p-2 bg-gray-50">
              <img src={item.bookId.coverImage} alt={item.bookId.bookName} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <p className="text-sm font-medium">{item.bookId.bookName}</p>
                <p className="text-sm font-medium "> Rs {item.bookId.price}</p>

                <p className="text-sm font-medium">x {item.quantity}</p>

              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-start gap-8 mt-20">
          <Link href="/pages/payment" legacyBehavior>
            <a className="inline-block bg-[#265073] text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-[#346B98] transition">
              Proceed to Payment
            </a>
          </Link>

          <Link href="/pages/order" legacyBehavior>
            <a className="inline-block bg-[#265073] text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-[#346B98] transition">
              Back to Order Form
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
