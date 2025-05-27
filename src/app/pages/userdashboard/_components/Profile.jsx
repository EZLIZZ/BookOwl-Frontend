"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react"; // Importing the Pencil Icon from Lucide
import Link from "next/link";
import $axios from "@/lib/axios.instance";

export default function ProfilePage() {
  const [profile, setProfile] = useState();
  useEffect(() => {
    getData();
  }, []);
  const userId = localStorage.getItem("id");
  console.log(userId)
  const getData = async () => {
    try {
      const response = await $axios.get(`/userProfile/getUserById/${userId}`);
      console.log(response);
      if (!response) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      setProfile(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const profile = {
  //   name: "neupaneaisha45",
  //   username: "@neupaneaisha45",
  //   bio: "Passionate about books and technology. Always learning!",
  // };

  return (
    <div className="min-h-screen p-8 pt-[80px] bg-[#E6D4B9] ">
      <div className="container max-w-5xl bg-white shadow-lg rounded-xl p-12">
      {profile ? (

        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-[#bd9d86] flex items-center justify-center text-white text-5xl font-bold uppercase">
            {profile.name[0]}
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-[#8b3623]">
              {profile.name}
            </h1>
            <p className="text-xl text-[#5d768a]">{profile.username}</p>
          </div>

        
          <div className="ml-auto">
            <Link href="/pages/userdashboard/editprofile">
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
      ):(
        <>Loading...</>
      )}
        <div className="mt-8">
          <p className="text-lg text-[#5d768a] mt-4 leading-relaxed">
          {profile?.bio || ""}
          </p>
        </div>
      </div>
    </div>
  );
}
