import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import $axios from "@/lib/axios.instance";

export default function UpdateCategory({ category, onClose }) {
  // Initialize state with fallback values
  const [editedCategory, setEditedCategory] = useState({
    _id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (category) {
      setEditedCategory({
        _id: category._id || "",
        name: category.name || "",
        description: category.description || "",
      });
    }
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await $axios.put(`/category/updateCategory/${editedCategory._id}`, editedCategory);
      if (response.status === 200) {
        console.log("Updated category:", response.data);
        onClose(); // Close the dialog after a successful update
        window.location.reload(); // Optional: Reload to refresh data
      } else {
        console.error("Failed to update category:", response);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Ensure the dialog is only rendered when the category is available
  if (!category) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={editedCategory.name} // Controlled value
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={editedCategory.description} // Controlled value
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
