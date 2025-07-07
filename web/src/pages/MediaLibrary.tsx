import DatePicker from "@/components/DatePicker";

const MediaLibrary = () => {
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
          <form
            onSubmit={() => {}}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
          >
            <DatePicker
              // date={selectedDate}
              // onDateChange={handleDateChange}
              placeholder="Pick a date for APOD"
              // minDate={apodStartDate}
              // maxDate={today}
              // disabled={isLoading || isFetching}
            />
            <input
              id="sol-input"
              // value={}
              // onChange={(e) => setSol(e.target.value)}
              placeholder="Enter keyword (e.g. 'Plant')"
              // min="0"
              // disabled={isFetching}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-none disabled:opacity-50 disabled:cursor-not-allowed w-1/3"
            />
            <button
              type="submit"
              // disabled={isFetching || !sol.trim()}
              className="px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
              {/* {isFetching ? "Searching..." : "Search"} */}
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            <div
              //   key={photo.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              //   onClick={() => openModal(photo)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={
                    "https://images-assets.nasa.gov/image/GRC-2017-C-01063/GRC-2017-C-01063~medium.jpg"
                  }
                  alt={`Mars rover photo from Sol 1000`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Advanced Plant Experiment, APEX-4
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  {new Date("2012-08-06").toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  Advanced Plant Experiment, APEX-4
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
