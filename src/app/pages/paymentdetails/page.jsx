"use client";

import React from "react";
import { CreditCard, FileText } from "lucide-react";

const orderDetails = {
  items: [
    { id: 1, name: "Book 1", price: 15.0, quantity: 2 },
    { id: 2, name: "Book 2", price: 20.0, quantity: 1 },
  ],
  totalAmount: 50.0,
};

const userDetails = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123, Kathmandu, Nepal",
};

const paymentDetails = {
  method: "Khalti",
};

const PaymentDetails = () => {
  return (
    <div className="min-h-screen bg-[#e6d4b9] flex items-center justify-center p-6 mt-20">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold font-serif text-[#8F3623] mb-4 flex items-center">
          <FileText className="mr-2" size={20} /> Invoice
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Invoice ID:</strong> 123456789
          </p>
          <p>
            <strong>Date:</strong> 2025-02-22
          </p>
          <p>
            <strong>Due Date:</strong> 2025-03-01
          </p>
        </div>

        <h3 className="text-lg font-semibold text-[#8F3623] font-serif mt-4">
          Customer Details
        </h3>
        <p>{userDetails.name}</p>
        <p>{userDetails.email}</p>
        <p>{userDetails.address}</p>

        <h3 className="text-lg font-semibold text-[#8F3623] font-serif mt-4">
          Ordered Items
        </h3>
        <div className="mt-2 space-y-3">
          {orderDetails.items.map((item) => (
            <div key={item.id} className="flex justify-between border rounded p-2 bg-gray-50">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-blue-600">
                Rs {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-lg font-semibold mt-6">
          <p>Total</p>
          <p>Rs {orderDetails.totalAmount.toFixed(2)}</p>
        </div>

        <h3 className="text-lg font-semibold text-[#8F3623] font-serif mt-4">
          Payment Method
        </h3>
        <p>
          {paymentDetails.method} <CreditCard className="inline-block ml-2" size={16} />
        </p>
      </div>
    </div>
  );
};

export default PaymentDetails;
