"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyOrders() {
  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const user = localStorage.getItem("id");
    try {
      const response = await $axios.get(`/userProfile/getUserById/${user}`);
      console.log(response?.data.data.orders);
      setData(response?.data.data.orders);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = (id) =>{
router.push(`/orderdetails/${id}`);
  }
  return (
    <div className="container max-w-7xl m-auto pt-[100px] px-5 mb-[100px]">
      <h1 className="text-2xl text-[#8F3623] font-semibold mb-3">My Orders</h1>
      <div className="w-full lg:block">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">OrderID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Delivery Status</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell onClick={()=>{handleClick(item._id)}} className="text-[#8F3623] font-semibold text-lg cursor-pointer">
                  {item._id}
                </TableCell>
                <TableCell className="font-semibold text-base">
                  {item.createdAt}
                </TableCell>
                <TableCell className=" text-[#8F3623] font-semibold text-lg">
                  {item.paymentStatus}
                </TableCell>
                
                

                <TableCell className=" text-[#8F3623] font-semibold text-lg text-center">
                  {item.deliveryStatus}
                </TableCell>
                <TableCell className=" text-blue-900 font-semibold text-lg">
                 Rs {item.totalPrice}                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Mobile */}
      {/* <div className="lg:hidden ">
        {data.map((item) => (
          <div key={item._id} className="grid grid-cols-2 gap-4 border-b py-4">
            <div className="w-full flex justify-center">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={150}
                height={150}
                className="rounded"
              />
            </div>
            <div className="flex-grow space-y-2">
              <h3 className="font-semibold text-lg">{item.name}</h3>

              <p className="text-sm text-gray-500">{item.order}</p>
              <p className="text-[#8F3623] font-semibold">{item.price}</p>
              <p>{item.quantity}</p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
