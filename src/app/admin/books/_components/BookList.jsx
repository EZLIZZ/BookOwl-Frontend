"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import $axios from "@/lib/axios.instance";
// import $axios from "@/lib/axios.instance";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookList({ data }) {
  const [searchBook, setSearchBook] = useState("");
  const router = useRouter();
  // const [editingBook,setEditingBook ] = useState(null);
  const filterdata = data.filter(
    (book) =>
      book.bookName.toLowerCase().includes(searchBook.toLowerCase()) ||
      book.author.authorName.toLowerCase().includes(searchBook.toLowerCase())
  );
  // const baseUrl = "http://localhost:5000/";
  // console.log(data.author);
  const handleEditClick = (book) => {
    // setEditingBook(book._id);
    router.push(`/admin/books/update/${book._id}`);
  };
  const handleDeleteClick = async (data) => {
    const bookId = data._id;
    const confirmDelete = confirm("Are you sure you want to Delete?");
    if (!confirmDelete) return;
    try {
      const response = await $axios.delete(`/book/deleteBook/${bookId}`);
      console.log("Delete response:", response);
      if (response.status === 200) {
        alert("Book deleted successfully");
        window.location.reload();
      } else {
        alert("Deletion failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleEditClose = () => {
  //   setEditingCategory(null);
  // };
  return (
    <div>
      <div className="w-full flex justify-end">
        <Input
          type="text"
          placeholder="Search for book or author"
          value={searchBook}
          onChange={(e) => setSearchBook(e.target.value)}
          className="mt-5 mx-5 lg:w-[15%] w-full border-primary"
        />
      </div>
      <Card className="m-5 px-5 bg-transparent ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Book Summary</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterdata.map((data) => (
              <TableRow key={data.ISBN}>
                <TableCell>
                  <div className="rounded-lg w-16 h-24 overflow-hidden">
                    <img
                      src={
                        data?.coverImage
                          ? data.coverImage.replace(/\\/g, "/") // Replace backslashes with forward slashes
                          : "/images/default-cover.jpg" // Fallback to default cover image
                      }
                      alt="Cover Image"
                      className="w-full h-full object-contain"
                    />
                    ;
                  </div>
                </TableCell>
                <TableCell>
                  <h1 className="font-semibold text-base text-primary">
                    {data.bookName}
                  </h1>
                  {data.author.authorName}
                </TableCell>
                <TableCell>{data.bookSummary}</TableCell>
                <TableCell>{data.language}</TableCell>
                <TableCell>{data.price}</TableCell>

                <TableCell>{data.stock}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-3">
                    <Button
                      variant="outlined"
                      onClick={() => handleEditClick(data)}
                    >
                      <Pencil className="w-5 h-5" />
                    </Button>{" "}
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteClick(data)}
                    >
                      <Trash className="w-5 h-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {/* {editingBook && (
              <UpdateCategory category={editingCategory} onClose={handleEditClose} />
            )} */}
    </div>
  );
}
