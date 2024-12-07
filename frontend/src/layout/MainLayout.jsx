import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="max-w-screen w-full max-h-screen h-screen bg-gray-800 shadow-xl overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
