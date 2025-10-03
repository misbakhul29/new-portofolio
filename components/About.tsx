import React from 'react';
import Section from './Section';
import { IconDownload } from './icons';

const About: React.FC = () => {
  return (
    <Section title="About Misbakhul Munir - Web Developer">
      <div className="grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3">
          <div className="text-slate-400 text-lg space-y-4">
            <p className="text-left">
              Hello! I'm <strong>Misbakhul Munir</strong>, a{" "}
              <strong>web developer from Indonesia</strong> specializing in{" "}
              <strong>React, Next.js, TypeScript, and modern web technologies</strong>. 
              I build fast, accessible, and visually stunning websites and applications.
            </p>
            <p className="text-left">
              Since 2020, I've worked on a variety of{" "}
              <strong>front-end and full-stack projects</strong>, helping clients
              bring their ideas to life through{" "}
              <strong>responsive and SEO-friendly web development</strong>.
              My main focus is delivering inclusive, user-centered digital experiences.
            </p>
            <p className="text-left">
              I'm a lifelong learner and love exploring new challenges in{" "}
              <strong>JavaScript, Node.js, and UI/UX design</strong>. 
              Outside of coding, I enjoy badminton, gaming, and cooking.
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
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 group">
            <div className="absolute inset-0 p-1 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-400 group-hover:scale-105 transition-transform duration-300">
              <div className="bg-slate-900 rounded-full w-full h-full p-2">
                <img
                  src="/me.webp"
                  alt="Misbakhul Munir - Web Developer Portfolio Photo"
                  className="relative w-full h-full object-cover rounded-full shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema for Person (SEO Boost) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Misbakhul Munir",
          jobTitle: "Web Developer",
          url: "https://misbakhul.my.id",
          sameAs: [
            "https://github.com/misbakhul",
            "https://linkedin.com/in/misbakhul",
            "https://twitter.com/misbakhul"
          ],
          image: "https://misbakhul.my.id/me.webp",
          worksFor: {
            "@type": "Organization",
            name: "Freelance"
          },
          knowsAbout: [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Frontend Development",
            "Fullstack Development"
          ]
        })
      }} />
    </Section>
  );
};

export default About;
