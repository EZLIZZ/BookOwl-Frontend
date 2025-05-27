"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Bchart({ data }) {
  // Get a color for each category
  const getCategoryColor = (category) => {
    const colors = {
      Thriller: "#5f432e",
      Mystery: "#ba9054",
      Fantasy: "#765337",
      Romance: "#ad7c49",
      Biography: "#8f633e",
      "Non-Fiction": "#00FF8C",
      Fiction: "#8C00FF",
      Pschyology: "#FFFF00",
    };
    return colors[category] || "#000000"; // Default color if category not found
  };

  // Map all categories from categoryStats and slice it to show only top 5
  const chartData = (data?.categoryStats || [])
    .map((category) => ({
      category: category.category,
      totalBooks: category.totalBooks,
      fill: getCategoryColor(category.category), // Apply color based on category
    }))
    .slice(0, 5); // Limit to top 5 categories

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-amber-900">
          Bar Chart - Category Stats
        </CardTitle>
        <CardDescription>Top 5 Book Categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              left: 2, // Add some left margin to avoid overlap
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={25} // Increased margin for better label visibility
              axisLine={false}
              width={60} // Set width to ensure labels have enough space
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#333" // Adjust label color if necessary
                  transform="rotate(0)" // Rotate if needed (can change angle if it's still clipping)
                >
                  {payload.value}
                </text>
              )}
            />
            <XAxis dataKey="totalBooks" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="totalBooks" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-amber-900">
          Thiller and Mystery  <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top 5 book categories by total books
        </div>
      </CardFooter>
    </Card>
  );
}
