"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BookCard({ book }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleBookClick = () => {
    setOpen(true); // Open the dialog
    console.log(book._id);
  };

  const handleLogin = () => {
    setOpen(false);
    router.push("/login");
  };

  const getCoverImage = () =>
    book?.coverImage
      ? book.coverImage.replace(/\\/g, "/")
      : "/images/default-cover.jpg";

  return (
    <>
      <Card
        key={book._id}
        onClick={handleBookClick}
        className="cursor-pointer rounded-lg transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
        aria-label={`Book card for ${book.bookName}`}
      >
        <CardHeader className="p-2 sm:p-4">
          <div className="relative w-full pb-[150%] overflow-hidden rounded-md">
            <img
              src={getCoverImage()}
              alt={`Cover of ${book.bookName}`}
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          </div>
        </CardHeader>

        <CardContent className="px-3 pb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
            {book.bookName}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">
            by {book.author?.authorName}
          </p>
          <p className="mt-2 text-md sm:text-xl font-bold text-gray-900">
            Rs {book.price}
          </p>
        </CardContent>
      </Card>

      {/* Dialog for login required */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#6d433d]">Login Required</DialogTitle>
            <DialogDescription>
              You must log in to view this book.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline"  onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogin} className="bg-[#6d433d]">Go to Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
