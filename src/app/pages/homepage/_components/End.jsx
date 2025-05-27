import Link from "next/link";
export default function ExploreMore() {
    return (
      <div className="text-center p-6">
        <p className="text-lg font-semibold text-[#8F3623] font-serif">
          Want to explore more amazing books? Click the button below and dive into our collection!
        </p>
        <Link href ="/pages/categorypage">
        <button className="mt-4 px-6 py-3 bg-[#265073] text-white font-medium rounded-lg shadow-md hover:bg-[#49779c] transition">
          Explore More
        </button>
        </Link>
      </div>
    );
  }
  