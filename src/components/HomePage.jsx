import React, { useEffect, useRef } from "react";

export default function HomePage() {
  const waveRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    let requestId;
    function animate() {
      const amplitude = 36;
      const frequency = 0.013;
      let path = "M0,100 ";
      for (let x = 0; x <= 1440; x += 24) {
        const y = 100 + Math.sin((frame + x) * frequency) * amplitude;
        path += `L${x},${y} `;
      }
      path += "L1440,400 L0,400 Z";
      if (waveRef.current) {
        waveRef.current.setAttribute("d", path);
      }
      frame += 2;
      requestId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(requestId);
  }, []);

  // Height variables for easy adjustment
  const whiteSectionHeight = "65vh"; // More space for heading
  const waveHeight = 120;            // Height of wave SVG
  const darkSectionHeight = `calc(100vh - ${whiteSectionHeight})`;

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      overflow: "hidden",
      position: "relative",
      background: "#fff"
    }}>
      {/* White section with centered heading */}
      <div style={{
        height: whiteSectionHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: "5rem", // Bigger heading
          fontWeight: "bold",
          color: "#181f2c",
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "2px",
          textAlign: "center",
          width: "100%",
          margin: 0
        }}>
          Taskboard
        </h1>
      </div>
      {/* Animated SVG wave */}
      <div style={{
        position: "absolute",
        left: 0,
        top: whiteSectionHeight,
        width: "100%",
        height: `${waveHeight}px`,
        zIndex: 2,
        pointerEvents: "none"
      }}>
        <svg
          width="100%"
          height={waveHeight}
          viewBox={`0 0 1440 400`}
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            ref={waveRef}
            fill="#181f2c"
            d="M0,100 L1440,100 L1440,400 L0,400 Z"
          />
        </svg>
      </div>
      {/* Black section with slogan */}
      <div style={{
        background: "#181f2c",
        color: "#fff",
        position: "absolute",
        left: 0,
        top: `calc(${whiteSectionHeight} + ${waveHeight}px)`,
        width: "100%",
        height: `calc(100vh - ${whiteSectionHeight} - ${waveHeight}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "2rem",
          letterSpacing: "1px",
          textAlign: "center"
        }}>
          Organize. Prioritize. Achieve.
        </div>
      </div>
    </div>
  );
}
