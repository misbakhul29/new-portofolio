import React, { useEffect } from 'react';
import type { Project } from '../types';
import { IconArrowLeft, IconExternalLink, IconGitHub } from './icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBack }) => {
    useEffect(() => {
    const originalTitle = document.title;
    
    // Helper to update a meta tag's content and return its original value
    const updateMetaTag = (id: string, content: string): string => {
        const element = document.getElementById(id) as HTMLMetaElement | null;
        const originalContent = element ? element.content : '';
        if (element) {
            element.content = content;
        }
        return originalContent;
    };
    
    const newTitle = `${project.title} | Project Case Study | John Doe`;
    document.title = newTitle;

    // Update meta tags and store their original values
    const originalMetaDesc = updateMetaTag('meta-description', project.description);
    const originalOgTitle = updateMetaTag('og-title', newTitle);
    const originalOgDesc = updateMetaTag('og-description', project.description);
    const originalOgImage = updateMetaTag('og-image', project.imageUrl);
    const originalTwitterTitle = updateMetaTag('twitter-title', newTitle);
    const originalTwitterDesc = updateMetaTag('twitter-description', project.description);
    const originalTwitterImage = updateMetaTag('twitter-image', project.imageUrl);

    // Add canonical link for SEO
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = `${window.location.origin}/project/${project.slug}`;
    canonicalLink.id = 'project-canonical-link'; // Assign an ID for easy removal
    document.head.appendChild(canonicalLink);


    // Cleanup function to restore original values on component unmount
    return () => {
        document.title = originalTitle;
        updateMetaTag('meta-description', originalMetaDesc);
        updateMetaTag('og-title', originalOgTitle);
        updateMetaTag('og-description', originalOgDesc);
        updateMetaTag('og-image', originalOgImage);
        updateMetaTag('twitter-title', originalTwitterTitle);
        updateMetaTag('twitter-description', originalTwitterDesc);
        updateMetaTag('twitter-image', originalTwitterImage);
        
        // Remove the canonical link on cleanup
        const link = document.getElementById('project-canonical-link');
        if (link) {
            document.head.removeChild(link);
        }
    };
  }, [project]);

  return (
    <section className="py-20 sm:py-24 bg-transparent animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <IconArrowLeft size={20} />
              <span>Back to Portfolio</span>
            </button>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{project.title}</h1>
           <p className="text-lg text-slate-400 mb-8">{project.subtitle}</p>
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full rounded-lg mb-8 shadow-lg"
          />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
            <span className="font-semibold text-white text-lg">Project Description:</span>
            <p className="text-slate-400 text-lg text-justify">{project.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
            <span className="font-semibold text-white text-lg">Technologies Used:</span>
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                <span key={tag} className="bg-cyan-900/50 text-cyan-300 text-sm font-semibold px-3 py-1 rounded-full">
                    {tag}
                </span>
                ))}
            </div>
          </div>
          
          <div className="prose prose-slate prose-lg max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-ul:list-disc prose-ul:pl-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.content}
            </ReactMarkdown>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-700 flex flex-wrap items-center gap-6">
            <p className="text-white font-semibold text-lg">Project Links</p>
            <div className="flex items-center gap-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 font-semibold px-4 py-2 rounded-md bg-slate-500/10 backdrop-blur-sm border border-slate-500/30 hover:bg-slate-500/20 transition-colors duration-300"
                  >
                  <IconExternalLink size={20} />
                  <span>Live Site</span>
                </a>
              )}
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 font-semibold px-4 py-2 rounded-md bg-slate-500/10 backdrop-blur-sm border border-slate-500/30 hover:bg-slate-500/20 transition-colors duration-300"
                >
                  <IconGitHub size={20} />
                  <span>GitHub Repo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;
