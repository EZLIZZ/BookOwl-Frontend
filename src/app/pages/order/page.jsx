import BookForm from "./_components/BookForm"

import YourOrder from "./_components/YourOrder"


export default function Order(){
 return (
  <div className="min-h-screen px-[5%] grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[#E6D4B9] pt-[120px]">
    {/* Order Summary: Appears first on mobile, second on desktop */}
    <div className="order-1 sm:order-2 w-full">
      <YourOrder />
    </div>

    {/* Order Form: Appears second on mobile, first on desktop */}
    <div className="order-2 sm:order-1 w-full sm:col-span-2 pb-10">
      <BookForm />
    </div>
  </div>
);

}