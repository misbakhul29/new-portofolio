import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Writings from './components/Writings';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';
import ProjectPage from './components/ProjectPage';
import type { Article, Project } from './types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const BackgroundAnimation = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 -z-10 overflow-hidden"
  >
    <div className="absolute inset-0 bg-black" />
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
    <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
  </div>
);

const queryClient = new QueryClient()

const App: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedArticle(null);
    setSelectedProject(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
    <div className="bg-transparent relative z-10">
      <BackgroundAnimation />
      <Header />
      <main>
        {selectedProject ? (
          <ProjectPage project={selectedProject} onBack={handleBack} />
        ) : selectedArticle ? (
          <ArticlePage article={selectedArticle} onBack={handleBack} />
        ) : (
          <>
            <Hero />
            <div id="about">
              <About />
            </div>
            <div id="skills">
              <Skills />
            </div>
            <div id="projects">
              <Projects onProjectSelect={handleProjectSelect} />
            </div>
            <div id="writings">
              <Writings onArticleSelect={handleArticleSelect} />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
    </QueryClientProvider>
  );
};

export default App;