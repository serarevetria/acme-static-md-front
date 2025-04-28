import { usePages } from '../hooks/usePages';
import { useState } from 'react';
import AddPageModal from './AddPageModal';

type SidebarProps = {
  onSelectPage: (path: string) => void;
  selectedPage: string | null;
};

const Sidebar = ({ onSelectPage, selectedPage }: SidebarProps) => {
  const { pages, loading, error, fetchAllPages } = usePages();
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = async () => {
    setShowModal(false);
    await fetchAllPages();
  };

  if (loading) {
    return <aside className="w-64 bg-gray-800 h-screen border-r p-4 text-white">Loading...</aside>;
  }

  if (error) {
    return <aside className="w-64 bg-gray-800 h-screen border-r p-4 text-white">Error loading pages</aside>;
  }

  return (
    <aside className="w-64 bg-gray-800 h-auto border-r p-4 overflow-y-auto relative text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pages</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-300"
        >
          + Add Page
        </button>
      </div>

      <ul className="space-y-2">
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => onSelectPage(page.replace(/^\//, ''))}
            className={`p-3 cursor-pointer rounded-md transition-colors duration-300
              ${selectedPage === page.replace(/^\//, '') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-blue-500 hover:text-white'}
            `}
          >
            {page}
          </li>
        ))}
      </ul>

      {showModal && (
        <AddPageModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </aside>
  );
};

export default Sidebar;
