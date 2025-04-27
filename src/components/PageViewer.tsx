import parse from 'html-react-parser';

type PageViewerProps = {
  content: string;
  loading: boolean;
  error: string | null;
  selectedPage: string | null;
};

const PageViewer = ({ content, loading, error, selectedPage }: PageViewerProps) => {
  if (loading) {
    return <div className="flex-1 p-8">Loading page...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 text-red-500">Error: {error}</div>;
  }

  if (!content) {
    return <div className="flex-1 p-8">Select a page to view its content</div>;
  }

  return (
    <div className="flex-1 p-8 prose max-w-none">
      <h1>Welcome to Acme</h1>
      <h2>Selected Page: {selectedPage}</h2>
      <div className="mt-4">
        {parse(content)}
      </div>
    </div>
  );
};

export default PageViewer;
