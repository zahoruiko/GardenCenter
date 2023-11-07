import './App.css';

import {
  Route,
  Routes,
} from 'react-router-dom';

import { routesConfig } from 'config/routesConfig';
import { useTheme } from 'hooks/useTheme';

function App() {
  const [theme] = useTheme();
  document.documentElement.dataset.theme = theme;

  return (
    <Routes>
      {Object.values(routesConfig).map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;
