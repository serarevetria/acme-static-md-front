import parse from 'html-react-parser';

type PageViewerProps = {
  content: string;
  loading: boolean;
  error: string | null;
  selectedPage: string | null;
};

const PageViewer = ({ content, loading, error, selectedPage }: PageViewerProps) => {
  if (loading) {
    return (
      <div className="flex-1 p-8 flex justify-center items-center text-lg text-gray-500">
        Loading page...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 text-red-500 flex justify-center items-center text-lg">
        Error: {error}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex-1 p-8 text-gray-500 flex justify-center items-center text-lg">
        Select a page to view its content
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 prose max-w-none bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4">Welcome to Acme</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Selected Page: {selectedPage}</h2>
      <div className="mt-4">
        {parse(content)}
      </div>
    </div>
  );
};

export default PageViewer;
