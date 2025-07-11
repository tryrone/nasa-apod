import { EmptyState, ErrorState, PageLoader } from "@/components";
import { useMarsRoverPhotos } from "@/hooks/useNASA";
import {
  AVAILABLE_CAMERAS,
  AVAILABLE_ROVERS,
  type CameraName,
  type RoverName,
} from "@/services/nasa";
import { useState } from "react";
import ReactPaginate from "react-paginate";

// Use MarsRoverPhoto from service, create alias for compatibility
type RoverPhoto = any;

const MarsPhotos = () => {
  const [sol, setSol] = useState<string>("");
  const [searchedSol, setSearchedSol] = useState<number | undefined>(1000); // undefined means get latest photos
  const [selectedPhoto, setSelectedPhoto] = useState<RoverPhoto | null>(null);

  const [rover, setRover] = useState<RoverName>("curiosity");

  const [camera, setCamera] = useState<CameraName>("fhaz");

  const [page, setPage] = useState<number>(1);

  const {
    data: roverData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useMarsRoverPhotos({
    rover,
    sol: searchedSol,
    camera,
    page,
  });

  const handleSolSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedSol(parseInt(sol));
  };

  const openModal = (photo: RoverPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const isLoadingOrFetching = isLoading || isFetching;

  const isError = error && !isLoadingOrFetching;

  const renderContent = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {roverData?.photos?.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => openModal(photo)}
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={photo.img_src}
                alt={`Mars rover photo from Sol 1000`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Sol {photo.sol}
              </p>
              <p className="text-xs text-gray-600 mb-2">
                {new Date(photo.earth_date).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">{photo.camera.full_name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mars Rover Photo Explorer
            </h1>
            <p className="text-gray-600 text-lg">
              Explore photographs captured by NASA's Curiosity rover on Mars
            </p>
          </div>

          {/* Sol Search */}
          <div>
            <form
              onSubmit={handleSolSubmit}
              className="flex flex-col sm:flex-row items-end justify-center gap-4"
            >
              <div className="flex flex-col">
                <label
                  htmlFor="sol-input"
                  className="text-sm font-medium text-gray-700"
                >
                  Search by Martian Day (Sol):
                </label>
                <input
                  id="sol-input"
                  type="number"
                  value={sol}
                  onChange={(e) => setSol(e.target.value)}
                  placeholder="Enter sol number (e.g. 1000)"
                  min="0"
                  disabled={isFetching}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="camera-input"
                  className="text-sm font-medium text-gray-700"
                >
                  Camera:
                </label>
                <select
                  id="camera-input"
                  value={camera}
                  defaultValue={camera}
                  onChange={(e) => setCamera(e.target.value as CameraName)}
                  disabled={isFetching}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {AVAILABLE_CAMERAS.map((cam) => (
                    <option key={cam} value={cam}>
                      {cam}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="rover-input"
                  className="text-sm font-medium text-gray-700"
                >
                  Rover:
                </label>
                <select
                  id="rover-input"
                  value={rover}
                  defaultValue={rover}
                  onChange={(e) => setRover(e.target.value as RoverName)}
                  disabled={isFetching}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {AVAILABLE_ROVERS.map((rover) => (
                    <option key={rover} value={rover}>
                      {rover}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isFetching || !sol.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetching ? "Searching..." : "Search"}
              </button>
            </form>
          </div>

          {isLoadingOrFetching && (
            <PageLoader message="Loading Rover photos..." />
          )}

          {isError && (
            <ErrorState
              title="Error Loading Mars Photos"
              message={error.message}
              refetch={refetch}
            />
          )}
          {roverData && renderContent()}
          {roverData && roverData.photos.length === 0 && (
            <EmptyState message="No photos found" />
          )}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(page) => setPage(page.selected + 1)}
          pageRangeDisplayed={5}
          pageCount={
            roverData?.photos?.length
              ? Math.ceil(roverData?.photos?.length / 25)
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
                src={selectedPhoto.img_src}
                alt={`Mars rover photo from Sol ${selectedPhoto.sol}`}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Mars Photo Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Sol:</span>
                  <span className="ml-2 text-gray-600">
                    {selectedPhoto.sol}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Earth Date:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(selectedPhoto.earth_date).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Camera:</span>
                  <span className="ml-2 text-gray-600">
                    {selectedPhoto.camera.full_name}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Photo ID:</span>
                  <span className="ml-2 text-gray-600">{selectedPhoto.id}</span>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={selectedPhoto.img_src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  View Full Resolution
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarsPhotos;
