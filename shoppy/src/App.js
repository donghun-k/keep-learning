import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContextProvieder } from './context/AuthContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvieder>
        <Navbar />
        <Outlet />
      </AuthContextProvieder>
    </QueryClientProvider>
  );
}

export default App;
