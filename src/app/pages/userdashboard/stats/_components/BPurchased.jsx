// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// const purchaseData = [
//   { month: "Jan", books: 5 },
//   { month: "Feb", books: 8 },
//   { month: "Mar", books: 12 },
//   { month: "Apr", books: 7 },
//   { month: "May", books: 15 },
//   { month: "Jun", books: 10 },
//   { month: "Jul", books: 13 },
//   { month: "Aug", books: 9 },
//   { month: "Sep", books: 11 },
//   { month: "Oct", books: 14 },
//   { month: "Nov", books: 16 },
//   { month: "Dec", books: 20 },
// ];

// export default function BPurchased() {
//   return (
//     <div className="w-full max-w-full">
//       <Card className="w-full bg-brown-50 border-brown-200">
//         <CardHeader>
//           <CardTitle className="text-[#B83214] font-serif">Books Purchased till now</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={purchaseData}>
//               <XAxis dataKey="month" stroke="#8B4513" fontSize={12} tickLine={false} axisLine={false} />
//               <YAxis stroke="#8B4513" fontSize={12} tickLine={false} axisLine={false} />
//               <Tooltip contentStyle={{ backgroundColor: "#FFF8DC", border: "1px solid #8B4513", borderRadius: "4px" }} labelStyle={{ color: "#8B4513" }} itemStyle={{ color: "#8B4513" }} />
//               <Bar dataKey="books" fill="#D2691E" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//           <div className="mt-4 text-center text-sm text-[#77768a] font-semibold">
//             Total Books Purchased: {purchaseData.reduce((sum, item) => sum + item.books, 0)}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
