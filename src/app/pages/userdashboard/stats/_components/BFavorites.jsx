// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";

// const favoriteData = [
//   { genre: "Fiction", count: 35 },
//   { genre: "Non-Fiction", count: 25 },
//   { genre: "Science Fiction", count: 20 },
//   { genre: "Mystery", count: 15 },
//   { genre: "Biography", count: 10 },
//   { genre: "Fantasy", count: 18 },
//   { genre: "Historical Fiction", count: 12 },
//   { genre: "Self-Help", count: 8 },
// ];

// const COLORS = [
//   '#8B4513', '#A0522D', '#CD853F', '#DEB887', 
//   '#D2691E', '#B8860B', '#DAA520', '#F4A460'
// ];

// export default function BFavorites() {
//   return (
//     <div className="w-full ">
//       <Card className="w-full bg-brown-50 border-brown-200">
//         <CardHeader>
//           <CardTitle className="text-[#B83214] font-serif">Favorite Book Genres </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie
//                 data={favoriteData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={150}
//                 dataKey="count"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {favoriteData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip contentStyle={{ backgroundColor: "#FFF8DC", border: "1px solid #8B4513", borderRadius: "4px" }} labelStyle={{ color: "#8B4513" }} itemStyle={{ color: "#8B4513" }} />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="mt-4 text-center text-sm text-[#77768a] font-semibold">
//             Total Favorite Books: {favoriteData.reduce((sum, item) => sum + item.count, 0)}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
