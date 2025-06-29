// import React, { useState } from "react";
// import "../styles/FloatingSearchBar.css";

// export default function FloatingSearchBar({ onSearch }) {
//   const [query, setQuery] = useState("");
//   return (
//     <form
//       className="floating-searchbar"
//       onSubmit={e => {
//         e.preventDefault();
//         onSearch(query);
//       }}
//     >
//       <input
//         type="text"
//         placeholder="Search tasks..."
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//       />
//     </form>
//   );
// }
