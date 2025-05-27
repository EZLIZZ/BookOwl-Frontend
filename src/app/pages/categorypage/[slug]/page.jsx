"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryFilter from "../_components/CategoryFilter"; // Adjust import path
import AllBooks from "../_components/AllBooks";
import $axios from "@/lib/axios.instance";

export default function CategorySlugPage() {
  const { slug } = useParams(); // Extract the category ID or name
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks(); // Fetch all books initially
  }, []);

  useEffect(() => {
    if (slug && books.length > 0) {
    //   console.log("Slug:", slug);
    //   console.log("Books:", books.map((book) => book.category)); // Log category arrays
  
      const filtered = books.filter((book) =>
        book.category.some((cat) => cat._id === slug) // Check if any category matches the slug
      );
      console.log("Filtered Books:", filtered);
  
      setFilteredBooks(filtered);
    }
  }, [slug, books]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await $axios.get("/book/getBooks");
      setBooks(response.data?.data || []);
      console.log(response);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row px-[5%]">
      <CategoryFilter slugCategoryId ={slug} />

      <AllBooks data={filteredBooks} loading={loading} />
      </div>
  );
}