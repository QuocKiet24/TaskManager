import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useTaskStore } from "../store/taskStore";
import Profile from "./Profile";
import useConfirmDialog from "../hooks/useConfirmDialog"; // Import the new hook

const SideBar = () => {
  const { logout } = useAuthStore();
  const { completeAllTasks, deleteAllTasks } = useTaskStore();
  const navigate = useNavigate();

  // Use the custom hook
  const { openDialog, ConfirmDialog } = useConfirmDialog();

  const handleLogout = async () => {
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

      <div className="flex mt-32 gap-2">
        <button
          onClick={() => openDialog("complete all tasks", completeAllTasks)}
          className="w-1/2 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          Complete All
        </button>

        <button
          onClick={() => openDialog("delete all tasks", deleteAllTasks)}
          className="w-1/2 py-3 px-4 bg-gradient-to-r from-red-500 to-red-900 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          Delete All
        </button>
      </div>

      <button
        onClick={() => openDialog("sign out", handleLogout)}
        className="btn mt-auto"
      >
        Sign Out
      </button>

      {/* Render the ConfirmDialog */}
      <ConfirmDialog />
    </div>
  );
};

export default SideBar;
