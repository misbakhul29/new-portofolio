import React, { useState, useMemo } from 'react';
import Section from './Section';
import ArticleCard from './ArticleCard';
import type { Article } from '../types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const fetchArticles = async (): Promise<Article[]> => {
  const res = await axios.get(`${API_URL}/api/articles`);
  return res.data;
};

interface WritingsProps {
  onArticleSelect: (article: Article) => void;
}

const Writings: React.FC<WritingsProps> = ({ onArticleSelect }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach(article => {
      article.tags?.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  }, [articles]);

  const filteredArticles = articles.filter(article => {
    if (selectedTag === 'All') {
      return true;
    }
    return article.tags?.includes(selectedTag);
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles.</div>;

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