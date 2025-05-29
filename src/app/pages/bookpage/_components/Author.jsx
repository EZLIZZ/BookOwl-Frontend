export default function Author({ data }) {
  const authorName = data?.author?.authorName ;
  const authorBio = data?.author?.authorBio ;
  const authorImage = data?.author?.authorImage
    ? data.author.authorImage.replace(/\\/g, "/")
    : "/images/default-cover.jpg";

  return (
    <section className="max-w-5xl mx-auto bg-white shadow rounded-md p-4 sm:p-6 mt-4 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#b68a6a] mb-3 sm:mb-5 text-center sm:text-left">
        About the Author
      </h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <img
          src={authorImage}
          alt={`${authorName}'s photo`}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full shadow"
        />
        <div className="text-center sm:text-left">
          <p className="text-gray-800 font-semibold text-lg font-serif">
            {authorName}
          </p>
          <p className="text-[#265073] font-serif mt-1 text-sm sm:text-base">
            {authorBio}
          </p>
        </div>
      </div>
    </section>
  );
}
