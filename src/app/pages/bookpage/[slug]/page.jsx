"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Starting from "../_components/Starting";
import Author from "../_components/Author";
import DisplayReview from "../_components/DisplayReview";
import You from "../_components/You";
import Recommendations from "../_components/Recommendation";
import AddReview from "../_components/AddReview";
import axios from "axios";
import $axios from "@/lib/axios.instance";

export default function BookPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [recom, setRecom] = useState(null);
  const [error, setError] = useState(null);

  // Fetch book details
  useEffect(() => {
    if (!slug) {
      console.warn("slug is not defined yet");
      return;
    }

    async function fetchData() {
      try {
        console.log("Fetching book data for slug:", slug);
        const response = await $axios.get(`/book/getBookById/${slug}`);

        if (!response || response.status !== 200) {
          throw new Error(`HTTP error status: ${response?.status || "No response"}`);
        }
        if (!response.data || !response.data.data) {
          throw new Error("Response data format unexpected");
        }

        setData(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch book data:", err);
        setError(err.message || "Failed to fetch book data.");
      }
    }

    fetchData();
  }, [slug]);

  // Fetch recommendations
  useEffect(() => {
    if (!slug) {
      console.warn("slug is not defined yet for recommendations");
      return;
    }

    async function getRecom() {
      try {
        console.log("Fetching recommendations for slug:", slug);
        const Recomres = await axios.get(`https://bookowlai.onrender.com/recommend/${slug}`);

        if (!Recomres || Recomres.status !== 200) {
          throw new Error(`HTTP error status: ${Recomres?.status || "No response"}`);
        }
        if (!Recomres.data || !Recomres.data.recommendations) {
          throw new Error("Recommendations response format unexpected");
        }

        setRecom(Recomres.data.recommendations);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        setError(err.message || "An error occurred while fetching recommendations.");
      }
    }

    getRecom();
  }, [slug]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!data) {
    return <p>Loading book details...</p>;
  }

  return (
    <>
      <Starting data={data} />
      <Author data={data} />
      <AddReview bookData={data} />
      <DisplayReview data={data} />
      <You />
      {recom && <Recommendations data={recom} />}
    </>
  );
}
