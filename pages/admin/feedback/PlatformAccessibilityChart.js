import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const PlatformAccessibilityChart = ({ feedbackData }) => {
  if (!feedbackData) {
    return <p>No data available</p>;
  }

  // Count the ratings
  const ratings = feedbackData.reduce((acc, feedback) => {
    const rating = feedback.platformAccessibilityRating;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  // Ensure all ratings from 1 to 5 are included, setting zero for missing ratings
  const allRatings = Array.from({ length: 5 }, (_, i) => ratings[i + 1] || 0);

  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        data: allRatings,
        label: ``,
        backgroundColor: [
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
          "#4BC0C0",
          "#36A2EB",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
          "#4BC0C0",
          "#36A2EB",
        ],
      },
    ],
  };

  // Bar chart options (optional)
  const options = {
    maintainAspectRatio: false, // Set to false to allow manual adjustment of aspectRatio
    aspectRatio: 100, // Set the desired aspect ratio (width:height)
    scales: {
      x: {
        title: {
          display: true,
          text: "Ratings",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Students",
        },
        ticks: {
          precision: 0, // Set precision to 0 to remove decimal points
        },
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PlatformAccessibilityChart;
