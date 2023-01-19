import Head from 'next/head';
import GlobalNavBar from './global_nav_bar';

interface Props {
  title: string;
  children: React.ReactNode;
}
const ServiceLayout = function ({ title = 'blah x2', children }: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <GlobalNavBar />
      {children}
    </div>
  );
};

export default ServiceLayout;
