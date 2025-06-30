import { useState } from "react";
import TaskModal from "./TaskModal";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";

export default function TasksPage({ selectedProjectId, projects, setProjects, tasks, setTasks, dark }) {
  const [showTaskModal, setShowTaskModal] = useState(false);

  function handleAddTask(task) {
    setTasks([...tasks, { ...task, id: uuidv4() }]);
  }

  function handleAddProject(name, color) {
    const id = uuidv4();
    setProjects([...projects, { id, name, color }]);
    return id;
  }

  // Drag and Drop handler
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  }

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
        {/* Render tasks here with drag-and-drop */}
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ padding: 0, listStyle: "none" }}
                >
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            margin: "0 0 8px 0",
                            padding: "12px",
                            borderRadius: "8px",
                            background: snapshot.isDragging ? "#00C9A7" : "rgba(0,0,0,0.13)",
                            color: snapshot.isDragging ? "#fff" : "#fff",
                            boxShadow: snapshot.isDragging ? "0 2px 8px #00C9A7" : "none",
                            ...provided.draggableProps.style
                          }}
                        >
                          {task.desc} | {task.due} | {task.priority} | Project: {projects.find(p => p.id === task.projectId)?.name}
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
    </div>
  );
}
