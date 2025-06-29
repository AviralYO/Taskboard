import React from "react";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const colorChoices = ["#00C9A7", "#2c5364", "#ff6b6b", "#feca57", "#1dd1a1", "#fff", "#111", "#9b59b6", "#e67e22"];

export default function TaskModal({
  projects = [],
  defaultProjectId = "",
  onAddTask,
  onAddProject,
  onClose
}) {
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("Low");
  const [projectId, setProjectId] = useState(defaultProjectId || (projects[0]?.id ?? ""));
  const [creatingProject, setCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectColor, setNewProjectColor] = useState(colorChoices[0]);

  function handleSubmit(e) {
    e.preventDefault();
    let selectedProjectId = projectId;
    if (creatingProject && newProjectName) {
      selectedProjectId = onAddProject(newProjectName, newProjectColor);
    }
    if (!desc || !due || !priority || !selectedProjectId) return; // Validate
    onAddTask({ desc, due, priority, projectId: selectedProjectId });
    onClose();
  }

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#232526",
        color: "#fff",
        padding: "2rem", borderRadius: "1rem", minWidth: 320
      }}>
        <h3 style={{ marginBottom: "1rem", color: "#00C9A7" }}>Add Task</h3>
        <input
          type="text"
          placeholder="Task description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "1rem",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#232526",
            color: "#fff"
          }}
        />
        <input
          type="date"
          value={due}
          onChange={e => setDue(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "1rem",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#232526",
            color: "#fff"
          }}
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "1rem",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#232526",
            color: "#fff"
          }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        {!creatingProject ? (
          <>
            <select
              value={projectId}
              onChange={e => {
                if (e.target.value === "__create__") {
                  setCreatingProject(true);
                } else {
                  setProjectId(e.target.value);
                }
              }}
              style={{
                width: "100%",
                marginBottom: "1rem",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "#232526",
                color: "#fff"
              }}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
              <option value="__create__">+ Create new project</option>
            </select>
          </>
        ) : (
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="New project name"
              value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
              required
              style={{
                width: "100%",
                marginBottom: "0.5rem",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "#232526",
                color: "#fff"
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              {colorChoices.map(color => (
                <div
                  key={color}
                  style={{
                    background: color,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: newProjectColor === color ? "2px solid #00C9A7" : "2px solid transparent",
                    cursor: "pointer"
                  }}
                  onClick={() => setNewProjectColor(color)}
                />
              ))}
            </div>
            <button type="button" onClick={() => setCreatingProject(false)} style={{
              background: "transparent", color: "#00C9A7", border: "none", cursor: "pointer"
            }}>Cancel</button>
          </div>
        )}
        <button type="submit" style={{
          background: "#00C9A7", color: "#fff", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1.5rem", fontWeight: "bold"
        }}>Add</button>
        <button
          type="button"
          onClick={onClose}
          style={{
            marginLeft: "1rem", background: "transparent", color: "#fff", border: "none"
          }}
        >Cancel</button>
      </form>
    </div>
  );
}
