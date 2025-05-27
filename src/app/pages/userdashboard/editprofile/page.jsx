"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import $axios from "@/lib/axios.instance"; // Adjust import path as needed
import { useRouter } from "next/navigation";

// Schema for form validation using Zod
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  bio: z.string().max(200, "Bio cannot exceed 200 characters.").optional(),
  phoneNumber: z.preprocess(
    (value) => parseFloat(value),
    z.number().positive({ message: "Pages must be a positive number." })
  ),
  address: z.object({
    city: z.string().min(5, "City name must be at least 5 characters."),
  }),
});

export default function ProfilePage() {
  const [profile, setProfile] = useState(null); // Profile state
  const [loading, setLoading] = useState(true); // Loading state
  const [image, setImage] = useState(null); // Image state for profile picture
  const router = useRouter();
  const userId = localStorage.getItem("id"); // Get user ID from localStorage

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      phoneNumber: "",
      address: { city: "" },
    },
  });
  const fileInputRef = useRef(null);

  // Fetch user profile data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await $axios.get(`/userProfile/getUserById/${userId}`);
        if (response && response.status === 200) {
          setProfile(response.data.data); // Set profile state
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false); // Ensure loading stops even on error
      }
    };

    getData();
  }, [userId]);

  // Update form values when profile data is fetched
  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || "",
        bio: profile.bio || "",
        phoneNumber: profile.phoneNumber || "",
        address: { city: profile.address?.city || "" },
      });
    }
  }, [profile, form]);

  // Form submission
  const onSubmit = async (data) => {
    try {
      const updatedData = { ...data, image }; // Include the updated image if available
      const UpdateResponse = await $axios.put(
        `/userProfile/updateUser/${userId}`,
        updatedData
      );
      console.log("Profile Updated:", UpdateResponse);
      alert("Profile Updated Successfully!");
      router.push("/pages/userdashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the selected image to state
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder while loading
  }

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden ">
        {/* Profile Section */}
        <div className="flex-grow overflow-y-auto bg-[#E6D4B9] p-8 pt-[75px]">
          <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-10">
            <h1 className="text-4xl font-bold font-serif text-[#8B3623] mb-6">
              Edit My Profile
            </h1>

            <div className="space-y-8">
              {/* Profile Picture Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-[#BD9D86] flex items-center justify-center text-white text-6xl font-light">
                    {form.getValues("name")[0]?.toUpperCase()}
                  </div>
                  <div
                    onClick={triggerFileUpload}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                  </div>
                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange} // Handle the file input change
                  />
                </div>
              </div>

              {/* Form Section */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bio Field */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Tell us about yourself"
                          />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your phone number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address Field */}
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your city" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-[#8B3623] text-white"
                  >
                    Save Changes
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
