"use client";
// import { useRouter } from "next/router";
import UpdateForm from "../../_components/UpdateForm"
import $axios from "@/lib/axios.instance";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default function UpdateBooks() {
//   const router = useRouter();
  const { bookId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (bookId) {
      // Fetch book details using the ID
      const fetchBookData = async () => {
        try {
          const response = await $axios.get(`/book/getBookById/${bookId}`);
          console.log(response);
          setData(response.data.data); // Set the book data into the state
        } catch (error) {
          console.error("Error fetching book data", error);
        }
      };
      fetchBookData();
    }
  }, [bookId]);

 
  return (
   <>
      {data ? <UpdateForm data={data} bookId={bookId} /> : <div>Loading...</div>}
      </>
  );
}
