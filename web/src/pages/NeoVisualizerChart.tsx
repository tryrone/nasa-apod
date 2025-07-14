import { EmptyState, ErrorState } from "@/components";
import DatePicker from "@/components/DatePicker";
import PageLoader from "@/components/PageLoader";
import { useNearEarthObjects } from "@/hooks/useNASA";
import { isDateRangeWithinSevenDays, getSevenDayRange } from "@/utils";
import {
  getHazardousCount,
  getNeoCountPerDay,
} from "@/utils/transformNeoFeedData";
import { useCallback, useMemo, useState, memo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

// Types
interface HazardData {
  name: string;
  value: number;
}

interface BarData {
  date: string;
  count: number;
}

interface DateRangeProps {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  isValidRange: boolean;
}

// Constants
const COLORS = ["#AA0000", "#10b981"] as const;
const MIN_DATE = new Date("1995-01-01");
const MAX_DATE = new Date();

// Header Component
const NeoHeader = () => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">
      Near Earth Objects
    </h1>
    <p className="text-gray-600 text-lg">
      Explore near earth Asteroid information.
    </p>
  </div>
);

// Date Range Selector Component
const DateRangeSelector = memo(
  ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isValidRange,
  }: DateRangeProps) => {
    const { startDate: defaultStart, endDate: defaultEnd } = getSevenDayRange();

    const handleSetDefaultRange = useCallback(() => {
      setStartDate(defaultStart);
      setEndDate(defaultEnd);
    }, [defaultStart, defaultEnd, setStartDate, setEndDate]);

    return (
      <div className="space-y-4 mb-8">
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              placeholder="Start Date"
              minDate={MIN_DATE}
              maxDate={MAX_DATE}
              disabled={false}
            />
          </div>

          <div className="flex items-center gap-2">
            <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              placeholder="End Date"
              minDate={MIN_DATE}
              maxDate={MAX_DATE}
              disabled={false}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSetDefaultRange}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Set 7-Day Range
          </button>
        </div>

        {startDate && endDate && !isValidRange && (
          <div className="text-center">
            <p className="text-red-600 text-sm">
              Please select a date range of exactly 7 days to view the data.
            </p>
          </div>
        )}

        {isValidRange && (
          <div className="text-center">
            <p className="text-green-600 text-sm">
              ✓ Valid 7-day range selected
            </p>
          </div>
        )}
      </div>
    );
  }
);

DateRangeSelector.displayName = "DateRangeSelector";

// Pie Chart Component
const NeoHazardPieChart = memo(({ data }: { data: HazardData[] }) => (
  <div>
    <h3 className="text-xl text-center mb-4 font-bold">
      Hazardous vs Non-Hazardous
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={80}
          paddingAngle={5}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
));

NeoHazardPieChart.displayName = "NeoHazardPieChart";

// Bar Chart Component
const NeoBarChart = memo(({ data }: { data: BarData[] }) => (
  <div>
    <h3 className="text-xl text-center mb-4 mt-10 font-bold">
      Number of NEOs Per Day
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" fontSize={16} fontStyle="bold" />
        <YAxis allowDecimals={false} fontSize={16} fontStyle="bold" />
        <Tooltip />
        <Bar
          dataKey="count"
          fill="#6366f1"
          barSize={40}
          radius={[50, 50, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
));

NeoBarChart.displayName = "NeoBarChart";

// Main Component
const NeoVisualiserChart = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    getSevenDayRange().startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    getSevenDayRange().endDate
  );

  // Memoized query parameters
  const queryParams = useMemo(
    () => ({
      start_date: startDate?.toISOString().split("T")[0] || undefined,
      end_date: endDate?.toISOString().split("T")[0] || undefined,
    }),
    [startDate, endDate]
  );

  // Memoized validation for 7-day range
  const isValidRange = useMemo(
    () =>
      startDate && endDate
        ? isDateRangeWithinSevenDays(startDate, endDate)
        : false,
    [startDate, endDate]
  );

  // Memoized query enabled condition
  const isQueryEnabled = useMemo(
    () => isValidRange,
    [isValidRange, startDate, endDate]
  );

  const {
    data: neoData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useNearEarthObjects(queryParams, {
    enabled: isQueryEnabled,
  });

  // Memoized data transformations
  const { hazardData, barData } = useMemo(() => {
    if (!neoData?.near_earth_objects) {
      return { hazardData: [], barData: [] };
    }

    return {
      hazardData: getHazardousCount(neoData) || [],
      barData: getNeoCountPerDay(neoData) || [],
    };
  }, [neoData]);

  // Memoized callback functions
  const handleStartDateChange = useCallback((date: Date | undefined) => {
    setStartDate(date);
  }, []);

  const handleEndDateChange = useCallback((date: Date | undefined) => {
    setEndDate(date);
  }, []);

  const isLoadingOrFetching = isLoading || isFetching;

  // Loading state
  if (isLoadingOrFetching) {
    return <PageLoader message="Loading Near Earth Objects..." />;
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        title="Error"
        message="Error fetching Near Earth Objects"
        refetch={refetch}
      />
    );
  }

  return (
    <div>
      <NeoHeader />
      <DateRangeSelector
        startDate={startDate}
        setStartDate={handleStartDateChange}
        endDate={endDate}
        setEndDate={handleEndDateChange}
        isValidRange={isValidRange}
      />

      {neoData?.near_earth_objects ? (
        <>
          <NeoHazardPieChart data={hazardData} />
          <NeoBarChart data={barData} />
        </>
      ) : (
        <EmptyState message="No data found for the selected date range" />
      )}
    </div>
  );
};

export default NeoVisualiserChart;
