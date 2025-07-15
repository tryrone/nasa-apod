import { EmptyState, ErrorState, PageLoader } from "@/components";
import { useMediaLibrary } from "@/hooks/useNASA";
import type { ImageSearchItem } from "@/services/nasa";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useDebounce } from "use-debounce";

const MediaLibrary = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedPhoto, setSelectedPhoto] = useState<ImageSearchItem | null>(
    null
  );

  const [page, setPage] = useState<number>(1);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const {
    data: mediaLibraryData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useMediaLibrary({ query: debouncedSearchQuery || "mars", page });

  const isLoadingOrFetching = isLoading || isFetching;

  const openModal = (photo: ImageSearchItem) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const renderContent = ({ mediaLibraryData }: { mediaLibraryData: any }) => {
    return mediaLibraryData?.collection?.items?.map(
      (photo: ImageSearchItem) => (
        <div
          key={photo?.data?.[0]?.nasa_id}
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => openModal(photo)}
        >
          <div className="aspect-square relative overflow-hidden">
            <img
              src={photo?.links?.[0]?.href}
              alt={photo?.data?.[0]?.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-900 mb-1">
              {photo?.data?.[0]?.title}
            </p>
            <p className="text-xs text-gray-600 mb-2">
              {photo?.data?.[0]?.date_created}
            </p>
            <p className="text-xs text-gray-500 line-clamp-2">
              {photo?.data?.[0]?.description}
            </p>
          </div>
        </div>
      )
    );
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Image Library</h1>
        <p className="text-gray-600 text-lg">Explore NASA's image library.</p>

        <label
          htmlFor="sol-input"
          className="text-sm font-medium text-gray-700"
        >
          Search by Keyword:
        </label>

        <div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <input
              id="sol-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter keyword (e.g. 'Plant')"
              disabled={isFetching}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-none disabled:opacity-50 disabled:cursor-not-allowed w-1/3"
            />
          </div>

          {isLoadingOrFetching && (
            <PageLoader message="Loading Media Library..." />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {error && (
              <ErrorState
                title="Error Loading Mars Photos"
                message={error.message}
                refetch={refetch}
              />
            )}
            {mediaLibraryData && renderContent({ mediaLibraryData })}
            {mediaLibraryData &&
              mediaLibraryData.collection.items.length === 0 && (
                <EmptyState message="No photos found" />
              )}
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(page) => setPage(page.selected + 1)}
            pageRangeDisplayed={10}
            pageCount={
              mediaLibraryData?.collection?.metadata?.total_hits
                ? Math.ceil(
                    mediaLibraryData?.collection?.metadata?.total_hits / 25
                  )
                : 0
            }
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="pagination-container"
            previousClassName="pagination-previous button-type"
            nextClassName="pagination-next button-type"
            pageClassName="pagination-page button-type"
            activeClassName="pagination-active button-type"
          />
        </div>

        {/* Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black-500 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-opacity z-10"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <img
                  src={selectedPhoto?.links?.[0]?.href}
                  alt={`Mars rover photo from Sol ${selectedPhoto?.data?.[0]?.nasa_id}`}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {selectedPhoto?.data?.[0]?.title}
                </h3>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(
                        selectedPhoto?.data?.[0]?.date_created
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {selectedPhoto?.data?.[0]?.description}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href={selectedPhoto?.data?.[0]?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm cursor-pointer"
                  >
                    View Full Resolution
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
