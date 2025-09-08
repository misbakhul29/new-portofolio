import React from 'react';
import Section from './Section';
import { IconGitHub, IconLinkedIn, IconTwitter } from './icons';

const Contact: React.FC = () => {
  return (
    <Section title="Get In Touch">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-slate-400 text-lg mb-8">
          I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open. I'll get back to you as soon as possible!
        </p>
        <a
          href="mailto:johndoe.dev@email.com"
          className="inline-block bg-cyan-500 text-black font-semibold px-8 py-4 rounded-md hover:bg-cyan-600 transition-colors duration-300 text-lg"
        >
          Say Hello
        </a>
        <div className="mt-12 flex justify-center space-x-6">
          <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
            <IconGitHub size={32}/>
          </a>
          <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
            <IconLinkedIn size={32}/>
          </a>
          <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
            <IconTwitter size={32}/>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Contact;