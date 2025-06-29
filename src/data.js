import { v4 as uuidv4 } from "uuid";

export const projects = [
  { id: uuidv4(), name: "Personal", color: "#00C9A7" },
  { id: uuidv4(), name: "Work", color: "#2c5364" }
];

export const tasks = [
  {
    id: uuidv4(),
    projectId: projects[0].id,
    title: "Buy groceries",
    dueDate: "2025-06-28",
    priority: "High",
    color: "#ff6b6b",
    completed: false
  },
  {
    id: uuidv4(),
    projectId: projects[1].id,
    title: "Finish report",
    dueDate: "2025-06-29",
    priority: "Medium",
    color: "#feca57",
    completed: false
  }
];
