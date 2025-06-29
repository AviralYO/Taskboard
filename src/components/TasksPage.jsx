import { useState, useEffect } from "react";
import TaskModal from "./TaskModal";
import AnimatedBackground from "./AnimatedBackground";
import { v4 as uuidv4 } from "uuid";



export default function TasksPage({ selectedProjectId,projects, setProjects, tasks, setTasks, dark }) {
  const [showTaskModal, setShowTaskModal] = useState(false);

  function handleAddTask(task) {
    setTasks([...tasks, { ...task, id: uuidv4() }]);
  }

  function handleAddProject(name, color) {
    const id = uuidv4();
    setProjects([...projects, { id, name, color }]);
    return id;
  }

  return (
    <div className="main-content" style={{ marginLeft: "5px", minHeight: "100vh", width: "calc(100vw - 5px)" }}>
    <div style={{
  width: "100%",
  maxWidth: "900px",
  margin: "0 auto",
  padding: "2rem"}}>
      <h2 style={{ color: "#00C9A7", fontSize: "2rem", fontWeight: "bold" }}>Tasks</h2>
      <button
        onClick={() => setShowTaskModal(true)}
        style={{
          background: "#00C9A7",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.5rem 1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem"
        }}
      >
        Add Task
      </button>
      {showTaskModal && (
        <TaskModal
          selectedProjectId={selectedProjectId}
          projects={projects}
          onAddTask={handleAddTask}
          onAddProject={handleAddProject}
          onClose={() => setShowTaskModal(false)}
          dark={dark}
        />
      )}
      {/* Render tasks here */}
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.desc} | {task.due} | {task.priority} | Project: {projects.find(p => p.id === task.projectId)?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}