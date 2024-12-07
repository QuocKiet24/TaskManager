import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <header style={{ background: "#f0f0f0", padding: "1rem" }}>
        <h1>My Website</h1>
      </header>
      <main className="max-w-4xl w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <Outlet />
      </main>
      <footer
        style={{ background: "#f0f0f0", padding: "1rem", textAlign: "center" }}
      >
        <p>© 2024 My Website</p>
      </footer>
    </>
  );
};

export default MainLayout;
