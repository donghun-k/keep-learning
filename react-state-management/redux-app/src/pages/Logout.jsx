import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/userSlice';

function Logout() {
  const dispatch = useDispatch();
  function logoutHandler() {
    localStorage.removeItem('testToken');
    dispatch(logoutAction());
  }

  return (
    <main className="wrapper">
      <div className="container">
        <h1 className="title login">로그아웃 하실래요?</h1>
        <button className="btn logout" onClick={logoutHandler}>
          로그아웃
        </button>
      </div>
    </main>
  );
}

export default Logout;
