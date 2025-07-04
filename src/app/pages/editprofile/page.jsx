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
import { Camera} from "lucide-react";
import $axios from "@/lib/axios.instance"; // Adjust import path as needed
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

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

export default function EditProfile() {
  const [profile, setProfile] = useState(null); // Profile state
  const [loading, setLoading] = useState(true); // Loading state
  const [image, setImage] = useState(null); // Image state for profile picture
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("id");
      setUserId(storedId);
    }
  }, []);

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
      if (!userId) return;

      try {
        const response = await $axios.get(`/userProfile/getUserById/${userId}`);
        if (response && response.status === 200) {
          console.log(response);
          setProfile(response.data.data);
        }
        if (response.data.data.profilePicture) {
          localStorage.setItem(
            "profilePicture",
            response.data.data.profilePicture
          );
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
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
    if (!userId) return;

    try {
      const updatedData = { ...data, image };
      const UpdateResponse = await $axios.put(
        `/userProfile/updateUser/${userId}`,
        updatedData
      );
      console.log("Profile Updated:", UpdateResponse);
      toast.success("Profile Updated Successfully!");
      router.push("/pages/userdashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle file input change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const formData = new FormData();
    formData.append("userImage", file); // match backend field name

    // get user id from localStorage (or other secure storage)
    const userId = localStorage.getItem("id");

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const res = await $axios.put(
        `/userProfile/updateUserProfile/${userId}`,
        formData
      );

      console.log("Profile updated successfully", res.data);
      window.location.reload();
      window.location.reload();
    } catch (err) {
      console.error("Error uploading profile picture", err);
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
        <div className="flex-grow overflow-y-auto bg-[#E6D4B9] p-8 mt-[80px]">
          <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-10">
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#8B3623] mb-6">
              Edit My Profile
            </h1>

            <div className="space-y-4 sm:space-y-8">
              {/* Profile Picture Section */}
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="relative">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="w-20 sm:w-32 aspect-square rounded-full object-cover"
                    />
                  ) : image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Profile Preview"
                      className="w-20 sm:w-32 aspect-square rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 sm:w-32 aspect-square rounded-full bg-[#BD9D86] flex items-center justify-center text-white text-3xl sm:text-6xl font-light">
                      {form.getValues("name")[0]?.toUpperCase()}
                    </div>
                  )}

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
                  className="space-y-3 sm:space-y-6"
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        // type="submit"
                        className="w-full bg-[#8B3623] text-white"
                      >
                        Save Changes
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#8F3623] font-serif text-xl">
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[#265073] font-serif text-lg">
                          Confirm changes  just made?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-[#8F3623]">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-[#265073] text-white"
                          onClick={form.handleSubmit(onSubmit)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* Submit Button */}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
