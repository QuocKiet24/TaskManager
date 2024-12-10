import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Profile from "./Profile";

const SideBar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full flex flex-col p-6">
      <Profile />
      <div className="mt-2 mx-6">
        <h3 className="font-medium">Activity</h3>
      </div>

      <button onClick={handleLogout} className="btn mt-auto">
        Sign Out
      </button>
    </div>
  );
};

export default SideBar;
