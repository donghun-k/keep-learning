import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
      <h4>{router.query.projectid}</h4>
    </div>
  );
};

export default PortfolioProjectPage;
