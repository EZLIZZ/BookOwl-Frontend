"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // For URL management
import $axios from "@/lib/axios.instance";
import CategoryFilter from "./_components/CategoryFilter"; // Make sure CategoryFilter is correctly imported
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function CategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category"); // Get the category ID from the URL
  const initialPage = parseInt(searchParams.get("page")) || 1; // Get initial page from the URL

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch the books data whenever the page changes
  useEffect(() => {
    getData(currentPage, categoryParam);
  }, [currentPage, categoryParam]); // Re-fetch when currentPage or categoryParam changes

  const getData = async (page, category) => {
    try {
      setLoading(true);
      let url = `/book/getBooks?page=${page}&limit=8`; // Default URL

      // If a category is specified, add it to the API request
      if (category) {
        url += `&category=${category}`;
      }

      const response = await $axios.get(url);
      console.log("API Response:", response);

      if (response && response.data) {
        setData(response.data.data || []);
        setTotalPage(response.data.totalPage || 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page);
      router.push(`?page=${page}&category=${categoryParam}`, undefined, {
        shallow: true,
      }); // Update the URL with the new page
      getData(page, categoryParam); // Explicitly call `getData` for immediate update
    }
  };

  return (
    <div>
      <div className="flex flex-row px-[5%]">
        {/* Pass categoryParam to CategoryFilter */}
        <CategoryFilter
          selectedCategory={categoryParam}
          data={data}
          loading={loading}
        />
      </div>

      {/* Pagination Component */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                className={currentPage === page ? "font-bold text-primary" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              disabled={currentPage === totalPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
