import { Chart } from "chart.js/auto";

export function deleteChart() {
  const modalBody = document.querySelector(".modal-body");
  const canvas = document.getElementById("popupChartModal");
  modalBody.removeChild(canvas);
}

export function drawChart(gazeData) {
  // create a chart canvas
  const canvas = document.createElement("canvas");
  canvas.id = "popupChartModal";

  // append the canvas to the modal body
  const modalBody = document.querySelector(".modal-body");
  modalBody.appendChild(canvas);

  // Extract timestamps and format them as HH:mm:ss.SSS (hours:minutes:seconds.milliseconds)
  const formattedTimes = gazeData.map((data) => {
    const date = new Date(data.timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  });

  return new Chart(canvas, {
    type: "scatter",
    data: {
      labels: formattedTimes, // Use formatted dates as labels on the X-axis
      datasets: [
        {
          showLine: true,
          fill: false,
          label: "Positions",
          data: gazeData.map((data) => ({ x: data.x, y: data.y })), // Use X and Y data
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            stepSize: 50,
          },
          scaleLabel: {
            display: true,
            labelString: "X",
          },
        },
        y: {
          ticks: {
            stepSize: 50,
          },
          scaleLabel: {
            display: true,
            labelString: "Y",
          },
        },
      },
    },
  });
}
