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

export default function CategoryPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get category & page from URL params, fallback to defaults
  const categoryParam = searchParams.get("category") || "";
  const pageParam = parseInt(searchParams.get("page")) || 1;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Sync currentPage with pageParam from URL
  useEffect(() => {
    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [pageParam]);

  // Fetch data whenever currentPage or categoryParam changes
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let url = `/book/getBooks?page=${currentPage}&limit=8`;
        if (categoryParam) {
          url += `&category=${categoryParam}`;
        }
        const response = await $axios.get(url);
        if (response && response.data) {
          setData(response.data.data || []);
          setTotalPage(response.data.totalPage || 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [currentPage, categoryParam]);

  // Update page & URL on pagination change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPage || page === currentPage) return;

    setCurrentPage(page);

    // Update URL with new params (shallow to avoid full reload)
    const params = new URLSearchParams();
    if (categoryParam) params.set("category", categoryParam);
    params.set("page", page);

    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

  return (
    <div>
      <div className="flex flex-row px-[5%]">
        <CategoryFilter selectedCategory={categoryParam} data={data} loading={loading} />
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
