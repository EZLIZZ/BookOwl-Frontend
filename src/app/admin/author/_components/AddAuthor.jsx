"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import $axios from "@/lib/axios.instance";
// import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { useState } from "react";
export default function AddCategory() {
  // const [formOpen,setFormOpen] = useState(false);
  return (
    <div className="h-[90px] flex justify-between mx-3 px-3 items-center border-b-2 border-gray-500  ">
      <h1 className="text-3xl font-bold text-amber-900 text-center">Author</h1>
      {/* <Button onClick={()=>setFormOpen(true)}>
          Add Category <Plus />
        </Button> */}
      <AddForm />
    </div>
  );
}
const formSchema = z.object({
  name: z.string().min(1, "Author's Name is required"),
  bio: z.string().min(1, "Author's Name is required"),
  authorImage: z
    .any() // Start with `any()` for flexibility.
    .refine(
      (fileList) => fileList instanceof FileList && fileList.length > 0,
      "Cover image is required"
    ),
});

function AddForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      authorImage: null,
    },
  });

  const onSubmit = async (values) => {
    console.log("form values:", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("bio", values.bio);

    if (
      values.authorImage instanceof FileList &&
      values.authorImage.length > 0
    ) {
      formData.append("authorImage", values.authorImage[0]);
    } else {
      console.error("Author image is not selected");
      return;
    }

    console.log("FormData being sent:", [...formData.entries()]);

    try {
      const response = await $axios.post("/author/addAuthor", formData);

      console.log("Author added successfully:", response.data);
      // router.push("/admin/author");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error.response || error);
    }

    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          Add Author <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Author</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Colleen Hoover" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Image</FormLabel>
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
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input placeholder="description..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
