"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import $axios from "@/lib/axios.instance";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);

  // Get userId from localStorage inside useEffect, after client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("id");
      setUserId(storedId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return; // Don't run until userId is loaded

    const getData = async () => {
      try {
        const response = await $axios.get(`/userProfile/getUserById/${userId}`);
        if (!response) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        setProfile(response?.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-2  sm:p-8 mt-[75px] bg-[#E6D4B9] ">
      <div className="container max-w-5xl bg-white shadow-lg rounded-xl p-5 sm:p-12">
        <div className="flex items-center gap-3  sm:gap-6">
          <div className="w-20 sm:w-32 aspect-square rounded-full bg-[#bd9d86] flex items-center justify-center text-white text-2xl sm:text-5xl font-bold uppercase">
            {profile.name[0]}
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-4xl font-bold text-[#8b3623]">{profile.name}</h1>
            <p className="text-xl text-[#5d768a]">{profile.username}</p>
          </div>

          <div className="ml-auto">
            <Link href="/pages/editprofile">
              <Button
                variant="ghost"
                className="text-[#5d768a] hover:text-[#5d768a] flex items-center text-lg"
              >
                <Pencil className="w-5 h-5 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-2 sm:mt-8">
          <p className="text-lg text-[#5d768a] mt-0 sm:mt-4 leading-relaxed">{profile.bio || ""}</p>
        </div>
      </div>
    </div>
  );
}
