import type { ReactNode } from 'react';

export interface Skill {
  name: string;
  icon: ReactNode;
  mastery: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  slug: string;
  content: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publishedDate: string;
  readingTime: number;
  slug: string;
  content: string;
  tags?: string[];
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}