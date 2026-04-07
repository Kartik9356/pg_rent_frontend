import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ChartSection = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 8000, 6000, 9000, 12000],
        backgroundColor: "#d4af37",
      },
    ],
  };

  return (
    <div className="bg-white p-5 mt-5 border">
      <h3>Monthly Revenue</h3>
      <Bar data={data} />
    </div>
  );
};

export default ChartSection;