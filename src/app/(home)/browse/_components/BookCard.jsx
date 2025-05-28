import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function BookCard({ book }) {
  const router = useRouter();

  const handleBookClick = () => {
    alert("You must login to continue");
    router.push("/login");
    console.log(book._id);
  };

  const getCoverImage = () =>
    book?.coverImage
      ? book.coverImage.replace(/\\/g, "/")
      : "/images/default-cover.jpg";

  return (
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
  );
}
