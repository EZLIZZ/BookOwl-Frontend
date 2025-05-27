import Navbar from "./_components/ui/Navbar.jsx";
import Footer from "./_components/ui/Footer.jsx";

export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
