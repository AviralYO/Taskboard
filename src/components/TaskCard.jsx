import React from "react";
import "../styles/TaskCard.css";

const priorityColors = {
  Low: "#1dd1a1",
  Medium: "#feca57",
  High: "#ff6b6b"
};

export default function TaskCard({ task }) {
  return (
    <div className="task-card" style={{ borderLeft: `8px solid ${task.color}` }}>
      <div className="task-header">
        <span className="task-title">{task.title}</span>
        <span
          className="task-priority"
          style={{ background: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>
      <div className="task-meta">
        <span>Due: {task.dueDate}</span>
      </div>
    </div>
  );
}
