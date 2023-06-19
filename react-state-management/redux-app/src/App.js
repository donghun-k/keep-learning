import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import UserInfo from './pages/UserInfo';
import NotFound from './pages/NotFound';
import './styles.css';

function Main() {
  const userToken = useSelector((state) => state.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={userToken ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/logout"
          element={userToken ? <Logout /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/user"
          element={userToken ? <UserInfo /> : <Navigate to="/login" />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return <Main />;
}
