
import React, { useState, useMemo } from 'react';
import type { Project } from '../types';
import Section from './Section';
import ProjectCard from './ProjectCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL;

const fetchProjects = async (): Promise<Project[]> => {
  const res = await axios.get(`${API_URL}/api/projects`);
  return res.data;
};

interface ProjectsProps {
  onProjectSelect: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  const filteredProjects = projects.filter(project => {
    if (selectedTag === 'All') {
      return true;
    }
    return project.tags.includes(selectedTag);
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects.</div>;

  return (
    <Section title="My Projects">
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
              selectedTag === tag
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
            }`}
            aria-pressed={selectedTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onProjectSelect={onProjectSelect} />
        ))}
        {filteredProjects.length === 0 && (
            <div className="md:col-span-2 text-center text-slate-500 py-10">
                <p className="text-lg">No projects found for this tag.</p>
            </div>
        )}
      </div>
    </Section>
  );
};

export default Projects;