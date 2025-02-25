import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function RecommendCourseChart({ feedbackData }) {
  if(!feedbackData){
    return <p>No data available</p>;
  }
  // Count the number of true and false values for recommendToFriend
  const trueCount = feedbackData.filter(
    (feedback) => feedback.recommendToFriend
  ).length;
  const falseCount = feedbackData.length - trueCount;

  const data = {
    labels: ["Recommend", "Not Recommend"],
    datasets: [
      {
        data: [trueCount, falseCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return <Doughnut data={data} />;
}
