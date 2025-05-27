import { NextResponse } from "next/server";

export default function middleware(request) {
    console.log("Middleware is running"); // This should appear in the server logs

  // Access the cookie properly
  const role = request.cookies.get("role");
  console.log(role);

  // Check if the user is trying to access /admin and if they are not an admin
  if (request.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    // Redirect to login if they are not an admin
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Allow the request to proceed if the role is valid
}

// Config to apply middleware only to /admin/* routes
export const config = {
    matcher: "/admin/*",  // Apply middleware only to routes under /admin
  };
