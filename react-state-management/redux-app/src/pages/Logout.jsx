import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/userActions';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logOut() {
    dispatch(logoutAction());
    navigate('/');
    // console.log('로그아웃 되었습니다');
  }

  return (
    <main className="wrapper">
      <div className="container">
        <h1 className="title login">로그아웃 하실래요?</h1>
        <button className="btn logout" onClick={logOut}>
          로그아웃
        </button>
      </div>
    </main>
  );
}

export default Logout;
