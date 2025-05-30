export default function Landing2() {
  return (
    <div className="bg-[#f5dac7]">
      <div className="z-50 mt-[100px] flex justify-center sm:px-0 px-5" >
        <div className=" w-fit " data-aos="fade-up">
          <p className="sm:text-5xl text-2xl font-bold font-serif text-[#8f6545] sm:mb-5 mb-2" >
            &quot;Not all those who wander are lost.&quot;
          </p>
          <h1 className="font-sans text-xl  text-right mr-5 font-semibold text-[#436886] sm:mb-0 mb-5">
            — J.R.R. Tolkien
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-2 overflow-hidden mx-[10%] ">
        <div className="">
          <img src="/photos/landinging2.png" className="" data-aos="fade-right"/>
        </div>
        <div className=" text-primary flex justify-center flex-col " data-aos="fade-left">
          <h1 className=" sm:text-5xl text-xl leading-loose sm:my-10 my-2 ">
          <span className="text-[#265073]">Personalized </span>  Book Recommendations
          </h1>
          <p className="sm:text-lg text-sm ">
          &quot; Every book you click on will be tailor made for you based on your preference.&quot;
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
      <img src="/photos/arrow.png" className="sm:w-[200px] w-[100px] sm:h-[200px] h-[100px]" data-aos="zoom-in" ></img>
      </div>
      <div className="grid grid-cols-2  overflow-hidden mx-[10%] ">
       
        <div className=" text-primary flex justify-center flex-col " data-aos="fade-right">
          <h1 className=" sm:text-5xl text-xl leading-loose  sm:my-10 my-2">
          <span className="text-[#265073]">Real Reviews </span>  from     <span className="text-[#265073]">Real Readers </span>
          </h1>
          <p className="sm:text-lg text-sm">&quot;Let the stories of fellow readers guide you to your next adventure.&quot;
          </p>
        </div>
        <div className="">
          <img src="/photos/landingimg1.png" className="" data-aos="fade-left"/>
        </div>
      </div>
    </div>
  );
}
