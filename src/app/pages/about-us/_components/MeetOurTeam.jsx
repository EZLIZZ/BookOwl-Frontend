import { Card } from "@/components/ui/card";


const teamMembers = [
  {
    name: "Aisha Neupane",
    role: "Frontend",
    image: "/photos/aisha.jpg", // Replace with actual image path
   
  },
  {
    name: "Alisha Shrestha",
    role: "AI",
    image: "/photos/alisha.jpg", // Replace with actual image path
  },
  {
    name: "Yunika Bhandari",
    role: "Backend",
    image: "/photos/yunika.jpg", // Replace with actual image path
    
  },
  
];

export default function MeetOurTeam() {
  return (
    <div className="container mx-auto py-16 px-5 bg-[#e3ceaf] ">
      <h2 className="text-3xl text-center font-bold text-[#265073] mb-12 ">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="flex flex-col items-center p-6  text-center shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover mb-4 "
            />
            <h3 className="text-xl font-semibold text-[#122e4b]">{member.name}</h3>
            <p className="text-[#94603a] text-lg mb-3">{member.role}</p>
            <p className="text-gray-600 text-sm">{member.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
