import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContextProvieder } from './components/context/AuthContext';

function App() {
  return (
    <AuthContextProvieder>
      <Navbar />
      <Outlet />
    </AuthContextProvieder>
  );
}

export default App;
