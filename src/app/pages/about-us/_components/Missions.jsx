
import { Card } from "@/components/ui/card"
import { Handshake, Heart, Target } from 'lucide-react'

const missions= [
  {
    icon: <Target className="w-12 h-12 text-white" />,
    title: "Our Mission",
    description: "To create a world where every reader feels empowered, every story finds its audience, and the love for books thrives across generations. "
     },
  {
    icon: <Handshake className="w-12 h-12 text-white" />,
    title: "Our Commitment",
    description: "We are committed to delivering an exceptional reading experience by curating inspiring and diverse books, offering personalized recommendations tailored to every reader, and empowering voices through a platform that values authentic sharing."
  },
  {
    icon: <Heart className="w-12 h-12 text-white" />,
    title: "Our Values",
    description: "At Book Owl, we are guided by our passion for reading, celebrating the transformative power of books and inspiring every reader.  With a commitment to integrity, we ensure transparency, authenticity, and meaningful recommendations for all."
  },
]
export default function Missions() {
  return (
    <div className="container mx-auto px-[5%] py-16">
      <div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" 
        data-aos="fade-up"
      >
        {missions.map((mission, index) => (
          <Card 
            key={index} 
            className="flex flex-col items-center p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-transparent"
          >
            <div className="mb-4 rounded-full bg-amber-900 p-3">
              {mission.icon}
            </div>
            <h2 className="mb-3 text-xl font-semibold">{mission.title}</h2>
            <p className="text-gray-600">{mission.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

