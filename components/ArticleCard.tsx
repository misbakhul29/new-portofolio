import React from 'react';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onArticleSelect: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onArticleSelect }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/600x400/1e293b/94a3b8?text=Image+Unavailable';
    e.currentTarget.onerror = null; // Prevent infinite loops
  };

  return (
    <button
      onClick={() => onArticleSelect(article)}
      className="text-left bg-slate-900/40 backdrop-blur-md border border-slate-700/80 rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-500"
    >
      <div className="relative overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-500 mb-2">{new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {article.readingTime} min read</p>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{article.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{article.description}</p>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

export default ArticleCard;