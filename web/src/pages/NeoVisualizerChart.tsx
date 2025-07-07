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

const COLORS = ["#AA0000", "#10b981"];

const NeoHazardPieChart = ({ data }: { data: any }) => {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Near Earth Objects
        </h1>
        <p className="text-gray-600 text-lg">
          Explore near earth Asteroid information.
        </p>
      </div>
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
            {/* @ts-ignore */}
            {data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const NeoBarChart = ({ data }: { data: any }) => {
  return (
    <div>
      <h3 className="text-xl text-center mb-4 mt-10 font-bold">
        Number of NEOs Per Day
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={16} fontStyle={"bold"} />
          <YAxis allowDecimals={false} fontSize={16} fontStyle={"bold"} />
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
  );
};

const NeoVisualiserChart = (data: { hazardData: any; barData: any }) => {
  return (
    <div>
      <NeoHazardPieChart data={data.hazardData} />
      <NeoBarChart data={data.barData} />
    </div>
  );
};

export default NeoVisualiserChart;
