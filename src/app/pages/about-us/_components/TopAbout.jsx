

export default function TopAbout() {
  return (
    <div className="bg-[#e3ceaf] pt-[70px] rounded-lg w-full mb-10 shadow-lg">
      <div className="ml-8  p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Text Section */}
          <div data-aos="fade-right">
            <h1 className="text-4xl text-[#265073] font-serif font-bold mb-6">
              About Us
            </h1>
            <p className="font-serif text-[#94603a] text-lg leading-relaxed">
              Welcome to Book Owl, your ultimate destination for discovering and exploring the books that matter most to you. At Book Owl, we understand the profound impact that books can have on our lives—they transport us to new worlds, broaden our perspectives, and touch our hearts in ways nothing else can. That’s why we’ve created a platform designed especially for readers, where your passion for stories takes center stage. Here, you’re not just a visitor; you’re part of a vibrant community of book lovers. Discover a diverse collection of books curated across genres, themes, and styles, from timeless classics to emerging voices, ensuring there’s something for everyone.
            </p>
            <div className="mt-6">

            </div>
          </div>
          
          {/* Image Section */}
          <div data-aos="fade-left" className="flex justify-center">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
              <img
                src="/photos/owl3.jpg"
                alt="About Us"
                className="rounded-xl w-full h-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
