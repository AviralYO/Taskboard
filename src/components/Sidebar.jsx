import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import {
  FaSearch,
  FaCalendarAlt,
  FaTasks,
  FaProjectDiagram,
  FaFilter,
  FaPalette,
  FaMoon,
  FaSun
} from "react-icons/fa";

const sidebarItems = [
  { icon: <FaSearch />, label: "Search", type: "search" }, // Search is now a sidebar item!
  { icon: <FaCalendarAlt />, label: "Calendar", path: "/calendar" },
  { icon: <FaTasks />, label: "Tasks", path: "/tasks" },
  { icon: <FaProjectDiagram />, label: "Projects", path: "/projects" },
  { icon: <FaFilter />, label: "Filter", path: "/filter" },
];


export default function Sidebar({ bgColor, setBgColor, dark, setDark }) {
  const [expanded, setExpanded] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const filteredItems = sidebarItems
    .filter(item => item.type !== "search")
    .filter(item =>
      item.label.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); setShowSearch(false); }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: expanded ? 220 : 64,
        height: "100vh",
        background: "rgba(40, 40, 80, 0.72)",
        backdropFilter: "blur(10px)",
        boxShadow: "2px 0 16px rgba(0,0,0,0.13)",
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        display: "flex",
        flexDirection: "column",
        alignItems: expanded ? "flex-start" : "center",
        padding: expanded ? "1.5rem 0.5rem" : "1.5rem 0",
        transition: "width 0.3s cubic-bezier(.4,0,.2,1), padding 0.3s cubic-bezier(.4,0,.2,1)",
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#00C9A7",
        width: "100%",
        textAlign: expanded ? "left" : "center",
        paddingLeft: expanded ? 24 : 0,
        marginBottom: "2.5rem",
        letterSpacing: 2,
        transition: "padding 0.3s",
      }}>
        <Link to="/" style={{ color: "#00C9A7", textDecoration: "none" }}> TB </Link>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, width: "100%" }}/>
        {sidebarItems.map((item, idx) => {
          // Special handling for Search
          if (item.type === "search") {
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.1rem",
                  color: showSearch ? "#00C9A7" : "#fff",
                  padding: expanded ? "0.85rem 1.1rem" : "0.85rem 0",
                  borderRadius: 12,
                  margin: "0.2rem 0",
                  width: "100%",
                  background: showSearch ? "rgba(0,201,167,0.16)" : "none",
                  boxShadow: showSearch ? "0 2px 8px rgba(0,201,167,0.08)" : "none",
                  fontWeight: showSearch ? 600 : 400,
                  fontSize: 18,
                  position: "relative",
                  borderLeft: showSearch ? "4px solid #00C9A7" : "4px solid transparent",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s, box-shadow 0.2s, border-left 0.2s"
                }}
                tabIndex={0}
                aria-current={showSearch ? "page" : undefined}
                title={!expanded ? item.label : undefined}
                onClick={() => setShowSearch(v => !v)}
              >
                {item.icon}
                {expanded && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
              </div>
            );
          }
        

          // Normal navigation items
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.1rem",
                color: isActive ? "#00C9A7" : "#fff",
                padding: expanded ? "0.85rem 1.1rem" : "0.85rem 0",
                borderRadius: 12,
                margin: "0.2rem 0",
                width: "100%",
                background: isActive ? "rgba(0,201,167,0.16)" : "none",
                boxShadow: isActive ? "0 2px 8px rgba(0,201,167,0.08)" : "none",
                fontWeight: isActive ? 600 : 400,
                fontSize: 18,
                position: "relative",
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                outline: "none",
                borderLeft: isActive ? "4px solid #00C9A7" : "4px solid transparent",
                borderRight: "none",
                cursor: "pointer"
              }}
              tabIndex={0}
              aria-current={isActive ? "page" : undefined}
              title={!expanded ? item.label : undefined}
            >
              {item.icon}
              {expanded && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
            </Link>
          );
        })}

        {/* Search Input (shows below search icon when toggled) */}
       
      {showSearch && (
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          style={{ width: expanded ? "85%" : "90%" }}
        />
      )}
    

      {/* Bottom Controls */}
      <div style={{
        width: "100%",
        display: "flex",
        flexDirection: expanded ? "row" : "column",
        alignItems: "center",
        justifyContent: expanded ? "flex-start" : "center",
        gap: expanded ? "1.1rem" : "1.7rem",
        padding: expanded ? "0.8rem 1.1rem" : "0.8rem 0",
        marginBottom: "0.6rem"
      }}>
        {/* Palette */}
        <button
          onClick={() => setShowPalette(v => !v)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 22,
            cursor: "pointer",
            borderRadius: "50%",
            padding: 8,
            transition: "background 0.2s",
          }}
          aria-label="Choose background color"
          tabIndex={0}
        >
          <FaPalette />
        </button>
        {/* Dark Mode */}
        <button
          onClick={() => setDark(!dark)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 22,
            cursor: "pointer",
            borderRadius: "50%",
            padding: 8,
            transition: "background 0.2s",
          }}
          aria-label="Toggle dark mode"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      
    </aside>
  );
}
