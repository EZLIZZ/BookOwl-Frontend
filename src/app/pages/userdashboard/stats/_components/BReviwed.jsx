// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// const reviewData = [
//   { month: "Jan", reviews: 3 },
//   { month: "Feb", reviews: 5 },
//   { month: "Mar", reviews: 8 },
//   { month: "Apr", reviews: 6 },
//   { month: "May", reviews: 10 },
//   { month: "Jun", reviews: 7 },
//   { month: "Jul", reviews: 9 },
//   { month: "Aug", reviews: 6 },
//   { month: "Sep", reviews: 8 },
//   { month: "Oct", reviews: 11 },
//   { month: "Nov", reviews: 13 },
//   { month: "Dec", reviews: 15 },
// ];

// export default function BReviewed() {
//   return (
//     <div className="w-full max-w-4xl">
//       <Card className="w-full bg-brown-50 border-brown-200">
//         <CardHeader>
//           <CardTitle className="text-[#B83214] font-serif">Books Reviewed so far</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={reviewData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" />
//               <XAxis dataKey="month" stroke="#8B4513" fontSize={12} tickLine={false} axisLine={{ stroke: '#8B4513' }} />
//               <YAxis stroke="#8B4513" fontSize={12} tickLine={false} axisLine={{ stroke: '#8B4513' }} />
//               <Tooltip contentStyle={{ backgroundColor: "#FFF8DC", border: "1px solid #8B4513", borderRadius: "4px" }} labelStyle={{ color: "#8B4513" }} itemStyle={{ color: "#8B4513" }} />
//               <Line type="monotone" dataKey="reviews" stroke="#A0522D" strokeWidth={2} dot={{ fill: "#A0522D", strokeWidth: 2 }} activeDot={{ r: 8 }} />
//             </LineChart>
//           </ResponsiveContainer>
//           <div className="mt-4 text-center text-sm text-[#77768a] font-semibold">
//             Total Books Reviewed: {reviewData.reduce((sum, item) => sum + item.reviews, 0)}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
