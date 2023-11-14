import Hero from '@/components/Hero';

const TITLE_CLASS = 'text-2xl font-bold text-gray-800 my-2';

const AboutPage = () => {
  return (
    <>
      <Hero />
      <section className="m-8 bg-gray-100 p-8 text-center shadow-lg">
        <h2 className={TITLE_CLASS}>Who Am I?</h2>
        <p>코딩이 너무 재밌는 내츄럴 본 개발자</p>
        <h2 className={TITLE_CLASS}>Skills</h2>
        <p>React, Next.js, TypeScript</p>
      </section>
    </>
  );
};

export default AboutPage;
