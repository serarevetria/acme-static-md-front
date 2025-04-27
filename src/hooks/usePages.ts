import { useEffect, useState, useCallback } from 'react';
import { fetchPages } from '../services/api';

export const usePages = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllPages = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPages();
      setPages(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPages();
  }, [fetchAllPages]);

  return { pages, loading, error, fetchAllPages };
};
