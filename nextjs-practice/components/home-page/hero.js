import Image from 'next/image';

import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/donghun.png'
          alt='DongHun'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Dong Hun</h1>
      <p>I am studying Next.js</p>
    </section>
  );
};

export default Hero;
