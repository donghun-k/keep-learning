import Head from 'next/head';

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
      {children}
    </div>
  );
};

export default ServiceLayout;
