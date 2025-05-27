"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
      <h1 className="text-3xl font-bold text-amber-900 text-center">
        Category
      </h1>
      {/* <Button onClick={()=>setFormOpen(true)}>
          Add Category <Plus />
        </Button> */}
      <AddForm />
    </div>
  );
}
const formSchema = z.object({
  categoryIcon: z
    .any() // Start with `any()` for flexibility.
    .refine(
      (fileList) => fileList instanceof FileList && fileList.length > 0,
      "Category image is required"
    ),
  name: z.string(),
  description: z.string(),
});

function AddForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryIcon: null,
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);

    if (
      values.categoryIcon instanceof FileList &&
      values.categoryIcon.length > 0
    ) {
      formData.append("categoryIcon", values.categoryIcon[0]);
    } else {
      console.error("Category image is not selected");
      return;
    }

    console.log("FormData being sent:", [...formData.entries()]);

    const response = await $axios.post("/category/addCategory", formData);

    if (!response) {
      throw new Error(`HTTP erroe!:Status: ${response.status}`);
    }
    if (response.status === 200) {
      console.log(response);
      console.log("Submitted values", values);
    }

    // console.log(values);
    setIsDialogOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          Add Category <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Make changes to your categories here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Romance" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" value="Explain about the category" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input id="image"  value="Explain about the category" className="col-span-3" />
            </div>
          </div> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: friction" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryIcon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Image</FormLabel>
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
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
