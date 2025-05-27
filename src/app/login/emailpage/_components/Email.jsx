"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Forget from "./Forget";
import { useState } from "react";
import $axios from "@/lib/axios.instance";

export default function EmailPage() {
  const [isForgetVisible, setIsForgetVisible] = useState(false);
  const [email, setEmail] = useState(""); // To store the email input value
  const [error, setError] = useState(""); // To store the error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Enter your email first.");
    }
    try {
      const response = await $axios.post("/auth/forgotPassword", {email});
      if (!response) {
        throw new Error("Error");
      }
      console.log("Entered email:", email);
      setError(""); // Clear the error message
      setIsForgetVisible(true); // Show the Forget Password modal
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#E6D4B9]">
      {/* Forgot Password Modal */}
      {isForgetVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          {/* <div className="bg-white p-6 w-11/12 max-w-md rounded-lg"> */}
          <Forget email={email} />
        </div>
      )}
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-[#8F3623] text-2xl">
            Find your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#265073] mb-4 text-lg">
            Please enter your email address to search for your account.
          </p>
          <Input
            placeholder="Email address"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}{" "}
          {/* Display error message */}
          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleSubmit} // Handle submit with validation
              className="bg-[#A98D78] hover:bg-[#b69a85]"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
