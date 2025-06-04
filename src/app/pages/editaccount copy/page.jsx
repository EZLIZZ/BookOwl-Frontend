"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import $axios from "@/lib/axios.instance";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const id = localStorage.getItem("id");
  const router = useRouter();
  const handledelete = async () => {
    try {
      const response = await $axios.delete(`/userProfile/deleteUser/${id}`);
      // console.log(response);
      localStorage.clear();
      toast.success("Account succesfully deleted");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#E6D4B9] flex items-start justify-center py-12 pt-[100px]">
      <div className="container max-w-2xl bg-white shadow rounded p-8">
        <h1 className="text-4xl font-bold font-serif text-[#8B3623] mb-4">
          Login And Security
        </h1>

        <div className="space-y-8">
          {/* Email Section */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-sm text-gray-500">Email</Label>
              <Input
                type="email"
                placeholder="Update your email"
                className="border-gray-300"
              />
            </CardContent>
          </Card>

          {/* Password Section */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-sm text-gray-500">Password</Label>
              <Input
                type="password"
                placeholder="Update your password"
                className="border-gray-300"
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              variant="default"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Save Changes
            </Button>
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
