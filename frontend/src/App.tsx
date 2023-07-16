import { Route, Routes } from "react-router-dom";

import { routeConfig } from "./config/routesConfig";
import { useTheme } from "./hooks/useTheme";

import "./App.css";

function App() {
  const [theme] = useTheme();
  document.documentElement.dataset.theme = theme;

  return (
    <Routes>
      {Object.values(routeConfig).map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;
