import React from 'react';
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const CoachRatingChart = ({ feedbackData }) => {
  if (!feedbackData) {
    return <p>No data available</p>;
  }

  // Count the coach ratings
  const coachRatings = feedbackData.reduce((acc, feedback) => {
    const rating = feedback.coachRating;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  // Ensure all ratings (A, B, C, D, 5) are included, setting zero for missing ratings
  const allRatings = ['A', 'B', 'C', 'D'].map(rating => coachRatings[rating] || 0);

  const data = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        data: allRatings,
        label: 'Coach Ratings',
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
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      x: {
        title: {
          display: true,
          text: "Coach Ratings",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Students",
        },
        ticks: {
          precision: 0,
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

export default CoachRatingChart;
