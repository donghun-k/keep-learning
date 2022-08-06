const UserProfilePage = (props) => {
  return (
    <div>
      <h1>{props.username}</h1>
    </div>
  );
};

export default UserProfilePage;

export async function getServerSideProps(contenxt) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'DongHun',
    },
  };
}
