"use client";
import { useRouter } from "next/navigation";
import Dashboard from "./_components/Dashboard";
import { useEffect, useState } from "react";

const Admin = () => {
  const router = useRouter();
  const [role, setRole] = useState(null);  // role state

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (storedRole !== "admin") {
      router.push("/login");
    }
  }, [router]);

  if (role === null) {
    // Still loading role from localStorage
    return <>Loading...</>;
  }

  if (role !== "admin") {
    // Redirecting - or can show some message
    return <>Access denied</>;
  }

  return (
    <div className="overflow-hidden">
      <Dashboard />
    </div>
  );
};

export default Admin;
