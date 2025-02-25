import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChartEl(props) {
  const IncomeArray = [];
  const BackgroundColorArray = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(225, 152, 175, 1)",
    "rgba(100, 200, 109, 1)",
    "rgba(145, 202, 175, 1)",
    "rgba(70, 160, 170, 1)",
    "rgba(50, 100, 209, 1)",
    // "rgba(145, 202, 175, 1)",
    // "rgba(70, 160, 170, 1)",
  ];
  props.countData?.studentCount.map((count, index) => {
    const value = count * props.countData?.coursePrices[index];
    IncomeArray.push(value);
  });

  const data = {
    labels: props.countData?.courseNames,
    datasets: [
      {
        label: props.income === true ? "Income" : "Students",
        data:
          props.income === true ? IncomeArray : props.countData?.studentCount,
        backgroundColor: BackgroundColorArray,
      },
    ],
  };

  return <Doughnut data={data} />;
}
