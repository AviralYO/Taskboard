import { useState } from "react";
import TaskModal from "./TaskModal";
import { v4 as uuidv4 } from "uuid";
import { MdDelete, MdDone } from "react-icons/md";

export default function TasksPage({ selectedProjectId, projects, setProjects, tasks, setTasks, dark }) {
  const [showTaskModal, setShowTaskModal] = useState(false);

  function handleAddTask(task) {
    setTasks([...tasks, { ...task, id: uuidv4(), completed: false }]);
  }

  function handleAddProject(name, color) {
    const id = uuidv4();
    setProjects([...projects, { id, name, color }]);
    return id;
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function handleMarkDone(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    ));
  }

  function handleMarkUndone(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: false } : task
    ));
  }

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="main-content" style={{ marginLeft: "5px", minHeight: "100vh", width: "calc(100vw - 5px)" }}>
      <div style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem"
      }}>
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

        {/* Active Tasks */}
        <h3 style={{ color: "#00C9A7", marginTop: "2rem" }}>Active Tasks</h3>
        {activeTasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {activeTasks.map(task => (
              <li key={task.id} style={{
                display: "flex",
                alignItems: "center",
                color: "#fff",
                background: "rgba(0,0,0,0.13)",
                marginBottom: "0.5rem",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                fontFamily: "inherit"
              }}>
                <span style={{ flex: 1 }}>
                  {task.desc} | {task.due} | {task.priority} | Project: {projects.find(p => p.id === task.projectId)?.name}
                </span>
                <button
                  onClick={() => handleMarkDone(task.id)}
                  style={{
                    background: "transparent",
                    color: "#00C9A7",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    marginRight: "0.5rem"
                  }}
                  title="Mark as Done"
                >
                  <MdDone />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{
                    background: "transparent",
                    color: "#ff6b6b",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer"
                  }}
                  title="Delete Task"
                >
                  <MdDelete />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Completed Tasks */}
        <h3 style={{ color: "#00C9A7", marginTop: "2.5rem" }}>Completed Tasks</h3>
        {completedTasks.length === 0 ? (
          <p>No completed tasks yet.</p>
        ) : (
          <ul>
            {completedTasks.map(task => (
              <li key={task.id} style={{
                display: "flex",
                alignItems: "center",
                color: "#aaa",
                background: "rgba(0,0,0,0.08)",
                marginBottom: "0.5rem",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                fontFamily: "inherit",
                textDecoration: "line-through"
              }}>
                <span style={{ flex: 1 }}>
                  {task.desc} | {task.due} | {task.priority} | Project: {projects.find(p => p.id === task.projectId)?.name}
                </span>
                <button
                  onClick={() => handleMarkUndone(task.id)}
                  style={{
                    background: "transparent",
                    color: "#00C9A7",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    marginRight: "0.5rem"
                  }}
                  title="Mark as Not Done"
                >
                  <MdDone />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{
                    background: "transparent",
                    color: "#ff6b6b",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer"
                  }}
                  title="Delete Task"
                >
                  <MdDelete />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
