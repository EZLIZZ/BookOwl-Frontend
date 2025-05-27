"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Otp from "./Otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Mail, Eye, EyeOff, User, Lock, Phone } from "lucide-react";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters." }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number"),
  email: z.string().email("Email must be a valid address"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false); // Manage email existence error
  const [isOTPVisible, setIsOTPVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      password1: "",
      email: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await $axios.post("/auth/register", values);
      localStorage.setItem("email", values.email);
      console.log(response);
      if (response?.status === 200) {
        setIsOTPVisible(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Email already exists
        setIsEmailExists(true);
      } else {
        setError(error.message);
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[rgb(246,220,201)] overflow-hidden p-4">
      {/* Popup Modal */}
      {isEmailExists && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md text-center">
            <h2 className="text-lg font-bold text-red-500">
              Email Already Exists
            </h2>
            <p className="text-gray-700">
              Please try signing in or use a different email.
            </p>
            <Button
              className="mt-4 bg-[#AF886B] text-white w-full"
              onClick={() => setIsEmailExists(false)}
            >
              Okay
            </Button>
          </div>
        </div>
      )}

      {isOTPVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          {/* <div className="bg-white rounded-lg p-6 w-11/12 max-w-md"> */}
          <Otp />
        </div>
        // </div>
      )}

      {/* Main Form */}
      <Card className="w-full max-w-4xl bg-[#e1ceac] shadow-lg rounded-lg border border-gray-100 relative">
        <div className="flex flex-col md:flex-row w-full">
          {/* Owl Image Section */}
          <div className="w-full md:w-1/2 hidden md:block">
            <img
              src="/photos/owl2.jpg"
              alt="Owl"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full flex flex-col items-center"
              >
                <h1 className="text-2xl font-bold italic text-[#6d433d]">
                  Welcome To Book Owl
                </h1>
                <h2 className="font-bold text-[#8d767c]">
                  Sign Up to continue
                </h2>

                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          <User
                            className="absolute left-2.5 top-2.5"
                            size={18}
                          />
                          <input
                            type="text"
                            placeholder="Enter your name"
                            {...field}
                            className="w-full px-12 py-2 text-[#c2918b] rounded-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          <Mail
                            className="absolute left-2.5 top-2.5"
                            size={18}
                          />
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                            className="w-full px-12 py-2 text-[#c2918b] rounded-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          <Phone
                            className="absolute left-2.5 top-2.5"
                            size={18}
                          />
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            {...field}
                            className="w-full px-12 py-2 text-[#c2918b] rounded-full"
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
                          <Lock
                            className="absolute left-2.5 top-2.5"
                            size={18}
                          />
                          <button
                            type="button"
                            className="absolute right-2.5 top-2.5"
                            onClick={() =>
                              setIsPasswordVisible((prev) => !prev)
                            }
                          >
                            {isPasswordVisible ? (
                              <Eye size={18} />
                            ) : (
                              <EyeOff size={18} />
                            )}
                          </button>
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Create password"
                            {...field}
                            className="w-full px-12 py-2 text-[#c2918b] rounded-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="password1"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          <Lock
                            className="absolute left-2.5 top-2.5"
                            size={18}
                          />
                          <button
                            type="button"
                            className="absolute right-2.5 top-2.5"
                            onClick={() =>
                              setIsConfirmPasswordVisible((prev) => !prev)
                            }
                          >
                            {isConfirmPasswordVisible ? (
                              <Eye size={18} />
                            ) : (
                              <EyeOff size={18} />
                            )}
                          </button>
                          <input
                            type={
                              isConfirmPasswordVisible ? "text" : "password"
                            }
                            placeholder="Confirm password"
                            {...field}
                            className="w-full px-12 py-2 text-[#c2918b] rounded-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  className="bg-[#5d768a] rounded-full w-[150px] flex items-center justify-center"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  ) : (
                    "Create an account"
                  )}
                </Button>

                <div className="flex">
                  <p className="text-[#a75257] text-sm">
                    Already have an account?
                  </p>
                  <a
                    href="/login"
                    className="text-sm text-[#8d767c] hover:underline ml-1"
                  >
                    Sign-In
                  </a>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Card>

      {/* Responsive Logo */}
      <div className="absolute top-4 right-4 md:right-20">
        <img
          src="/photos/logo.png"
          alt="Logo"
          className="w-24 md:w-32 h-auto"
        />
      </div>
    </div>
  );
}
