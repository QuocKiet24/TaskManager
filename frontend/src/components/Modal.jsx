import { useEffect, useRef } from "react";
import { useTaskStore } from "../store/taskStore";
import useDetectOutside from "../hooks/useDetectOutside";
import { formatDueDate } from "../utils/dateFormat";

const Modal = () => {
  const {
    task,
    activeTask,
    handleInput,
    modalMode,
    closeModal,
    createTask,
    isEditing,
  } = useTaskStore();
  const ref = useRef(null);

  // Use the hook to detect clicks outside the modal
  useDetectOutside({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal(); // Close modal if it is in add/edit mode
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      handleInput("EditTask")(activeTask);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalMode, activeTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "add") {
      createTask(task);
    }
    closeModal();
  };
  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <form
        action=""
        className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        ref={ref}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="bg-gray-900 p-2 rounded-md border"
            type="text"
            id="title"
            placeholder="Task Title"
            name="title"
            value={task.title}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="bg-gray-900 p-2 rounded-md border resize-none"
            name="description"
            placeholder="Task Description"
            rows={4}
            value={task.description}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority">Select Priority</label>
          <select
            id="priority"
            className="bg-gray-900 p-2 rounded-md border cursor-pointer"
            name="priority"
            value={task.priority}
            onChange={(e) => handleInput("priority")(e)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            className="bg-gray-900 p-2 rounded-md border"
            type="date"
            name="dueDate"
            value={formatDueDate(task.dueDate)}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="completed">Task Completed</label>
          <div className="flex items-center justify-between bg-gray-900 p-2 rounded-md border">
            <label htmlFor="completed">Completed</label>
            <div>
              <select
                id="completed"
                className="bg-gray-900 p-2 rounded-md border cursor-pointer"
                name="completed"
                value={task.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={`btn ${
              modalMode === "edit" ? "bg-blue-400" : "bg-green-400"
            }`}
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
