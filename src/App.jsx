import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <AppRoutes
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </>
  );
}

export default App;