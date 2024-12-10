import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

const Filters = () => {
  const { setPriority } = useTaskStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const priorities = ["All", "Low", "Medium", "High"];

  return (
    <div className="relative py-2 px-2 grid grid-cols-4 items-center gap-3 bg-gray-800 border-2 border-gray-600 rounded-md">
      <span
        className="absolute left-[5px] bg-gray-500 rounded-md transition-all duration-300"
        style={{
          width: "calc(100% / 4 - 10px)",
          height: "calc(100% - 10px)",
          top: "50%",
          transform: `translate(calc(${activeIndex * 100}% + ${
            activeIndex * 10
          }px), -50%)`,
          transition: "transform 300ms cubic-bezier(.95,.03,1,1)",
        }}
      ></span>
      {priorities.map((item, index) => (
        <button
          key={index}
          className={`relative px-1 z-10 font-medium text-sm ${
            activeIndex === index ? "text-[#3aafae] " : "text-gray-500"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setPriority(item.toLowerCase());
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Filters;
