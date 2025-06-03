import Navbar from "./_components/Navbar1.jsx";
import Footer from "./_components/Footer1.jsx";

export default function HomeLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
