import { Check, Pencil, Trash } from "lucide-react";
import { formatDate } from "../utils/dateFormat";
import { useTaskStore } from "../store/taskStore";
import useConfirmDialog from "../hooks/useConfirmDialog";

const TaskItem = ({ task }) => {
  const { getTask, openModalForEdit, deleteTask, completeTask } =
    useTaskStore();
  // Use the custom hook
  const { openDialog, ConfirmDialog } = useConfirmDialog();
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  return (
    <div className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-gray-900 rounded-lg border-2 border-gray-700">
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex flex-col gap-4">
        <div className="ml-auto flex items-center gap-3 text-gray-400 text-[1.2rem]">
          <button
            onClick={() => completeTask(task._id)}
            className={`${task.completed ? "text-green-500" : "text-gray-400"}`}
          >
            <Check />
          </button>
          <button
            className="text-[#00A1F1]"
            onClick={() => {
              getTask(task._id);
              openModalForEdit(task);
            }}
          >
            <Pencil />
          </button>
          <button
            className="text-[#F65314]"
            onClick={() => openDialog(`delete ${task.title}`, deleteTask)}
          >
            <Trash />
          </button>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-400">{formatDate(task.createdAt)}</p>
          <p
            className={`text-sm font-bold uppercase ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </p>
        </div>
      </div>
      {/* Render the ConfirmDialog */}
      <ConfirmDialog />
    </div>
  );
};

export default TaskItem;
