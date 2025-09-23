import React from 'react';
import Section from './Section';
import { IconDownload } from './icons';

const About: React.FC = () => {
  return (
    <Section title="About Me">
      <div className="grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3">
          <div className="text-slate-400 text-lg space-y-4">
            <p className='text-left'>
              Hello! I'm Misbakhul Munir, a web developer based in Indonesia. I have a passion for creating beautiful and functional websites and applications. My journey into web development started back in 2020 when I decided to try editing a simple HTML template — turns out hacking together a custom webpage was a lot of fun!
            </p>
            <p className='text-left'>
              Fast-forward to today, and I've had the privilege of working on a diverse range of projects. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
            </p>
            <p className='text-left'>
              I'm a firm believer in continuous learning and am always looking for new challenges to tackle. When I'm not at the computer, I enjoy badminton, gaming, and cooking.
            </p>
          </div>
          <div className="mt-8">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-cyan-500 text-cyan-500 font-semibold px-6 py-3 rounded-md hover:bg-cyan-500 hover:text-black transition-colors duration-300"
            >
              <IconDownload size={20} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 group">
             <div className="absolute inset-0 p-1 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-400 group-hover:scale-105 transition-transform duration-300">
                <div className="bg-slate-900 rounded-full w-full h-full p-2">
                    <img 
                      src="/me.webp" 
                      alt="Misbakhul Munir" 
                      className="relative w-full h-full object-cover rounded-full shadow-xl"
                    />
                </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;