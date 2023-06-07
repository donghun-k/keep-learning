function Logout() {
  function logOut() {
    console.log("로그아웃 되었습니다");
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
