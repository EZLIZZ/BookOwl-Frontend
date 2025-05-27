import Background from "./_components/Background.jsx"
import Landing2 from "./_components/Landing2.jsx"
import HappyReaders from "./_components/HappyReaders.jsx"


// import BookCarousel from "./_components/BookCarousel.jsx";

export default function Home() {
  return (
   <div className="overflow-hidden bg-[#f5dac7]">
   <Background />
   <Landing2 />
   <HappyReaders />
   {/* <BookCarousel /> */}
   </div>
  );
}
