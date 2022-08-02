import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
  const router = useRouter();

  function loadProjectHandler() {
    router.push('/clients/donghun/projecta');
  }
  return (
    <div>
      <h1>The Projects of a {router.query.id}</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
