import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header />
      <div className="flex flex-1">
        <div className="flex-1 overflow-y-auto pr-[20rem] pl-6 py-6">
          <Outlet />
        </div>
        <div className="hidden md:block fixed w-[20rem] right-0 top-16 bottom-0 overflow-hidden bg-gray-900 shadow-lg ">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
