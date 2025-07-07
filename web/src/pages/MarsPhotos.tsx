import { useState } from "react";

// Use MarsRoverPhoto from service, create alias for compatibility
type RoverPhoto = any;

const MarsPhotos = () => {
  const [sol, setSol] = useState<string>("");
  const [searchedSol, setSearchedSol] = useState<number | undefined>(undefined); // undefined means get latest photos
  const [selectedPhoto, setSelectedPhoto] = useState<RoverPhoto | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleSolSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedSol(parseInt(sol));
  };

  const resetToLatest = () => {
    setSol("");
    setSearchedSol(undefined); // undefined triggers latest photos fetch
  };

  const openModal = (photo: RoverPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
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
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
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
              <button
                type="submit"
                disabled={isFetching || !sol.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetching ? "Searching..." : "Search"}
              </button>

              <button
                type="button"
                onClick={resetToLatest}
                disabled={isFetching}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetching ? "Loading..." : "Latest Photos"}
              </button>
            </form>
          </div>

          {/* Results Info */}
          {/* {roverData && (
            <div className="mb-6">
              <p className="text-gray-600 text-center">
                {roverData.photos.length > 0 
                  ? `Found ${roverData.photos.length} photo${roverData.photos.length !== 1 ? 's' : ''} ${searchedSol !== undefined ? `from Sol ${searchedSol}` : 'from the latest available day'}`
                  : `No photos found ${searchedSol !== undefined ? `for Sol ${searchedSol}` : 'for the latest day'}`
                }
              </p>
            </div>
          )} */}

          {/* Photo Gallery */}
          {/* {roverData && roverData.photos.length > 0 && ( */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {/* {roverData.photos.map((photo) => ( */}
            <div
              //   key={photo.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              //   onClick={() => openModal(photo)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={
                    "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG"
                  }
                  alt={`Mars rover photo from Sol 1000`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Sol 1000
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  {new Date("2012-08-06").toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">FHAZ</p>
              </div>
            </div>
            {/* ))} */}
          </div>
          {/* )} */}

          {/* No Results */}
          {/* {roverData && roverData.photos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No photos found</h3>
              <p className="text-gray-600 mb-4">
                {searchedSol !== undefined ? `No photos were taken on Sol ${searchedSol}. ` : ''}
                Try searching for a different Martian day.
              </p>
              <button
                onClick={resetToLatest}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                View Latest Photos
              </button>
            </div>
          )} */}
        </div>
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-opacity z-10"
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
                className="w-full h-auto"
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
