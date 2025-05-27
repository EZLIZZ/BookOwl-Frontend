"use client";
// import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
import BookCard from "./BookCard"


export default function AllBooks({ data , loading }) {

  return (
    <div className="">
      <div className="">
      
        <main className=" p-10 ">
          <ScrollArea className="space-y-6 ">
            
         
            {loading ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 w-full bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full">
              {data.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
