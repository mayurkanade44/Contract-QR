import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const VerticalChart = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={1500}>
        <ComposedChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            left: 40,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="x" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="y" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default VerticalChart;
