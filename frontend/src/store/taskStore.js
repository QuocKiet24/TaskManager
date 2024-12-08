import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/task"
    : "/api/task";

axios.defaults.withCredentials = true;

export const useTaskStore = create((set) => ({
  tasks: [],
  task: {},
  isLoading: false,
  isEditing: false,
  modalMode: "",
  error: null,
  activeTask: null,

  openModalForAdd: () => {
    set({
      modalMode: "add",
      isEditing: true,
      task: {},
    });
  },
  openModalForEdit: (task) => {
    set({
      modalMode: "edit",
      isEditing: true,
      task: task,
    });
  },
  closeModal: () => {
    set({
      isEditing: false,
      modalMode: "",
      activeTask: null,
      task: {},
    });
  },

  handleInput: (name) => (e) => {
    if (name === "EditTask") {
      set({
        task: e,
      });
    } else {
      set((state) => ({
        task: {
          ...state.task,
          [name]: e.target.value,
        },
      }));
    }
  },

  getTasks: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/get-manytasks`);

      set({
        tasks: response.data.tasks,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error retrieving tasks",
        isLoading: false,
      });
      throw error;
    }
  },

  getTask: async (taskId) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/get-task/${taskId}`);
      set({
        task: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error retrieving task",
        isLoading: false,
      });
      throw error;
    }
  },

  createTask: async (taskData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/create-task`, taskData);
      set((prevState) => ({
        tasks: [...prevState.tasks, response.data],
        isLoading: false,
      }));
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error(error.response.data.error);
      set({ isLoading: false });
    }
  },
}));
