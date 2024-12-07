import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const { logout } = useAuthStore();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="h-20 lg:h-16 p-4 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-gray-900">
      <nav className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex"
        >
          Task Manager
        </Link>
        <div className="flex items-center gap-4">
          <Link
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
