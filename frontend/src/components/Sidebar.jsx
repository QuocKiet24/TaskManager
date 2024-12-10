import { useAuthStore } from "../store/authStore";

const SideBar = () => {
  const { logoutUser } = useAuthStore();

  return (
    <div className="h-full flex flex-col p-6">
      <h2 className="text-lg font-bold">Profile</h2>
      <div className="mt-4 flex-grow">Chart</div>
      <button onClick={logoutUser} className="btn mt-auto">
        Sign Out
      </button>
    </div>
  );
};

export default SideBar;
