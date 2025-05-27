import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
export default function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6D4B9]">
      <Card className="w-96 p-6 text-center shadow-lg border border-green-500">
        <CardContent className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-semibold font-serif text-[#8F3623] mt-4">Success!</h2>
          <p className="text-gray-600 mt-2">Your payment is successful.</p>
          <Link href="/pages/homepage">
          <Button className="mt-4 bg-[#265073]" >
            Go to Home Page
          </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
