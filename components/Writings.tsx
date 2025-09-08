import React, { useState, useMemo } from 'react';
import Section from './Section';
import ArticleCard from './ArticleCard';
import type { Article } from '../types';

const articles: Article[] = [
  {
    id: 1,
    title: 'Mastering React Hooks in 10 Minutes',
    description: 'A quick and practical guide to understanding and using the most common React Hooks for state and side effects.',
    imageUrl: 'https://picsum.photos/seed/article1/600/400',
    publishedDate: '2023-10-26',
    readingTime: 10,
    slug: 'mastering-react-hooks',
    tags: ['React', 'JavaScript', 'Web Development'],
    content: `
      <p class="lead">React Hooks revolutionized how we write components. Let's dive into the most essential ones: <code>useState</code> and <code>useEffect</code>.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">The State Hook: <code>useState</code></h3>
      <p>Before Hooks, you needed a class component to manage state. Now, <code>useState</code> lets you add state to functional components. It's simple: you call it with an initial value, and it returns the current state and a function to update it.</p>
      <pre><code class="language-jsx">const [count, setCount] = useState(0);</code></pre>
      <p>Here, <code>count</code> is our state variable, initialized to 0. To change it, we call <code>setCount(newCount)</code>. React will then re-render the component with the new value.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">The Effect Hook: <code>useEffect</code></h3>
      <p>The <code>useEffect</code> Hook lets you perform side effects in function components. This includes data fetching, subscriptions, or manually changing the DOM. It runs after every render by default.</p>
      <pre><code class="language-jsx">useEffect(() => {\n  document.title = \`You clicked \${count} times\`;\n}, [count]); // Only re-run the effect if count changes</code></pre>
      <p>By providing a dependency array (<code>[count]</code>), we tell React to only re-run the effect if the <code>count</code> variable changes. This is a crucial optimization to prevent unnecessary operations.</p>
    `,
  },
  {
    id: 2,
    title: 'The Art of Responsive Design with Tailwind CSS',
    description: 'Learn how to build beautiful, responsive layouts that work on any screen size using the power of utility-first CSS.',
    imageUrl: 'https://picsum.photos/seed/article2/600/400',
    publishedDate: '2023-09-15',
    readingTime: 15,
    slug: 'responsive-design-tailwind-css',
    tags: ['CSS', 'Tailwind CSS', 'Responsive Design'],
    content: `
      <p class="lead">Tailwind CSS makes responsive design intuitive and fast. Instead of writing custom media queries, you use responsive prefixes like <code>md:</code> and <code>lg:</code> directly in your HTML.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Mobile-First Approach</h3>
      <p>Tailwind is mobile-first. This means unprefixed utilities (like <code>w-full</code>) apply to all screen sizes, while prefixed utilities (like <code>lg:w-1/2</code>) only apply at a specific breakpoint and above.</p>
      <pre><code class="language-html">&lt;div class="w-full lg:w-1/2"&gt;...&lt;/div&gt;</code></pre>
      <p>This <code>div</code> will be full-width on small screens and half-width on large screens (desktops). It's a powerful way to build complex layouts with minimal code.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Customizing Breakpoints</h3>
      <p>You can easily customize Tailwind's default breakpoints in your <code>tailwind.config.js</code> file to match your project's specific design requirements.</p>
    `,
  },
  {
    id: 3,
    title: 'Getting Started with TypeScript and Next.js',
    description: 'A beginner-friendly tutorial on setting up a new Next.js project with TypeScript for a more robust and scalable codebase.',
    imageUrl: 'https://picsum.photos/seed/article3/600/400',
    publishedDate: '2023-08-01',
    readingTime: 12,
    slug: 'typescript-nextjs-setup',
    tags: ['TypeScript', 'Next.js', 'React'],
    content: `
      <p class="lead">Combining TypeScript with Next.js gives you static typing, which helps catch errors early and improves developer experience with features like autocompletion.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Setup</h3>
      <p>Starting a new Next.js project with TypeScript is incredibly simple. Just use the <code>--ts</code> flag:</p>
      <pre><code class="language-bash">npx create-next-app@latest my-app --ts</code></pre>
      <p>Next.js automatically configures everything you need, including a <code>tsconfig.json</code> file.</p>
      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Typing Pages and Components</h3>
      <p>You can type your components using <code>React.FC</code> (Function Component) and define types for your props. For pages, Next.js provides special types like <code>NextPage</code> to type props like <code>getStaticProps</code> or <code>getServerSideProps</code>.</p>
    `,
  },
];

interface WritingsProps {
  onArticleSelect: (article: Article) => void;
}

const Writings: React.FC<WritingsProps> = ({ onArticleSelect }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach(article => {
      article.tags?.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  }, []);

  const filteredArticles = articles.filter(article => {
    if (selectedTag === 'All') {
      return true;
    }
    return article.tags?.includes(selectedTag);
  });

  return (
    <Section title="My Writings">
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} onArticleSelect={onArticleSelect} />
        ))}
        {filteredArticles.length === 0 && (
            <div className="md:col-span-2 lg:col-span-3 text-center text-slate-500 py-10">
                <p className="text-lg">No articles found for this tag.</p>
            </div>
        )}
      </div>
    </Section>
  );
};

export default Writings;