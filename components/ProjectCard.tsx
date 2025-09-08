import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onProjectSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onProjectSelect }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/600x400/1e293b/94a3b8?text=Image+Unavailable';
    e.currentTarget.onerror = null; // Prevent infinite loops
  };

  return (
    <button
      onClick={() => onProjectSelect(project)}
      className="text-left bg-slate-900/40 backdrop-blur-md border border-slate-700/80 rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:border-cyan-400/60 animate-fade-in focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-500 flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
        <p className="text-slate-400 mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-slate-800">
           <span className="text-cyan-400 text-sm font-semibold group-hover:underline">View Case Study →</span>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;