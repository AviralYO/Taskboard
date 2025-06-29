import React from "react";

import ReactDOM from "react-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import FloatingSearchBar from "./components/FloatingSearchBar";
import HomePage from "./components/HomePage";
import CalendarPage from "./CalendarPage";
import TasksPage from "./components/TasksPage";
import ProjectsPage from "./ProjectsPage";
import FilterPage from "./FilterPage";
import { useState } from 'react';
import AnimatedBackground from "./components/AnimatedBackground";


function App() {
  const [bgColor, setBgColor] = useState("#234");
  const [dark, setDark] = useState(false);
  const [projects, setProjects] = useState([
    { id: "1", name: "Personal", color: "#00C9A7" },
    { id: "2", name: "Work", color: "#2c5364" }
  ]);
  const [tasks, setTasks] = useState([]);

  return (
    <Router>
      {/* Sidebar: fixed on the left */}
      <Sidebar
        bgColor={bgColor}
        setBgColor={setBgColor}
        dark={dark}
        setDark={setDark}
      />
      {/* Main content area */}
      <div
        className="main-content"
        style={{
          marginLeft: "64px", // Sidebar width
          minHeight: "100vh",
          width: "calc(100vw - 64px)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Animated background fills the main content */}
        <AnimatedBackground dark={dark} bgColor={bgColor} />
        {/* Foreground content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* <FloatingSearchBar onSearch={q => alert(q)} />
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}> */}
            <Routes>
              <Route
                path="/"
                element={<HomePage dark={dark} bgColor={bgColor} />}
              />
              <Route
                path="/tasks"
                element={
                  <TasksPage
                    projects={projects}
                    tasks={tasks}
                    setTasks={setTasks}
                    dark={dark}
                    bgColor={bgColor}
                  />
                }
              />
              <Route
                path="/projects"
                element={
                  <ProjectsPage
                    projects={projects}
                    setProjects={setProjects}
                    tasks={tasks}
                    setTasks={setTasks}
                    dark={dark}
                  />
                }
              />
              <Route
                path="/calendar"
                element={
                  <CalendarPage
                    tasks={tasks}
                    dark={dark}
                  />
                }
              />
              <Route
                path="/filter"
                element={
                  <FilterPage
                    tasks={tasks}
                    dark={dark}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      
    </Router>
  );
}

export default App;
