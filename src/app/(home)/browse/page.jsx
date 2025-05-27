import { Suspense } from "react";
import CategoryPage from "./_components/CategoryPage";

export default function BrowsePage() {
  return (
    <Suspense fallback={<div>Loading browse page...</div>}>
      <CategoryPage />
    </Suspense>
  );
}
