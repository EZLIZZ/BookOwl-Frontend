"use client"
import { useRouter } from "next/navigation";
import Dashboard from "./_components/Dashboard";
import { useEffect } from "react";

const Admin=()=>{
    const router = useRouter();
    const role = localStorage.getItem("role");
    console.log("my role", role);
    useEffect(()=>{
        if (role !== "admin")
        router.push("/login");
    },[role,router]);

    if (role !== "admin"){
        return <>loading...</>
    }
    return(
        <div className="overflow-hidden"> 
            <Dashboard/>
        </div>
    )
}
export default Admin;