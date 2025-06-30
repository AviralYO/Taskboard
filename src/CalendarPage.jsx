import Calendar from "react-calendar";
import { useState } from "react";
import "./styles/CalendarPage.css";
import "react-calendar/dist/Calendar.css";


export default function CalendarPage({ tasks = [], bgColor = "#181f2c", dark = false }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const pad = n => n.toString().padStart(2, '0');
const localDateStr = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`;
const selectedTasks = tasks.filter(
  t => t.due === localDateStr
);


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
        fontFamily: "'IBM Plex Mono', 'Space Mono', monospace",
        background: dark ? "#111" : bgColor,
        transition: "background 0.3s"
      }}
    >
      {/* Calendar on the left */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 420
      }}>
        <h2 style={{
          color: "#00C9A7",
          fontWeight: "bold",
          fontSize: "2.5rem",
          marginBottom: "2rem",
          letterSpacing: "2px"
        }}>
          Calendar
        </h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date }) => {
  const pad = n => n.toString().padStart(2, '0');
  const localDateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const hasTasks = tasks.some(
    t => t.due === localDateStr
  );
  return hasTasks ? <span style={{ color: "#00C9A7", fontWeight: "bold" }}>•</span> : null;
}}

          
        />
      </div>
      {/* Tasks for selected date on the right */}
      <div style={{
        flex: 1,
        padding: "6rem 2rem 2rem 2rem",
        color: "#00C9A7",
        fontFamily: "inherit",
        display: "flex",
        flexDirection: "column"
      }}>
        <h3 style={{
          color: "#00C9A7",
          fontWeight: "bold",
          fontSize: "1.7rem",
          marginBottom: "1.2rem"
        }}>
          Tasks for {selectedDate.toDateString()}:
        </h3>
        {selectedTasks.length === 0 ? (
          <p style={{ color: "#fff", fontFamily: "inherit" }}>No tasks for this date.</p>
        ) : (
          <ul>
            {selectedTasks.map(task => (
              <li key={task.id} style={{
                color: "#fff",
                background: "rgba(0,0,0,0.13)",
                marginBottom: "0.5rem",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                fontFamily: "inherit"
              }}>
                {task.desc} | Priority: <span style={{ color: "#00C9A7" }}>{task.priority}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
