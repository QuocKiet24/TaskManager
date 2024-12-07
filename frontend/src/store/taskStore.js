import { create } from "zustand";
import axios from "axios";

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
      task,
    });
  },
  closeModal: () => {
    set({
      modalMode: "",
      isEditing: false,
      task: {},
    });
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
}));
