"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  email: z.string().email("Email must be a valid address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number"),
});

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isForgetVisible, setIsForgetVisible] = useState(false); // State to manage modal visibility
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await $axios.post("/auth/login", values);
      if (response && response.status === 200) {
        const user = response.data;
        localStorage.setItem("token", user.data.accessToken);
        localStorage.setItem("id", user.data.user._id);
        localStorage.setItem("name", user.data.user.name);
        localStorage.setItem("role", user.data.user.role);
        localStorage.setItem("email", user.data.user.email)
        router.push(user.data.user.role === "admin" ? "/admin" : "/pages/homepage");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Invalid credentials. Please try again.";
      setError(errorMessage);
      setShowErrorModal(true); // Show the error modal
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[rgb(246,220,201)] overflow-hidden">
      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md text-center shadow-lg">
            <h2 className="text-lg font-bold text-red-500">Login Failed</h2>
            <p className="text-gray-700">{error}</p>
            <Button
              className="mt-4 bg-[#AF886B] text-white w-full"
              onClick={() => setShowErrorModal(false)}
            >
              Okay
            </Button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {/* {isForgetVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 w-11/12 max-w-md rounded-lg">
            <Forget />
          </div>
        // </div>
      )} */}

      <Card className="w-full max-w-4xl bg-[#e1ceac] shadow-lg rounded-lg border border-gray-100 relative flex flex-col md:flex-row">
        <div className="hidden md:block w-1/2">
          <img src="/photos/owl2.jpg" alt="Owl" className="w-full h-full object-cover rounded-l-lg" />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full flex flex-col items-center">
              <h1 className="text-xl md:text-2xl font-bold italic text-[#6d433d]">Welcome To Book Owl</h1>
              <h2 className="font-bold text-[#8d767c] text-sm md:text-base">Login to continue</h2>

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-full">
                        <Mail className="absolute left-2.5 top-2.5" size={18} />
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          {...field}
                          className="w-full px-8 py-2 text-[#c2918b] rounded-full"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-full">
                        <Lock className="absolute left-2.5 top-2.5" size={18} />
                        <button
                          type="button"
                          className="absolute right-2.5 top-2.5"
                          onClick={() => setIsPasswordVisible((prev) => !prev)}
                        >
                          {isPasswordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="w-full px-8 py-2 text-[#c2918b] rounded-full"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button className="bg-[#5d768a] rounded-full w-full md:w-[150px]" type="submit">
                Login
              </Button>

              {/* Forget Password Link */}
              <a href="/login/emailpage"
                // href="#"
                // onClick={(e) => {
                //   e.preventDefault(); // Prevent default anchor behavior
                //   setIsForgetVisible(true); // Show the Forget Password modal
                // }}
                className="text-sm text-[#8d767c] hover:underline ml-5"
              >
                Forget Password?
              </a>

              <div className="flex">
                <p className="text-[#a75257] text-sm">New User?</p>
                <a href="/signuppage" className="text-sm text-[#8d767c] hover:underline ml-1">
                  Sign Up
                </a>
              </div>
            </form>
          </Form>
        </div>
      </Card>

      {/* Logo */}
      <div className="absolute top-4 right-4 md:top-4 md:right-20">
        <img src="/photos/logo.png" alt="Logo" className="w-16 h-8 md:w-32 md:h-12" />
      </div>
    </div>
  );
}
