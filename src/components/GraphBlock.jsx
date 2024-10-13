import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraphBlock = ({ content, onContentChange }) => {
  const [data, setData] = useState(content.data || [10, 20, 30, 40, 50]);

  useEffect(() => {
    if (content.data) {
      setData(content.data);
    }
  }, [content.data]);

  useEffect(() => {
    onContentChange({ data });
  }, [data]);

  const chartData = {
    labels: ["A", "B", "C", "D", "E"],
    datasets: [
      {
        label: "Sample Data",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sample Bar Chart",
      },
    },
  };

  return (
    <div className="graph-block w-full max-w-xs">
      <Bar data={chartData} options={options} />
      <div>
        <button
          onClick={() =>
            setData(data.map(() => Math.floor(Math.random() * 100)))
          }
        >
          Randomize Data
        </button>
      </div>
    </div>
  );
};

GraphBlock.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number),
  }),
  onContentChange: PropTypes.func.isRequired,
};

export default GraphBlock;
