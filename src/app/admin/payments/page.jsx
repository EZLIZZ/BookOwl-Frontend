// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
"use client"
import { useEffect, useState } from "react";
import PayMents from "./_components/PayMents";
import $axios from "@/lib/axios.instance";

export default function Books() {
  const [data, setData]= useState();
  useEffect(()=>{
    getData();
  },[]);

  const getData = async () => {
    try {
      const response = await $axios.get("/order/getOrderDetails");
      console.log(response?.data.data);
      setData(response?.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="w-screen max-w-full h-screen  bg-[#fcf3ec] overflow-hidden ">
      <div className="h-[90px] flex items-center mx-3 px-3  border-b-2 border-gray-500 sticky ">
        
        <h1 className="text-3xl font-bold text-amber-900 ">Payments</h1>
        {/* <Button>
          Add Book <Plus />
        </Button> */}
      </div>
  {data &&  <PayMents data = {data}/> }
    </div>
  );
}
