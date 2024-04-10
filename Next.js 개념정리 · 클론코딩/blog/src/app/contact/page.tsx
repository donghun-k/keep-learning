import { AiFillGithub } from 'react-icons/ai';
import { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Contact DongHun, Kim',
};

const ContactPage = () => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="my-2 text-3xl font-bold">Contact Me</h2>
      <p>donghun.kdh@gmail.com</p>
      <div className="my-2 flex">
        <a
          href="https://github.com/donghun-k"
          className="text-5xl hover:text-yellow-500"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub />
        </a>
      </div>
      <h2 className="my-8 text-3xl font-bold">Or Send me an email</h2>
      <ContactForm />
    </section>
  );
};

export default ContactPage;
