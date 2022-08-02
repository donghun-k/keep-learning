import { useRouter } from 'next/router';

const SelectedClientProjectPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>
        The Project Page of {router.query.clientprojectid} for {router.query.id}
      </h1>
    </div>
  );
};

export default SelectedClientProjectPage;
