import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdDragHandle } from "react-icons/md"; // <-- Import the drag handle icon

const colorChoices = [
  "#00C9A7", "#2c5364", "#ff6b6b", "#feca57", "#1dd1a1", "#fff", "#111", "#9b59b6", "#e67e22"
];

export default function ProjectsPage({ projects = [], setProjects, tasks = [], setTasks, dark }) {
  const [newName, setNewName] = useState("");
  const [newProjectColor, setNewProjectColor] = useState(colorChoices[0]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  function addProject(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setProjects([
      ...projects,
      { id: uuidv4(), name: newName, color: newProjectColor }
    ]);
    setNewName("");
    setNewProjectColor(colorChoices[0]);
  }

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectTasks = tasks.filter(t => t.projectId === selectedProjectId);

  function handleProjectTaskDragEnd(result) {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    const reordered = Array.from(projectTasks);
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);

    const otherTasks = tasks.filter(t => t.projectId !== selectedProjectId);
    setTasks([...otherTasks, ...reordered]);
  }

  return (
    <div style={{
      minHeight: "100vh",
      padding: "2rem",
      background: dark ? "#111" : "linear-gradient(135deg, #0f2027, #2c5364 80%)"
    }}>
      <h2 style={{
        color: "#00C9A7",
        fontSize: "2.5rem",
        fontWeight: "bold",
        marginBottom: "2rem",
        letterSpacing: "2px"
      }}>Projects</h2>
      <form
        onSubmit={addProject}
        style={{
          marginBottom: 32,
          display: "flex",
          gap: "1rem",
          alignItems: "center"
        }}
      >
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="New project name"
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.7rem",
            border: "none",
            fontSize: "1.1rem",
            background: dark ? "#232526" : "#fff",
            color: dark ? "#fff" : "#222"
          }}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
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
        <button
          type="submit"
          style={{
            background: "#00C9A7",
            color: "#fff",
            border: "none",
            borderRadius: "0.7rem",
            padding: "0.75rem 1.5rem",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginLeft: "0.5rem"
          }}
        >Add</button>
      </form>
      <div style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap"
      }}>
        {projects.map(p => (
          <div
            key={p.id}
            onClick={() => setSelectedProjectId(p.id)}
            style={{
              background: selectedProjectId === p.id ? "#00C9A7" : "rgba(255,255,255,0.08)",
              borderRadius: "1rem",
              padding: "2rem",
              minWidth: 220,
              color: selectedProjectId === p.id ? "#fff" : "#fff",
              fontWeight: "bold",
              fontSize: "1.3rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              borderLeft: `8px solid ${p.color}`,
              transition: "transform 0.2s, background 0.2s",
              cursor: "pointer"
            }}
          >
            {p.name}
          </div>
        ))}
      </div>
      {selectedProject && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ color: "#00C9A7" }}>
            Tasks for {selectedProject.name}
          </h3>
          {projectTasks.length === 0 ? (
            <p style={{ color: "#fff" }}>No tasks for this project.</p>
          ) : (
            <DragDropContext onDragEnd={handleProjectTaskDragEnd}>
              <Droppable droppableId="project-tasks">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ padding: 0, listStyle: "none" }}
                  >
                    {projectTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "#fff",
                              background: snapshot.isDragging ? "#00C9A7" : "rgba(0,0,0,0.13)",
                              marginBottom: "0.5rem",
                              borderRadius: "0.5rem",
                              padding: "0.5rem 1rem",
                              boxShadow: snapshot.isDragging ? "0 2px 8px #00C9A7" : "none",
                              ...provided.draggableProps.style
                            }}
                          >
                            {/* Drag handle icon */}
                            <span
                              {...provided.dragHandleProps}
                              style={{
                                cursor: "grab",
                                marginRight: "1rem",
                                fontSize: "1.5rem",
                                color: "#00C9A7",
                                display: "flex",
                                alignItems: "center"
                              }}
                              title="Drag to reorder"
                            >
                              <MdDragHandle />
                            </span>
                            {/* Task content */}
                            {task.desc} | Due: {task.due} | Priority: <span style={{ color: "#00C9A7" }}>{task.priority}</span>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      )}
    </div>
  );
}
