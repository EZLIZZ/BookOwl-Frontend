export default function Author({data}){
    return(
        <div className="max-w-5xl mx-auto bg-white shadow rounded-md p-6 mt-8">
      <h2 className="text-2xl font-semibold text-[#b68a6a] mb-4">About the Author</h2>
      <div className="flex items-center gap-6">
        {/* Author Photo */}
        {/* <img
          src="/photos/user.jpg" // Add the correct path to the author's image
          alt="Eryn Brooks"
          className="w-20 h-20 object-cover rounded-full "
        /> */}
        <img
          src={
            data?.author.authorImage
              ? data.author.authorImage.replace(/\\/g, "/") // Replace backslashes with forward slashes
              : "/images/default-cover.jpg" // Fallback to default cover image
          }
          alt="Author Image"
          className="w-20 h-20  object-cover rounded-full "
        />
        <div>
          {/* Author Description */}
          <p className="text-gray-700 font-semibold mb-2 font-serif">
           {data.author.authorName}
          </p>
          <p className="text-[#265073] font-serif">
           {data.author.authorBio}
          </p>
        </div>
      </div>
    </div>
    )
}