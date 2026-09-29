import { useTheme } from "./context/ThemeContext";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";

function AppContent() {

  const { theme } = useTheme();

  return (
    <div className={theme}>

      <Dashboard />

    </div>
  );
}
function App() {

  return (
    
<ThemeProvider>
<AppContent />
</ThemeProvider>
      

  );
}

export default App;