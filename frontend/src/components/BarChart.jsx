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
  const test = Object.values(data);
  const test1 = Object.keys(data);
  const months = test.map((x, index) => ({ months: test1[index], jobs: x,  }));
  return (
    <div>
      <h4 className="text-center mt-2">Number OF Jobs</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={months} margin={{ top: 20 }}>
          <CartesianGrid strokeDasharray="3 3 " />
          <XAxis dataKey="months" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="jobs" fill="#2cb1bc" barSize={55} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
