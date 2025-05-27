"use client";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import $axios from "@/lib/axios.instance";

export default function Contact() {
  const [data, setData] = useState([]); // Ensure the state is initialized as an empty array
  const [error, setError] = useState("");

  // Fetch data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await $axios.get("/contact/getContact");
      console.log(response);

      // Check if the API response contains the expected structure
      if (response?.data?.data?.getDetails) {
        setData(response.data.data.getDetails); // Access the correct array
      } else {
        setError("Unexpected response structure");
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <div className=" w-full  ">
    <h1 className="h-[90px] flex items-center mx-3 px-3 border-b-2 border-gray-500 text-3xl font-bold text-amber-900 ">
      Contact us Messages
    </h1>
      <Card className="m-5 px-5 bg-transparent">
        {data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <h1 className="font-semibold text-base text-primary">
                      {item.name}
                    </h1>
                  </TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>{error || "No data available"}</p> // Show error or fallback message
        )}
      </Card>
    </div>
  );
}
