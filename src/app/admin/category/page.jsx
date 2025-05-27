"use client";
import { useEffect, useState } from "react";
import AddCategory from "./_components/AddCategory";
import CategoryList from "./_components/CategoryList";
import $axios from "@/lib/axios.instance";

export default function Category() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

//   const getData = async () => {
//     // try {
//     const response = await $axios.get("/category/getCategory");
//     console.log(response);
//     if (!response) {
//       throw new Error(`HTTP erroe!:Status: ${response.status}`);
//     }
//     setData(response?.data.data);
//     // } catch (err) {
//     // setErrorMap(err.message);
//     // }
//   };
const getData = async () => {
    try {
      const response = await $axios.get("/category/getCategory");

      // Check if the response has the expected structure
      if (response && response.data && response.data.data) {
        setData(response.data.data);
      } else {
        setError("Unexpected response structure");
      }
    } catch (err) {
      // If an error occurs during the API call, set the error state
      setError(`Error fetching data: ${err.message}`);
    }
  };
  return (
    <div className="w-screen max-w-full h-full  bg-[#fcf3ec] overflow-hidden ">
      <AddCategory />
      <CategoryList data={data} />
    </div>
  );
}
