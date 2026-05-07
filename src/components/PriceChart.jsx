import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function PriceChart({
  chartData,
}) {

  // EMPTY STATE

  if (
    !chartData ||
    chartData.length === 0
  ) {

    return (

      <div className="chart-container">

        <h2>
          No Chart Data Available
        </h2>

      </div>
    );
  }

  // FORMAT DATA

  const data = chartData.map(
    (item) => {

      return {

        time: new Date(
          item[0]
        ).toLocaleDateString(),

        price: Number(
          item[1]
        ).toFixed(2),
      };
    }
  );

  return (

    <div className="chart-container">

      <h2>
        7 Day Price Movement
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          {/* GRID */}

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
          />

          {/* X AXIS */}

          <XAxis
            dataKey="time"
            tick={{
              fill: "#94a3b8",
            }}
          />

          {/* Y AXIS */}

          <YAxis
            tick={{
              fill: "#94a3b8",
            }}

            domain={[
              "auto",
              "auto",
            ]}
          />

          {/* TOOLTIP */}

          <Tooltip />

          {/* LINE */}

          <Line
            type="monotone"
            dataKey="price"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PriceChart;