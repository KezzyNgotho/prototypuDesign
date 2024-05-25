import React, { useState, useEffect } from "react";
import { getTopOrgs } from "../../../api/admins/admins";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const OrganizersChart = () => {
  const [organizations, setOrganizations] = useState({});

  useEffect(() => {
    getTopOrgs().then((res) => {
      setOrganizations(res.data);
    });
  }, []);
  return (
    <BarChart
      width={900}
      height={400}
      data={organizations}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" className="text-[8px]" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="hackathon_count"
        fill="#089BD9"
        activeBar={<Rectangle fill="#00588C" />}
      />
    </BarChart>
  );
};

export default OrganizersChart;
