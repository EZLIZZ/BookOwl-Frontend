// app/(home)/browse/CategoryPage.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import $axios from "@/lib/axios.instance";
import CategoryFilter from "./CategoryFilter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData(currentPage, categoryParam);
  }, [currentPage, categoryParam]);

  function Spinner() {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <div className="h-10 w-10 border-4 border-t-transparent border-[#6d433d] rounded-full animate-spin" />
      </div>
    );
  }
  const getData = async (page, category) => {
    try {
      setLoading(true);
      let url = `/book/getBooks?page=${page}&limit=8`;
      if (category) {
        url += `&category=${category}`;
      }
      const response = await $axios.get(url);
      if (response?.data) {
        setData(response.data.data || []);
        setTotalPage(response.data.totalPage || 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page);
      router.push(`?page=${page}&category=${categoryParam}`, undefined, {
        shallow: true,
      });
      getData(page, categoryParam);
    }
  };

  return (
    <div className="bg-[#e5d4b8] pt-16">
      <h1 className="ml-[5%] sm:text-5xl text-2xl text-amber-900 font-semibold mt-6 text-center">
        Browse
      </h1>
      <div className="flex flex-row">
        {loading ? (
          <Spinner />
        ) : (
          <CategoryFilter
            selectedCategory={categoryParam}
            data={data}
            loading={loading}
          />
        )}
      </div>

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
