"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import $axios from "@/lib/axios.instance";
import {
  Book,
  ExternalLinkIcon,
  HandCoins,
  Home,
  Layout,
  LayoutDashboardIcon,
  User,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SideItems = [
  {
    id: 1,
    name: "Home",
    link: "/admin",
    icon: <Home />,
  },
  {
    id: 2,
    name: "Book",
    link: "/admin/books",
    icon: <Book />,
  },

  {
    id: 3,
    name: "Stats",
    link: "/admin",
    icon: <Layout />,
  },
  {
    id: 4,
    name: "Category",
    link: "/admin/category",
    icon: <LayoutDashboardIcon />,
  },
  {
    id: 5,
    name: "Author",
    link: "/admin/author",
    icon: <User />,
  },
  {
    id: 6,
    name: "Payments",
    link: "/admin/payments",
    icon: <HandCoins />,
  },
  {
    id: 7,
    name: "Contact",
    link: "/admin/contact",
    icon: <Users />,
  },
  {
    id: 8,
    name: "Users",
    link: "/admin/users",
    icon: <UserCircle />,
  },
  {
    id: 9,
    name: "Logout",
    link: "/admin",
    icon: <ExternalLinkIcon />,
  },
];

export default function SideBarAdmin() {
  const router = useRouter();
  const logout = async ()=>{
  const confirmLogout = confirm("Are you sure you want to Logout?");
    if (!confirmLogout) return;
try {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  await $axios.post("/auth/logout");
  router.push("/");
}
catch (error){
  console.log(error);
}
  };
  return (
    <Sidebar className="fixed h-screen">
      <SidebarContent className="bg-[#e2b18b]">
        <SidebarGroup>
          <div className=" border-b-2 border-black ">
            <img src="/photos/logo.png" className="mb-3 "></img>
          </div>
          <SidebarGroupLabel className="text-md">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideItems.map((item) => (
                <SidebarMenuItem className="" key={item.id}>
                  <SidebarMenuButton
                    className=" hover:text-amber-900 hover:bg-[#fcf3ec] text-lg "
                    asChild
                  >
                    {item.id===9 ? (
                      <button onClick={logout}>
                        <span className="">{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    ):(
                    <Link href={item.link}>
                      <span className="">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    //   </div>
  );
}
