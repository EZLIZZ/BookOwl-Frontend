"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DeleteAccount() {
const [id, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      setUserId(id);
    }
  }, []);
    const router = useRouter();
  const handledelete = async () => {
    try {
      const response = await $axios.delete(`/userProfile/deleteUser/${id}`);
      console.log(response);
      localStorage.clear();
      toast.success("Account succesfully deleted");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#E6D4B9] flex items-start px-10 py-12 pt-[100px]">
      <div className="container max-w-2xl bg-white shadow rounded p-8">
        <h1 className="text-4xl font-bold font-serif text-[#8B3623] mb-4">
          Delete Account
        </h1>

        <div className="space-y-4">
          <p>
            <span className="text-red-700 font-bold text-xl">Warning:</span>{" "}
            Deleting your account is irreversible.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Your profile and personal data will be erased.</li>
            <li>Your reviews and other contributions will be removed.</li>
            <li>You will lose access to all services tied to your account.</li>
            <li>Please confirm only if you &apos;re absolutely sure.</li>
          </ul>
          <div className="flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-100"
                >
                  Delete My Account
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[#8F3623] font-serif text-xl">
                    Are you sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-[#265073] font-serif text-lg">
                    Do you really want to delete your account?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-[#8F3623]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-[#265073] text-white"
                    onClick={handledelete}
                  >
                    OK
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
