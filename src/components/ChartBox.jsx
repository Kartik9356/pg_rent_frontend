import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ChartBox = () => {
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
    <div className="chart-box">
      <h3>Monthly Revenue</h3>
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </div>
  );
};

export default ChartBox;