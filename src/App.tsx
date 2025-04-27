import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PageViewer from './components/PageViewer';
import { usePageContent } from './hooks/usePageContent';

function App() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const { content, loading, error } = usePageContent(selectedPath);

  return (
    <div className="flex min-h-screen">
      <Sidebar onSelectPage={setSelectedPath} selectedPage={selectedPath} />
      <PageViewer content={content} loading={loading} error={error} selectedPage={selectedPath} />
    </div>
  );
}

export default App;
