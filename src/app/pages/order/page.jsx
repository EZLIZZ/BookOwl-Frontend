import BookForm from "./_components/BookForm"

import YourOrder from "./_components/YourOrder"


export default function Order(){
  return(
    <div className="min-h-screen px-[5%] grid grid-cols-3 gap-5 bg-[#E6D4B9] pt-[120px]">
  
      
      {/* Left: Order Form */}
      <div className=" w-full col-span-2 pb-10">
        <BookForm />
      </div>

      {/* Right: Your Order Summary */}
      <div className=" w-full">
        <YourOrder />
      </div>

    </div>
  
  )
}