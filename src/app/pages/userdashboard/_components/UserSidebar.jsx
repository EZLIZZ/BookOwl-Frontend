"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, History, Heart, MessageSquare, UserCircle, Settings } from "lucide-react";

const UserSidebar = () => {
  const router = useRouter();

  const menuItems = [
    {label: "My profile", icon: <Home size={18} />, href: "/pages/userdashboard" },
    {label: "Settings", icon: <Settings size={18} /> , href: "/pages/userdashboard"},
    { label: "Login And Security", icon: <MessageSquare size={18} />, href: "/pages/userdashboard/editaccount" },
    // {label:"My orders",icon:<MessageSquare size={18}/>, href:"/pages/userdashboard/myorder"},
  ];

  return (
    <div className="w-64 bg-[#bd9d86] pt-[80px] ">
      {/* Profile Icon */}
      <div className="flex justify-center mb-1">
        <UserCircle size={50} className="text-[#8B3623]" />
      </div>

      {/* Welcome Section */}
      <div className="p-4 text-center border-b border-gray-700">
        <h1 className="text-2xl font-serif font-bold text-[#8B3623]">Welcome to Your Dashboard</h1>
        <p className="text-lg font-serif text-[#B83214] mt-1">Manage your account and explore features!</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 mt-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-[#8B3623] text-lg hover:bg-lime-200"
                onClick={() => router.push(item.href)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserSidebar;
