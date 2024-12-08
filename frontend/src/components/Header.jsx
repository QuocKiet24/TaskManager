import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const { logout, user } = useAuthStore();
  const userId = user._id;
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="h-20 lg:h-16 py-4 px-8 lg:shadow-md sticky top-0 z-40 bg-gray-900 text-white">
      <nav className="flex items-center justify-between">
        <Link
          to="/"
          className="text-md lg:text-2xl font-bold text-emerald-400 flex items-center space-x-2"
        >
          Task Manager
        </Link>
        <div className="text-lg font-medium hidden lg:block">
          {userId ? `👋 Welcome, ${user.name}!` : "Welcome to Task Manager!"}
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
