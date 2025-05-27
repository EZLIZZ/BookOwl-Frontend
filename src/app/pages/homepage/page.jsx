"use client"
import Bigdiscount from "./_components/bigdiscount";
import Main from "./_components/main";
// import Sidebar from "./_components/sidebar"
// import Bookgrid from "./_components/bookgrid"
import Firstdesign from "./_components/firstdesign";
import CollectionCarousel from "./_components/CollectionCarousel";
import DealsCarousel from "./_components/DealsCarousel";
// import Secondmain from "./_components/SecondMain";
import BookCollections from  "./_components/BookCollections"
import End from "./_components/End"
// import BestSeller from "./_components/BestSeller";

// import NewArrivals from "./_components/NewArrivals"
// import End from "./_components/End";
import { useEffect, useState } from "react";
import $axios from "@/lib/axios.instance";

export default function Homepage(){
    const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // try {
    const response = await $axios.get("/book/dealsOfTheWeek");
    console.log(response);
    if (!response) {
      throw new Error(`HTTP erroe!:Status: ${response.status}`);
    }
    setData(response?.data.data);
    // } catch (err) {
    // setErrorMap(err.message);
    // }
  };
    return(
        <div >
            <Firstdesign/>
            <CollectionCarousel/>
            {/* <Sidebar/> */}
            {/* <Bookgrid/> */}
            <Main/>
            <DealsCarousel data = {data}/>
            <Bigdiscount/>
            {/* <Secondmain/> */}
            <BookCollections />
            {/* <NewArrivals/> */}
            {/* <BestSeller /> */}
            <End/>

            
        
        </div>
    )
}