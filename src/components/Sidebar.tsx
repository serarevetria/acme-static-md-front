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
    return <aside className="w-64 bg-white h-screen border-r p-4">Loading...</aside>;
  }

  if (error) {
    return <aside className="w-64 bg-white h-screen border-r p-4">Error loading pages</aside>;
  }

  return (
    <aside className="w-64 bg-white h-screen border-r p-4 overflow-y-auto relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pages</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
        >
          + Add
        </button>
      </div>

      <ul className="space-y-2">
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => onSelectPage(page.replace(/^\//, ''))}
            className={`p-2 hover:bg-gray-100 cursor-pointer rounded ${
              selectedPage === page.replace(/^\//, '') ? 'bg-blue-100 text-blue-700' : ''
            }`}
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
