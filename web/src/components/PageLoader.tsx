const PageLoader = ({ message }: { message: string }) => {
  return (
    <div className="min-h-[400px]  flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default PageLoader;
