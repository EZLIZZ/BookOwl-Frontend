"use client"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const Review =[
    {
        id:1,
        name: "Alisha",
        stars:5,
        description:"\"I would tell anyone to just sign up without reservation. I now have more books than I can read in a lifetime.\""

    },
    {
        id:2,
        name: "Alisha",
        stars:4,
        description:"\"I would tell anyone to just sign up without reservation. I now have more books than I can read in a lifetime.\""

    },
    {
        id:3,
        name: "Alisha",
        stars:5,
        description:"\"I would tell anyone to just sign up without reservation. I now have more books than I can read in a lifetime.\""

    }
]


export default function HappyReaders(){
    return(
        <div className="my-[100px] ">
            <h1 className="text-5xl font-semibold text-center text-[#265073] mb-[50px] " data-aos="fade-down">Join Happy Readers</h1>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 text-center mx-[20%] ">
                
                    {Review.map((items)=>(
                        <Card key={items.id} className="space-y-5 p-5 text-amber-900 shadow-lg bg-inherit hover:shadow-2xl hover:ease-in-out duration-700 " data-aos="fade-up" >
                            <div className="flex w-full justify-center " >
                              {Array.from({ length: items.stars }).map((_, index) => (
              <Star key={index} className="text-yellow-500 fill-current" />
              
            ))} </div> 
            <h1>{items.description}</h1>
            <h1 className="font-semibold text-[#265073]">{items.name}</h1>
                        </Card>
                    ))}

                </div>
              


            </div>


        
    )
}