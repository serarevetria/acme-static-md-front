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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Add New Page</h2>
        
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Path (e.g., about/me)"
            className="border-2 border-gray-300 rounded-lg p-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          
          <input
            type="file"
            accept=".md"
            className="border-2 border-gray-300 rounded-lg p-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-1/2 px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors duration-300`}
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
