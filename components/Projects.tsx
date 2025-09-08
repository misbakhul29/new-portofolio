
import React, { useState, useMemo } from 'react';
import type { Project } from '../types';
import Section from './Section';
import ProjectCard from './ProjectCard';

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce website with product listings, a shopping cart, and a secure checkout process.',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    tags: ['Next.js', 'React', 'TypeScript', 'Stripe', 'PostgreSQL'],
    liveUrl: '#',
    repoUrl: '#',
    slug: 'ecommerce-platform',
    content: `
      <p class="lead">This project is a comprehensive e-commerce solution built from the ground up, designed to provide a seamless shopping experience for users and an easy-to-manage platform for administrators.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Key Features</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Secure user authentication and profile management.</li>
        <li>Dynamic product catalog with search and filtering capabilities.</li>
        <li>A fully functional shopping cart with persistent state.</li>
        <li>Integration with Stripe for secure payment processing.</li>
        <li>An admin dashboard for managing products, orders, and users.</li>
      </ul>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Tech Stack</h3>
      <p>The frontend was built using <strong>Next.js</strong> for server-side rendering and static site generation, ensuring optimal performance and SEO. <strong>TypeScript</strong> was used throughout the project for type safety. State management was handled with React's Context API. For the backend, a <strong>PostgreSQL</strong> database was used to store product and user data. Payments were handled securely via the <strong>Stripe API</strong>.</p>
    `
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management tool with drag-and-drop functionality, real-time updates, and user authentication.',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'React-DnD'],
    liveUrl: '#',
    repoUrl: '#',
    slug: 'task-management-app',
    content: `
      <p class="lead">A Trello-like task management application designed for team collaboration. It features an intuitive drag-and-drop interface and real-time database synchronization to keep all users on the same page.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Core Functionality</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>User authentication using Firebase Auth.</li>
        <li>Create, update, and delete boards, lists, and tasks.</li>
        <li>Drag-and-drop tasks between lists and reorder them.</li>
        <li>Real-time updates across all clients using Firestore.</li>
        <li>A clean, responsive UI built with Tailwind CSS.</li>
      </ul>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Technical Details</h3>
      <p>The application is built as a single-page application using <strong>React</strong>. <strong>Firebase</strong> serves as the backend, providing authentication, a real-time NoSQL database (Firestore), and hosting. The drag-and-drop feature was implemented using the powerful <strong>React-DnD</strong> library. The UI is fully responsive, crafted with <strong>Tailwind CSS</strong> for a utility-first workflow.</p>
    `
  },
  {
    id: 3,
    title: 'Personal Portfolio',
    description: 'A developer portfolio website to showcase my skills and projects. This very site you are looking at!',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    liveUrl: '#',
    repoUrl: '#',
    slug: 'personal-portfolio-v2',
    content: `
      <p class="lead">This portfolio is a testament to my skills in modern frontend development. It's designed to be fast, responsive, and visually appealing, providing a comprehensive overview of my work and capabilities.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Design & Development</h3>
      <p>The entire site was designed in Figma and then built from scratch. It is a single-page application built with <strong>React</strong> and <strong>TypeScript</strong>, bundled with <strong>Vite</strong> for a lightning-fast development experience. The styling is done with <strong>Tailwind CSS</strong>, allowing for rapid and consistent UI development. The background animations are created with CSS to be lightweight and performant.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Features</h3>
       <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Fully responsive design for all devices.</li>
        <li>Dynamic project and article filtering.</li>
        <li>Smooth scrolling and subtle animations for a great user experience.</li>
        <li>Dynamically updated SEO tags for individual article and project pages.</li>
      </ul>
    `
  },
    {
    id: 4,
    title: 'Data Visualization Dashboard',
    description: 'An analytics dashboard that visualizes complex data sets using interactive charts and graphs, helping businesses make informed decisions.',
    imageUrl: 'https://picsum.photos/seed/project4/600/400',
    tags: ['React', 'D3.js', 'Node.js', 'Express'],
    liveUrl: '#',
    repoUrl: '#',
    slug: 'data-visualization-dashboard',
    content: `
      <p class="lead">This project is a powerful analytics dashboard that helps businesses make informed decisions by visualizing complex data sets through interactive charts and graphs.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Features</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>A variety of chart types including bar, line, and pie charts.</li>
        <li>Interactive elements like tooltips and zooming.</li>
        <li>Data filtering by date ranges and other parameters.</li>
        <li>A RESTful API backend to serve the data.</li>
      </ul>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Technical Implementation</h3>
      <p>The frontend is a <strong>React</strong> application. The data visualizations are built using the flexible and powerful <strong>D3.js</strong> library, which allows for complete control over the graphical elements. The backend is a lightweight <strong>Node.js</strong> server using the <strong>Express</strong> framework to create a REST API that serves data to the frontend from a database.</p>
    `
  },
];

interface ProjectsProps {
  onProjectSelect: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  }, []);

  const filteredProjects = projects.filter(project => {
    if (selectedTag === 'All') {
      return true;
    }
    return project.tags.includes(selectedTag);
  });

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