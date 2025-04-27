import { useEffect, useState } from 'react';
import { fetchPageContent } from '../services/api';

export const usePageContent = (path: string | null) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      setContent('');
      return;
    }

    const loadContent = async () => {
      setLoading(true);
      try {
        const data = await fetchPageContent(path);
        setContent(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setContent('');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [path]);

  return { content, loading, error };
};
