import Image from 'next/image';
import Link from 'next/link';

import profileImage from '../../public/images/profile.png';
const Hero = () => {
  return (
    <section className="text-center">
      <Image
        src={profileImage}
        className="mx-auto rounded-full"
        width={250}
        height={250}
        alt="Profile image"
        priority
      ></Image>
      <h2 className="mt-2 text-3xl font-bold">DongHun, Kim</h2>
      <h3 className="text-2xl font-semibold">Front-End Engineer</h3>
      <p>Love & Money</p>
      <Link href="/contact">
        <button className="mt-2 rounded-xl bg-yellow-500 px-4 py-1 font-bold">
          Contact Me
        </button>
      </Link>
    </section>
  );
};

export default Hero;
