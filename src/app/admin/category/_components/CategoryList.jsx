"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import UpdateCategory from "./UpdateCategory";
import { useState } from "react";
import $axios from "@/lib/axios.instance";

export default function CategoryList({ data }) {
  //   const [searchBook,setSearchBook] = useState("");
  //   const filterBooks = Books.filter((book)=>
  //   book.name.toLowerCase().includes(searchBook.toLowerCase())||
  // book.author.toLowerCase().includes(searchBook.toLowerCase()));
  const [editingCategory, setEditingCategory] = useState(null);

  const handleEditClick = (category) => {
    setEditingCategory(category);
  };

  const handleEditClose = () => {
    setEditingCategory(null);
  };
  const handleDeleteClick = async (items)=>{
const categoryId = items._id;
const confirmDelete = confirm("Are you sure you want to delete?");
if (!confirmDelete) return;

try {
  const response = await $axios.delete(`/category/deleteCategory/${categoryId}`);
  console.log("Delete response:", response);
  if (response.status ===200){
    alert("category deleted successfully");
    window.location.reload();
  }
  else{
    alert("failed to delete category");
  }
  
} catch (error) {
 console.error(error);
 alert("failed to delete category") ;
}
  }
  return (
    <div>
      {/* <div className="w-full flex justify-end">
      <Input
        type="text"
        placeholder="Search for book or author"
        value={searchBook}
        onChange={(e)=> setSearchBook(e.target.value)}
        className="mt-5 mx-5 lg:w-[15%] w-full border-primary"
        />
        </div> */}
      <Card className="m-5 px-5 bg-transparent ">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Category image</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((items) => (
              <TableRow key={items._id}>
                {/* <TableCell><div className="rounded-lg w-20 h-20 overflow-hidden"><img src={items.img} className="w-full h-full object-cover" /></div></TableCell> */}
                <TableCell>
                  <h1 className="font-semibold text-base text-primary">
                    {items.categoryName}
                  </h1>
                </TableCell>

                <TableCell>{items.description}</TableCell>

                <TableCell>
                  <div className="flex flex-row gap-3">
                    <Button
                      variant="outlined"
                      onClick={() => handleEditClick(items)}
                    >
                      <Pencil className="w-5 h-5" />
                    </Button>{" "}
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteClick(items)}
                    >
                      <Trash className="w-5 h-5" />
                    </Button>
                  </div>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {editingCategory && (
        <UpdateCategory category={editingCategory} onClose={handleEditClose} />
      )}
    </div>
  );
}
