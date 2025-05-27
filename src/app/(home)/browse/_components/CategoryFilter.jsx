"use client";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import BookCard from "./BookCard";

const moods = [
  { id: 1, value: "happy" },
  { id: 2, value: "sad" },
  { id: 3, value: "excited" },
];

export default function CategoryFilter({ data, loading, selectedCategory }) {
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories for filtering
  const [filteredBooks, setFilteredBooks] = useState(data); // Books after applying filter

  // Extract categories from books
  const allCategories = data.reduce((acc, book) => {
    if (book.category) {
      book.category.forEach((category) => {
        if (!acc.some((cat) => cat._id === category._id)) {
          acc.push(category); // Avoid duplicates
        }
      });
    }
    return acc;
  }, []);

  // Set the selected category from the URL prop
  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategories([selectedCategory]); // Pre-select category from the URL
    }
  }, [selectedCategory]);

  // UseEffect to filter books whenever selected categories change
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredBooks(data); // If no categories selected, show all books
    } else {
      setFilteredBooks(
        data.filter((book) =>
          book.category.some((category) =>
            selectedCategories.includes(category._id)
          )
        )
      );
    }
  }, [selectedCategories, data]);

  // Handle category checkbox change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  return (
    <div className="flex px-[5%]">
      <div className="w-64 flex-shrink-0 bg-gray-100 p-4 mt-5">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Filter</h2>
        <Separator className="my-3 bg-gray-300" />

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Categories</h3>
          <ul className="space-y-2">
            {allCategories.length > 0 &&
              allCategories.map((category) => (
                <li key={category._id}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={category._id}
                      checked={selectedCategories.includes(category._id)} // Bind to selected categories
                      onChange={() => handleCategoryChange(category._id)} // Handle change
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="text-gray-700 capitalize">
                      {category.categoryName}
                    </span>
                  </label>
                </li>
              ))}
          </ul>
          <Separator className="mt-5 bg-gray-300" />
          <div className="mb-3">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Mood</h3>
            <ul className="space-y-2">
              {moods.map((mood) => (
                <li key={mood.id}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={mood.value}
                      className="form-checkbox h-5 w-5 text-blue-700"
                    />
                    <span className="text-gray-700 capitalize">
                      {mood.value}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Display books */}
      <div className="w-full flex-grow">
        <main className="px-6">
          <ScrollArea className="space-y-6">
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
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))
                ) : (
                  <p>No books found with the selected filters.</p>
                )}
              </div>
            )}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
