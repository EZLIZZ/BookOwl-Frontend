"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  shippingAddress: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
  }),
  paymentMethod: z.enum(["Khalti", "Cash On Delivery"], {
    message: "Please select a valid payment method",
  }),
});

export default function BookForm() {
  const [orderId, setOrderId] = useState();
  const router = useRouter();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderFailure, setOrderFailure] = useState(false);
  // const [orderId, setOrderId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      shippingAddress: { street: "", city: "", state: "" },
      paymentMethod: "",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data) => {
    try {
      const email = localStorage.getItem("email");
      const userId = localStorage.getItem("id");
      const order = { ...data, email };

      const response = await $axios.post(`/order/createOrder/${userId}`, order);
      if (response?.status === 200) {
        setOrderId(response.data.message);
        console.log("OrderId", response.data.message);
      } else {
        throw new Error(
          `Failed to fetch book data. Status: ${response.status}`
        );
      }
      console.log("Response Data", response);
      console.log("Order Submitted", data);
      // setOrderId(response.data.orderId);
      setOrderSuccess(true);
    } catch (error) {
      console.error("Error occurred:", error);
      setOrderFailure(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6D4B9] flex items-center justify-center">
      <div className="container max-w-5xl bg-white shadow rounded p-8">
        <h1 className="text-4xl font-bold font-serif text-[#8B3623] mb-4">
          Book Order Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div className="space-y-2">
              <Label className="text-[#AF886B] text-lg"> Name</Label>
              <Input
                type="text"
                {...register("name")}
                placeholder="Enter your name"
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[#AF886B] text-lg">Phone Number</Label>
              <Input
                type="tel"
                {...register("phone")}
                placeholder="Enter your phone number"
              />
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[#AF886B] text-lg">Shipping Address</Label>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="text"
                  {...register("shippingAddress.street")}
                  placeholder="Street"
                />
                <Input
                  type="text"
                  {...register("shippingAddress.city")}
                  placeholder="City"
                />
                <Input
                  type="text"
                  {...register("shippingAddress.state")}
                  placeholder="State"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[#AF886B] text-lg">Payment Method</Label>
              <div className="flex space-x-6">
                <div
                  className={`cursor-pointer border p-2 rounded-lg ${
                    paymentMethod === "Khalti"
                      ? "border-[#AF886B]"
                      : "border-gray-300"
                  }`}
                  onClick={() => setValue("paymentMethod", "Khalti")}
                >
                  <Image
                    src="/photos/khalti.png"
                    alt="Khalti"
                    width={100}
                    height={40}
                  />
                </div>
                <div
                  className={`cursor-pointer border p-2 rounded-lg ${
                    paymentMethod === "Cash On Delivery"
                      ? "border-[#AF886B]"
                      : "border-gray-300"
                  }`}
                  onClick={() => setValue("paymentMethod", "Cash On Delivery")}
                >
                  <Image
                    src="/photos/cod.png"
                    alt="Cash on Delivery"
                    width={100}
                    height={60}
                  />
                </div>
              </div>
              <Input
                type="text"
                {...register("paymentMethod")}
                value={paymentMethod}
                readOnly
                className="border-gray-300 mt-2"
              />
              <p className="text-red-500 text-sm">
                {errors.paymentMethod?.message}
              </p>
            </div>

            <div className="flex justify-between pt-8">
              <Button type="submit" className="bg-[#8b3623] text-white">
                Submit
              </Button>
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-100"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>

      {orderSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-[#8B3623]">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mt-2">
              Your order has been placed successfully.
            </p>
            <div className="mt-4 flex justify-between">
              <Button
                className="bg-[#8b3623] text-white"
                onClick={() => router.push(`/pages/orderdetails/${orderId}`)}
              >
                View Order Details
              </Button>
              <Button
                variant="outline"
                className="text-gray-600 border-gray-300"
                onClick={() => setOrderSuccess(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {orderFailure && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-red-600 font-serif">
              Order Failed
            </h2>
            <p className="text-[#8F3623] mt-2">
              There was an issue placing your order. Please try again.
            </p>
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                className="text-gray-600 border-gray-300"
                onClick={() => setOrderFailure(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
