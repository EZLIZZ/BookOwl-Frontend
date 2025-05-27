// /pages/categorypage/page.jsx (server component)

import React, { Suspense } from "react";
import CategoryPageClient from "./_components/CategoryPageClient";

export default function CategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageClient />
    </Suspense>
  );
}
