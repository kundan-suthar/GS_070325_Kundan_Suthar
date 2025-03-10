import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample Data: Replace this with your actual GM Dollars and Sales Data
const data = [
  {
    week: "Week 1",
    gmDollars: 5000,
    salesDollars: 10000,
    gmPercent: (5000 / 10000) * 100,
  },
  {
    week: "Week 2",
    gmDollars: 7000,
    salesDollars: 15000,
    gmPercent: (7000 / 15000) * 100,
  },
  {
    week: "Week 3",
    gmDollars: 4000,
    salesDollars: 9000,
    gmPercent: (4000 / 9000) * 100,
  },
  {
    week: "Week 4",
    gmDollars: 8000,
    salesDollars: 17000,
    gmPercent: (8000 / 17000) * 100,
  },
];

const Charts = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        {/* X-Axis (Weeks) */}
        <XAxis dataKey="week" />

        {/* Left Y-Axis for GM Dollars */}
        <YAxis
          yAxisId="left"
          label={{ value: "GM Dollars", angle: -90, position: "insideLeft" }}
        />

        {/* Right Y-Axis for GM Percentage */}
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(value) => `${value}%`}
          label={{ value: "GM %", angle: -90, position: "insideRight" }}
        />

        <Tooltip />
        <Legend />

        {/* GM Dollars as Bar Chart */}
        <Bar
          yAxisId="left"
          dataKey="gmDollars"
          fill="#8884d8"
          name="GM Dollars"
        />

        {/* GM % as Line Chart */}
        <Line
          yAxisId="right"
          dataKey="gmPercent"
          stroke="#82ca9d"
          name="GM %"
          dot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Charts;
