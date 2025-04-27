const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchPages = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/pages`);
  if (!response.ok) {
    throw new Error('Failed to fetch pages');
  }
  const pages: string[] = await response.json();
  return pages;
};

export const fetchPageContent = async (path: string): Promise<string> => {
  const response = await fetch(`${BASE_URL}/pages/${path}`);
  if (!response.ok) {
    throw new Error('Failed to fetch page content');
  }
  const { content } = await response.json();
  return content;
};

export const createPage = async (path: string, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('path', path);
    formData.append('file', file);
  
    const response = await fetch(`${BASE_URL}/pages`, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to create page.');
    }
  };
  
