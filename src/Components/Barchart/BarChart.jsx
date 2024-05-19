import React from "react";
import { Chart } from "react-google-charts";

// Function to transform data
const transformData = (data) => {
  if (!data || data.length === 0) {
    console.log("No data provided.");
    return []; // Return an empty array if data is undefined or empty
  }

  const transformedData = [
    ["Category", "Value", { role: "style" }], // Header row
    ...data.map((item) => [item.name, item.value, "blue"]), // Data rows with blue color
  ];
  return transformedData;
};

// BarChart component
export default function BarChart({ data }) {
  const formattedData = transformData(data);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Chart
        chartType="BarChart"
        width="100%"
        height="100%"
        data={formattedData}
        options={{
          backgroundColor: "none", // Ensure no background color
          legend: { position: "none" }, // Hide legend
          hAxis: {
            title: '',
            textPosition: 'none', // Hide horizontal axis
            gridlines: { count: 0 }, // Hide gridlines
          },
          vAxis: {
            title: '',
            textPosition: 'none', // Hide vertical axis
            gridlines: { count: 0 }, // Hide gridlines
          },
          chartArea: { width: '90%', height: '80%' }, // Adjust chart area
          bar: { groupWidth: "95%" }, // Bar width
        }}
      />
    </div>
  );
}
