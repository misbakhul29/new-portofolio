import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-cyan-400 font-medium mb-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Hi, my name is
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Misbakhul Munir.
          </h1>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-400 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            I build things for the web.
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            I'm a passionate web developer specializing in creating modern, responsive, and user-friendly web applications. I turn ideas into digital experiences.
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <a
              href="#projects"
              className="inline-block bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30 text-cyan-300 font-semibold px-8 py-3 rounded-md hover:bg-cyan-500/20 transition-colors duration-300 mr-4"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-block bg-slate-500/10 backdrop-blur-sm border border-slate-500/30 text-slate-300 font-semibold px-8 py-3 rounded-md hover:bg-slate-500/20 transition-colors duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;