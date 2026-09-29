import { useTheme } from "../context/ThemeContext";
function Navbar() {

  const { theme, toggleTheme } = useTheme();

  return (
    <nav>

      <h2>Task Management</h2>

      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>

    </nav>
  );
}

export default Navbar;