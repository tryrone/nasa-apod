import { useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/Button";

const Apod = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  // const {
  //   data: apodData,
  //   isLoading,
  //   error,
  //   refetch,
  //   isFetching
  // } = useAPOD(selectedDate?.toISOString().split('T')[0])

  const isLoading = false;
  const isFetching = false;

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const apodStartDate = new Date("1995-06-16");
  const today = new Date();

  const resetToToday = () => {
    setSelectedDate(undefined);
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
            {isFetching && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            )}
          </div>
          <Button
            onClick={resetToToday}
            variant="default"
            disabled={isLoading || isFetching}
            className="bg-sky-600 text-white cursor-pointer"
          >
            Reset to Today
          </Button>
        </div>
      </div>
      <div className="flex flex-nowrap gap-3">
        <div className="flex-1">
          <p className="text-3xl font-bold text-sky-600">
            Ou4: The Giant Squid Nebula
          </p>

          <p className="text-[16px] mt-4 font-normal text-neutral-600 leading-7">
            Difficult to capture, this mysterious, squid-shaped interstellar
            cloud spans nearly three full moons in planet Earth's sky.
            Discovered in 2011 by French astro-imager Nicolas Outters, the Squid
            Nebula's bipolar shape is distinguished here by the telltale blue
            emission from doubly ionized oxygen atoms. Though apparently
            surrounded by the reddish hydrogen emission region Sh2-129, the true
            distance and nature of the Squid Nebula have been difficult to
            determine. Still, one investigation suggests Ou4 really does lie
            within Sh2-129 some 2,300 light-years away. Consistent with that
            scenario, the cosmic squid would represent a spectacular outflow of
            material driven by a triple system of hot, massive stars, cataloged
            as HR8119, seen near the center of the nebula. If so, this truly
            giant squid nebula would physically be over 50 light-years across.
          </p>
        </div>

        <div className="flex flex-1 justify-end">
          <img
            src="https://apod.nasa.gov/apod/image/2507/Ou4_difusco1024.jpg"
            alt="APOD"
            style={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              borderRadius: 25,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Apod;
