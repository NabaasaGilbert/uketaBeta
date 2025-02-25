import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";

// const SatisfactionRatingChart = ({ feedbackData }) => {
//   if (!feedbackData) {
//     return <p>No data available</p>;
//   }
//   // Extracting satisfactionRating from feedbackData
//   const satisfactionRatings = feedbackData.map(
//     (feedback) => feedback.satisfactionRating
//   );

//   // Counting occurrences of each satisfaction rating
//   const ratingCounts = Array.from(
//     { length: 6 },
//     (_, i) => satisfactionRatings.filter((rating) => rating === i).length
//   );

//   // Data for the doughnut chart
//   const data = {
//     labels: ["1", "2", "3", "4", "5"],
//     datasets: [
//       {
//         data: ratingCounts,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.6)",
//           "rgba(255, 205, 86, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(153, 102, 255, 0.6)",
//         ],
//         borderColor: "rgba(255, 255, 255, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Bar chart options (optional)
//   const options = {
//     maintainAspectRatio: false, // Set to false to allow manual adjustment of aspectRatio
//     aspectRatio: 100, // Set the desired aspect ratio (width:height)
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Ratings",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Number of Students",
//         },
//         ticks: {
//           precision: 0, // Set precision to 0 to remove decimal points
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ height: "400px" }}>
//       {/* <Doughnut data={data} /> */}
//       <Bar data={data} options={options}/>
//     </div>
//   );
// };

const SatisfactionRatingChart = ({ feedbackData }) => {
  if (!feedbackData) {
    return <p>No data available</p>;
  }

  // Count the ratings
  const ratings = feedbackData.reduce((acc, feedback) => {
    const rating = feedback.satisfactionRating;
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

export default SatisfactionRatingChart;
