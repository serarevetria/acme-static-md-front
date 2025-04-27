import { useState, FormEvent } from 'react';
import { createPage } from '../services/api';

type AddPageModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const AddPageModal = ({ onClose, onSuccess }: AddPageModalProps) => {
  const [path, setPath] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!path || !file) {
      setError('Path and file are required.');
      return;
    }
  
    if (path.includes(' ')) {
      setError('Path cannot contain spaces.');
      return;
    }
  
    if (path.startsWith('/') || path.endsWith('/')) {
      setError('Path cannot start or end with a slash (/).');
      return;
    }
  
    try {
      setLoading(true);
      await createPage(path, file);
      onSuccess();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add New Page</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Path (e.g., about/me)"
            className="border rounded p-2"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          <input
            type="file"
            accept=".md"
            className="border rounded p-2"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPageModal;
