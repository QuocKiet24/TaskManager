import { useTaskStore } from "../store/taskStore";
import TaskItem from "../components/TaskItem";
import { useEffect } from "react";
import Modal from "../components/Modal";

const HomePage = () => {
  const { tasks, getTasks, openModalForAdd, isEditing } = useTaskStore();
  useEffect(() => {
    getTasks();
  }, [getTasks]);
  return (
    <main className="h-full m-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <h1>Filters</h1>
      </div>
      <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
        {tasks.map((task, index) => (
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
      {isEditing && <Modal />} {/* Show modal when editing */}
    </main>
  );
};

export default HomePage;
