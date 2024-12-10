import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/dateFormat";
import { Loader } from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import { X } from "lucide-react";
import useDetectOutside from "../hooks/useDetectOutside";
import { useRef, useState } from "react";

const ProfileModal = () => {
  const { user, error, isLoading, updateUser } = useAuthStore();
  const { closeModalProfile, profileModal } = useTaskStore();
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
  });
  const ref = useRef(null);
  // Use the hook to detect clicks outside the modal
  useDetectOutside({
    ref,
    callback: () => {
      if (profileModal) {
        closeModalProfile(); // Close modal if it is in add/edit mode
      }
    },
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(data);
    closeModalProfile();
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        ref={ref}
        className="max-w-lg w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
      >
        <div className="absolute left-0 top-0 w-full h-[80px] bg-gray-600/10 rounded-tr-md rounded-tl-md">
          {" "}
          <button
            onClick={closeModalProfile}
            className="absolute top-5 right-5"
          >
            <X />
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          Profile
        </h2>

        <div className="space-y-6">
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-green-400">
              Profile Information
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-lg font-bold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex-1">
                <p className="text-gray-300 text-sm">
                  <span className="font-medium">Joined: </span>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-300 text-sm">
                  <span className="font-medium">Last Login: </span>

                  {formatDate(user?.lastLogin)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="pt-2 grid grid-cols-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="pt-4 grid grid-cols-2 ">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>

              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email Address"
                value={data.email}
                onChange={handleChange}
                className="input "
              />
            </div>

            {error && (
              <p className="text-red-500 font-semibold my-2">{error}</p>
            )}

            <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className=" animate-spin mx-auto" size={24} />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ProfileModal;
