"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Mail, Eye, EyeOff, Lock, CloudCog } from "lucide-react";
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
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

    async function onSubmit(values) {
    try {
      const response = await $axios.post("/auth/login", values);
      // console.log("response:", response);
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
    <div className="flex justify-center items-center min-h-screen bg-[rgb(246,220,201)] relative px-4">
      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center shadow-xl">
            <h2 className="text-lg font-bold text-red-500">Login Failed</h2>
            <p className="text-gray-700">{error}</p>
            <Button className="mt-4 bg-[#AF886B] text-white w-full" onClick={() => setShowErrorModal(false)}>
              Okay
            </Button>
          </div>
        </div>
      )}

      <Card className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl bg-[#e1ceac] rounded-lg overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img src="/photos/owl2.jpg" alt="Owl" className="object-cover w-full h-full" />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-5">
              <div className="text-center space-y-1">
                <h1 className="text-xl md:text-2xl font-bold italic text-[#6d433d]">Welcome To Book Owl</h1>
                <p className="text-sm text-[#8d767c]">Login to continue</p>
              </div>

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-2.5 text-gray-500" size={18} />
                        <input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="w-full pl-9 pr-4 py-2 rounded-full text-[#c2918b] border border-gray-300"
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
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-2.5 text-gray-500" size={18} />
                        <button
                          type="button"
                          className="absolute right-2.5 top-2.5 text-gray-500"
                          onClick={() => setIsPasswordVisible((prev) => !prev)}
                        >
                          {isPasswordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <input
                          {...field}
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full pl-9 pr-10 py-2 rounded-full text-[#c2918b] border border-gray-300"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mx-auto bg-[#5d768a] rounded-full">
                Login
              </Button>

              <div className="text-center">
                <a href="/login/emailpage" className="text-sm text-[#8d767c] hover:underline">
                  Forgot Password?
                </a>
              </div>

              <div className="text-center">
                <p className="text-sm text-[#a75257]">
                  New User?
                  <a href="/signuppage" className="ml-1 text-[#8d767c] hover:underline">
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </Card>

      {/* Logo */}
      <img src="/photos/logo.png" alt="Logo" className="absolute top-4 right-4 w-32 h-12 " />
    </div>
  );
}
