import { Button } from "@/components/ui/button";
// import BookCarousel from "./BookCarousel";
import Link from "next/link";
export default function Background() {
  return (
    <div className="w-full bg-[#f5dac7] relative overflow-x-hidden overflow-hidden h-[900px] shadow-2xl py-12">
      {/* Background design */}
      <div className="rounded-[20%] sm:absolute z-0 sm:bg-[#BA9C84] sm:w-[1000px] sm:h-[1000px] sm:flex  sm:justify-items-end sm:origin-top-left sm:rotate-[25deg] sm:right-[-740px] sm:top-[-150px] sm:overflow-hidden "></div>
      <div className=" flex sm:justify-between sm:flex-row flex-col sm:mx-[10%] mx-[10px] sm:mt-[50px] mt-0">
        <div
          className="sm:w-[40%] w-full sm:mt-10 mt-5 text-primary "
          data-aos="fade-right"
        >
          <h1 className="sm:text-5xl text-xl z-40 leading-snug sm:my-10 my-5 text-[#6E4151]"></h1>
          <h1 className="sm:text-5xl text-xl z-40 leading-snug sm:my-10 my-5 text-[#945F39]">
            Discover And Find Your New Favorite Books
          </h1>
          <p className="sm:leading-loose leading-normal text-[#265073] text-lg">
            Explore a world of stories, ideas, and knowledge. Whether you&apos;re
            into gripping thrillers, heartwarming romances, or insightful
            non-fiction, BookOwl helps you discover the books you&apos;ll love. Dive
            into your next great read today!
          </p>
         <Link href="/browse">
          <Button className="my-10 bg-[#265073] " data-aos="fade-up">
            Browse
          </Button>
          </Link>
        </div>
        <div className="z-30 " data-aos="fade-left">
          <img src="/photos/coffeeimage.png" />
        </div>
      </div>
    </div>
  );
}
