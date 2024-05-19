
import React from "react";
import { Chart} from "react-google-charts";
import './PieChart.css'
// Function to transform data
const transformData = (data) => {
  if (!data || data.length === 0) {
    console.log("No data provided.");
    return []; // Return an empty array if data is undefined or empty
  }

  const transformedData = [
    ["Category", "Value"], // Header row
    ...data.map((item) => [item.name, item.value]), // Data rows
  ];
  return transformedData;
};

// PieChart component
export default function PieChart({ data }) {
  const formattedData = transformData(data);

  return (
  
      <div className="pieChartDive"><Chart
      chartType="PieChart"
      width={200}
      height={200}
      data={formattedData}
      options={{
        
        backgroundColor: "none", // Ensure no background color
        legend: { position: "bottom" }, // Position legend at the bottom
      }}
    /></div>
      
   
  
  
  );
}
