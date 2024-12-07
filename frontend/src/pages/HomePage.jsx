import { useTaskStore } from "../store/taskStore";
import TaskItem from "../components/TaskItem";
import { useEffect } from "react";

const HomePage = () => {
  const { tasks, getTasks } = useTaskStore();
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
      </div>
    </main>
  );
};

export default HomePage;
