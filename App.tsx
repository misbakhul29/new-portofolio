import React, { useEffect, useState } from 'react';
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
import CookieConsent from './components/CookieConsent';

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

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const cookieString = document.cookie;
      if (cookieString === "") {
        return null;
      }

      const cookies = cookieString.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }

      return null;
    };

    const gdprConsent = getCookie('gdprConsent');
    if (gdprConsent === 'true') {
      // External GA script
      const script1 = document.createElement('script');
      script1.src = "https://www.googletagmanager.com/gtag/js?id=G-SC2TQSBDC5";
      script1.async = true;
      document.head.appendChild(script1);

      // Inline GA script
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('consent', 'default', {
          'analytics_storage': 'denied'
        });
        gtag('config', 'G-SC2TQSBDC5');
      `;
      document.head.appendChild(script2);
    }
  }, []);

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
        <CookieConsent />
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