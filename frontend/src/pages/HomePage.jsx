import { useTaskStore } from "../store/taskStore";
import TaskItem from "../components/TaskItem";
import { useEffect } from "react";
import Modal from "../components/Modal";
import Filters from "../components/Filters";
import { filteredTasks } from "../utils/Filters";

const HomePage = () => {
  const { tasks, getTasks, openModalForAdd, isEditing, priority } =
    useTaskStore();

  const filtered = filteredTasks(tasks, priority);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">All Tasks</h1>
        <Filters />
      </div>

      {/* Task List */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
        {filtered.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
        <button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
        >
          Add New Task
        </button>
      </div>

      {/* Modal */}
      {isEditing && <Modal />}
    </div>
  );
};

export default HomePage;