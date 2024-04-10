'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

import { sendContactEmail } from '@/service/contact';

import Banner, { BannerData } from './Banner';

interface Form {
  from: string;
  subject: string;
  message: string;
}

const DEFAULT_FORM: Form = {
  from: '',
  subject: '',
  message: '',
};

const ContactForm = () => {
  const [form, setForm] = useState<Form>(DEFAULT_FORM);
  const [banner, setBanner] = useState<BannerData | null>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await sendContactEmail(form);
      console.log('data', data);
      setBanner({
        message: 'Your message has been sent!',
        state: 'success',
      });
      setForm(DEFAULT_FORM);
    } catch (err) {
      setBanner({
        message: 'Something went wrong. Please try again later.',
        state: 'error',
      });
    } finally {
      setTimeout(() => {
        setBanner(null);
      }, 3000);
    }
  };
  return (
    <section className="w-full max-w-md">
      {banner && <Banner banner={banner} />}
      <form
        onSubmit={onSubmit}
        className="my-4 flex flex-col gap-2 rounded-xl bg-slate-700 p-4 text-white"
      >
        <label className="font-semibold" htmlFor="from">
          Your Email
        </label>
        <input
          type="email"
          id="from"
          name="from"
          required
          autoFocus
          value={form.from}
          onChange={onChange}
          className="text-black"
        />
        <label className="font-semibold" htmlFor="subject">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={onChange}
          className="text-black"
        />
        <label className="font-semibold" htmlFor="message">
          Message
        </label>
        <textarea
          rows={10}
          id="message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
          className="text-black"
        />
        <button
          className="bg-yellow-300 font-bold text-black hover:bg-yellow-400"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
