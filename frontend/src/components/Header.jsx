import { Link } from "react-router-dom";
import {
  AlarmClockCheck,
  CircleUserRound,
  LayoutGrid,
  ListCheck,
  TimerOff,
} from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import ProfileModal from "./ProfileModal";

const navItems = [
  {
    icon: <LayoutGrid />,
    title: "All",
    link: "/",
  },
  {
    icon: <ListCheck />,
    title: "Completed",
    link: "/completed",
  },
  {
    icon: <AlarmClockCheck />,
    title: "Pending",
    link: "/pending",
  },
  {
    icon: <TimerOff />,
    title: "Overdue",
    link: "/overdue",
  },
];

const Header = () => {
  const { profileModal, openModalProfile } = useTaskStore();
  return (
    <header className="h-20 lg:h-16 py-4 px-8 lg:shadow-md sticky top-0 z-40 bg-gray-900 text-white">
      <nav className="flex items-center justify-between">
        <Link
          to="/"
          className="text-md lg:text-2xl font-bold text-emerald-400 flex items-center space-x-2"
        >
          Task Manager
        </Link>
        <ul className="flex gap-12">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link href={item.link}>{item.icon}</Link>

              {/* Hover Tooltip */}
              <span className="u-triangle absolute top-[200%]  translate-y-[-50%] text-xs pointer-events-none text-white bg-emerald-700 px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-8">
          <button
            onClick={openModalProfile}
            className="text-white px-3 py-1 rounded-md font-medium "
          >
            <CircleUserRound />
          </button>
        </div>
      </nav>
      {profileModal && <ProfileModal />}
    </header>
  );
};

export default Header;
