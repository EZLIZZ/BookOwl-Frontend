"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-tailwindcss-select";
import $axios from "@/lib/axios.instance";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  bookName: z.string().min(1, "Book Name is required"),
  author: z.string().min(1, "Author's Name is required"),
  bookSummary: z.string(),
  price: z.preprocess(
    (value) => parseFloat(value),
    z.number().positive({ message: "Price must be a positive number." })
  ),
  pages: z.preprocess(
    (value) => parseFloat(value),
    z.number().positive({ message: "Pages must be a positive number." })
  ),
  publishedDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  category: z.array(z.string()),
  language: z.string(),

  ISBN: z.preprocess(
    (value) => parseFloat(value),
    z.number().positive({ message: "Pages must be a positive number." })
  ),
  publisher: z.string(),
  mood: z.array(z.string()),
  stock: z.preprocess(
    (value) => parseFloat(value),
    z.number().positive({ message: "Pages must be a positive number." })
  ),
  coverImage: z
    .any()
    .refine(
      (fileList) => fileList instanceof FileList && fileList.length > 0,
      "Cover image is required"
    ),
});
export default function UpdateBooks({ data, bookId }) {
  console.log("form data:", data);
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const CategoryResponse = await $axios.get("/category/getCategory");
    console.log(CategoryResponse);
    if (!CategoryResponse) {
      throw new Error(`HTTP erroe!:Status: ${CategoryResponse.status}`);
    }
    setCategories(CategoryResponse?.data.data);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookName: data?.bookName,
      author: data?.author.authorName,
      bookSummary: data?.bookSummary,
      price: data?.price,
      pages: data?.pages,
      publishedDate: data?.publishedDate,
      category: data?.category?.map((item) => item.categoryName) || [], 
      language: data?.language,
      ISBN: data?.ISBN,
      publisher: data?.publisher,
      mood: data?.mood || [],
      stock: data?.stock,
      coverImage: null,
    },
  });
  const options = categories.map((CategoryItems) => ({
    value: CategoryItems._id,
    label: CategoryItems.categoryName,
  }));
  const moodoptions = [
    { value: "happy", label: "happy" },
    { value: "sad", label: "sad" },
    { value: "excited", label: "excited" },
  ];

  // async function onSubmit(values) {
  //   console.log(values);
  //   const response = await $axios.post("/book/addBook",values);

  //   if (!response) {
  //     throw new Error(`HTTP erroe!:Status: ${response.status}`);
  //   }
  //   if (response.status===200){
  //     console.log(response);
  //     console.log("Submitted values",values);
  //   }

  // }
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("bookName", values.bookName);
    formData.append("author", values.author);
    formData.append("bookSummary", values.bookSummary);
    formData.append("price", values.price);
    formData.append("pages", values.pages);
    formData.append("publishedDate", values.publishedDate);
    // formData.append("category", values.category);
    values.category.forEach((item) => {
      formData.append("category", item);
    });
    formData.append("language", values.language);
    // formData.append("rating", values.rating);
    formData.append("ISBN", values.ISBN);
    formData.append("publisher", values.publisher);
    formData.append("mood", values.mood);
    formData.append("stock", values.stock);

    if (values.coverImage && values.coverImage[0]) {
      formData.append("coverImage", values.coverImage[0]);
    } else {
      console.error("Cover image is not selected");
      return;
    }

    try {
      const response = await $axios.put(`/book/updateBook/${bookId}`, formData);
      console.log("Book added successfully:", response.data);
      router.push("/admin/books");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  if (!data) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl text-center mt-[50px]">Update Book</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[50%]"
        >
          {/* Book Name */}
          <FormField
            control={form.control}
            name="bookName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book script" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input placeholder="Enter publisher" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author's Name */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author&apos;s Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>category</FormLabel>
                <FormControl>
                  <Select
                    isMultiple
                    placeholder="Select category"
                    value={options.filter((option) =>
                      field.value.includes(option.value)
                    )}
                    onChange={(selectedOptions) => {
                      field.onChange(
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      );
                    }}
                    options={options}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="author.bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter a short bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* Book Summary */}
          <FormField
            control={form.control}
            name="bookSummary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a short Book Summary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mood</FormLabel>
                <FormControl>
                  <Select
                    isMultiple
                    placeholder="Select your mood"
                    value={moodoptions.filter((option) =>
                      field.value.includes(option.value)
                    )}
                    onChange={(selectedOptions) => {
                      field.onChange(
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      );
                    }}
                    options={moodoptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files); // Ensure the file is properly stored
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {/* Pages */}
          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pages</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {/*RAting */}
          {/* <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RAting</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* ISBN */}
          <FormField
            control={form.control}
            name="ISBN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ISBN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter stock quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Enter stock quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
