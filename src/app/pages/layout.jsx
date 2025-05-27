import Navbar from "./_components/Navbar1.jsx";
import Footer from "./_components/Footer1.jsx";




export default function HomeLayout({ children }) {
  return (
    <>



      <Navbar />
      {children}
      <Footer />
  

    
    </>
  );
}
