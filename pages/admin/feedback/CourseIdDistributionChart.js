import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const CourseIdDistributionChart = ({ feedbackData }) => {
  if (!feedbackData) {
    return <p>No data available</p>;
  }
  // Extracting courseId from feedbackData
  const courseIds = feedbackData.map((feedback) => feedback.courseId);
  const courseNames = feedbackData.map((feedback) => feedback.Course.name);

  // Counting occurrences of each courseId
  const courseIdCounts = Array.from(new Set(courseIds)).map(
    (courseId) => courseIds.filter((id) => id === courseId).length
  );

  // Data for the doughnut chart
  const data = {
    labels: Array.from(new Set(courseNames)),
    datasets: [
      {
        data: courseIdCounts,
        label: `${courseIdCounts.length} Courses`,
        backgroundColor: ["rgba(54, 162, 235, 0.6)"],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
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
          text: "Course Names",
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

export default CourseIdDistributionChart;
