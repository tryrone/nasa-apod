import { useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/Button";
import { useAPOD } from "@/hooks/useNASA";
import PageLoader from "@/components/PageLoader";
import { EmptyState, ErrorState } from "@/components";

const Apod = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const {
    data: apodData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useAPOD(selectedDate?.toISOString().split("T")[0]);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const apodStartDate = new Date("1995-06-16");
  const today = new Date();

  const resetToToday = () => {
    setSelectedDate(today);
  };

  const isLoadingOrFetching = isLoading || isFetching;

  const renderContent = () => {
    return (
      <div className="flex flex-nowrap gap-3">
        <div className="flex-1">
          <p className="text-3xl font-bold text-sky-600">{apodData?.title}</p>

          <p className="text-[16px] mt-4 font-normal text-neutral-600 leading-7">
            {apodData?.explanation}
          </p>
        </div>

        <div className="flex flex-1 justify-end">
          {apodData?.media_type === "image" ? (
            <div className="group">
              <img
                src={apodData?.url}
                alt={apodData?.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {apodData?.hdurl && (
                <div className="absolute top-4 right-4">
                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    className="bg-black bg-opacity-70 text-white hover:bg-opacity-90"
                  >
                    <a
                      href={apodData?.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      HD Version
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full">
              <iframe
                src={apodData?.url}
                title={apodData?.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Astronomy Picture of the Day
        </h1>
        <p className="text-gray-600 text-lg">
          Discover the cosmos through NASA's daily featured astronomy images and
          videos
        </p>
      </div>
      <div className="p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <DatePicker
              date={selectedDate}
              onDateChange={handleDateChange}
              placeholder="Pick a date for APOD"
              minDate={apodStartDate}
              maxDate={today}
              disabled={isLoading || isFetching}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={resetToToday}
              variant="default"
              disabled={isLoading || isFetching}
              className="bg-sky-600 text-white cursor-pointer"
            >
              Reset to Today
            </Button>
            {isFetching && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            )}
          </div>
        </div>
      </div>

      {error ? (
        <ErrorState
          title="Error Loading APOD"
          message={error.message}
          refetch={refetch}
        />
      ) : isLoadingOrFetching ? (
        <PageLoader message="Loading astronomy picture..." />
      ) : apodData && apodData.url ? (
        renderContent()
      ) : (
        <EmptyState message="No Data Found" />
      )}
    </section>
  );
};

export default Apod;
