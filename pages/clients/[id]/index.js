import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>The Projects of a {router.query.id}</h1>
    </div>
  );
};

export default ClientProjectsPage;
