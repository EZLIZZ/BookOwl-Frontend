"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#E6D4B9] flex items-start justify-center py-12 pt-[100px]">
      <div className="container max-w-2xl bg-white shadow rounded p-8">
        <h1 className="text-4xl font-bold font-serif text-[#8B3623] mb-4">Login And Security</h1>

        <div className="space-y-8">
          {/* Email Section */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-sm text-gray-500">Email</Label>
              <Input type="email" placeholder="Update your email" className="border-gray-300" />
            </CardContent>
          </Card>

          {/* Password Section */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-sm text-gray-500">Password</Label>
              <Input type="password" placeholder="Update your password" className="border-gray-300" />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="default" className="bg-green-600 text-white hover:bg-green-700">
              Save Changes
            </Button>
            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-100">
              Delete My Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
