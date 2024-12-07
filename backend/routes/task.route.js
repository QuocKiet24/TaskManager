import express from "express";
import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getManyTasks,
  getTask,
  updateTask,
} from "../controllers/task.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-task", verifyToken, createTask);
router.get("/get-manytasks", verifyToken, getManyTasks);
router.get("/get-task/:id", verifyToken, getTask);
router.patch("/update-task/:id", verifyToken, updateTask);
router.delete("/delete-task/:id", verifyToken, deleteTask);
router.delete("/delete-task", verifyToken, deleteAllTasks);

export default router;
