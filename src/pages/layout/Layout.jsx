import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />a
      <Footer />
    </div>
  );
}

export default Layout;
