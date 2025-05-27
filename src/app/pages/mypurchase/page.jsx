"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function MyPurchase() {
  // Hardcoded purchase data (Replace with API later)
  const purchases = [
    { id: 1, title: "The Silent Patient", author: "Alex Michaelides", date: "2024-02-10", price: "Rs 350", status: "Purchased" },
    { id: 2, title: "Atomic Habits", author: "James Clear", date: "2024-02-05", price: "Rs 400", status: "Purchased" },
    { id: 3, title: "Deep Work", author: "Cal Newport", date: "2024-01-28", price: "Rs 450", status: "Pending" },
    { id: 4, title: "The Alchemist", author: "Paulo Coelho", date: "2024-01-15", price: "Rs 550", status: "Canceled" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter purchases by search term
  const filteredPurchases = purchases.filter((purchase) =>
    purchase.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F1E4] p-6 mt-20">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[#8F3623] font-serif font-bold">Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search by book title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 border-[#8F3623] focus:ring-[#A98D78]"
          />

          {/* Purchase List */}
          {filteredPurchases.length > 0 ? (
            <div className="space-y-4">
              {filteredPurchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className={`p-4 rounded-lg border ${
                    purchase.status === "Purchased"
                      ? "border-green-500"
                      : purchase.status === "Pending"
                      ? "border-yellow-500"
                      : "border-red-500"
                  } bg-white`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-[#265073]">{purchase.title}</h3>
                      <p className="text-sm text-gray-600">By {purchase.author}</p>
                      <p className="text-sm text-gray-600">Purchased on: {purchase.date}</p>
                      <p className="font-semibold text-[#8F3623]">Price: {purchase.price}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                        purchase.status === "Purchased"
                          ? "bg-green-100 text-green-700"
                          : purchase.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {purchase.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No purchases found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
