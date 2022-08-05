import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarCharts = ({ data }) => {
  // const test = Object.values(data);
  // const test1 = Object.keys(data);
  // const months = test.map((x, index) => ({ months: test1[index], jobs: x }));
  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 10 }}>
          <CartesianGrid strokeDasharray="3 3 " />
          <XAxis dataKey="x" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="y" fill="#2cb1bc" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
