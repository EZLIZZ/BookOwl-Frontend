"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BookList from "./_components/BookList";
import { useEffect, useState } from "react";
import $axios from "../../../lib/axios.instance.js";
import Link from "next/link.js";




export default function Books() {

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // try {
    const response = await $axios.get("/book/getBooks");
    console.log(response);
    if (!response) {
      throw new Error(`HTTP erroe!:Status: ${response.status}`);
    }
    setData(response?.data.data);
    // } catch (err) {
    // setErrorMap(err.message);
    // }
  };
 
  return (
    <div className="w-full  h-full  bg-[#fcf3ec]  ">
      <div className=" bg-[#fcf3ec]  h-[90px]  flex justify-between mx-3 px-3 items-center border-b-2 border-gray-500  ">
        <h1 className="text-3xl font-bold text-amber-900 text-center">Books</h1>
        <Button  >
            <Link className=" flex items-center gap-3"  href="/admin/books/add"> Add Book <Plus /></Link>   

            </Button>
      </div>
      {data?.length > 0 && <BookList data={data} />}
    </div>
  );
}
