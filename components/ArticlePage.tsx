import React, { useEffect } from 'react';
import type { Article } from '../types';
import { IconArrowLeft, IconTwitter, IconLinkedIn, IconFacebook } from './icons';

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack }) => {
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
    
    const newTitle = `${article.title} | John Doe`;
    document.title = newTitle;

    // Update meta tags and store their original values
    const originalMetaDesc = updateMetaTag('meta-description', article.description);
    const originalOgTitle = updateMetaTag('og-title', newTitle);
    const originalOgDesc = updateMetaTag('og-description', article.description);
    const originalOgImage = updateMetaTag('og-image', article.imageUrl);
    const originalTwitterTitle = updateMetaTag('twitter-title', newTitle);
    const originalTwitterDesc = updateMetaTag('twitter-description', article.description);
    const originalTwitterImage = updateMetaTag('twitter-image', article.imageUrl);

    // Add canonical link for SEO
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = `${window.location.origin}/${article.slug}`;
    canonicalLink.id = 'article-canonical-link'; // Assign an ID for easy removal
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
        const link = document.getElementById('article-canonical-link');
        if (link) {
            document.head.removeChild(link);
        }
    };
  }, [article]);
  
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(article.title);
  const encodedDescription = encodeURIComponent(article.description);

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

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
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{article.title}</h1>
          <div className="flex items-center text-slate-400 mb-8">
            <span>{new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="mx-2">·</span>
            <span>{article.readingTime} min read</span>
          </div>
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full rounded-lg mb-8 shadow-lg"
          />
          <div 
            className="prose prose-slate prose-lg max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-code:text-cyan-300 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-lg"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
          <div className="mt-12 pt-8 border-t border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <p className="text-slate-400 font-semibold text-lg">Share this article</p>
              <div className="flex items-center gap-4">
                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  <IconTwitter size={28} />
                </a>
                <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  <IconLinkedIn size={28} />
                </a>
                <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  <IconFacebook size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlePage;