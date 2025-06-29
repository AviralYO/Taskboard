import { useState } from "react";

export default function FilterPage({ tasks = [], dark }) {
  const [priority, setPriority] = useState("");
  const [due, setDue] = useState("");

  const filtered = tasks.filter(
    t =>
      (!priority || t.priority === priority) &&
      (!due || t.due === due)
  );

  return (
    <div style={{
      minHeight: "100vh",
      padding: "2rem",
      background: dark ? "#111" : "linear-gradient(135deg, #232526, #414345 80%)"
    }}>
      <h2 style={{
        color: "#00C9A7",
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "1.5rem"
      }}>Filter Tasks</h2>
      <div>
        <label style={{ color: "#fff", marginRight: "0.5rem" }}>Priority: </label>
        <select value={priority} onChange={e => setPriority(e.target.value)}
          style={{
            padding: "0.4rem 1rem",
            borderRadius: "0.5rem",
            border: "none",
            fontSize: "1rem",
            marginRight: "1.5rem",
            marginBottom: "1rem",
            color: "#222"
          }}>
          <option value="">All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <label style={{ color: "#fff", marginRight: "0.5rem" }}>Due Date: </label>
        <input type="date" value={due} onChange={e => setDue(e.target.value)}
          style={{
            padding: "0.4rem 1rem",
            borderRadius: "0.5rem",
            border: "none",
            fontSize: "1rem",
            marginBottom: "1rem",
            color: "#222"
          }}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        {filtered.length === 0 && <p style={{ color: "#fff" }}>No tasks found.</p>}
        {filtered.map(task => (
          <div key={task.id} style={{
            color: "#fff",
            background: "rgba(0,0,0,0.13)",
            marginBottom: "0.5rem",
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem"
          }}>
            {task.desc} | Due: {task.due} | Priority: <span style={{ color: "#00C9A7" }}>{task.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
