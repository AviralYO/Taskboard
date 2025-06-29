export default function AnimatedBackground({ dark, bgColor }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        background: dark
          ? "linear-gradient(-45deg, #111 0%, #222 100%)"
          : bgColor || "linear-gradient(-45deg, #0f2027, #2c5364 80%)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite"
      }}
    />
  );
}
