const Chart = require("chart.js/auto");
const { SerialPort } = require("serialport");
const dataJson = require("../../data.json");

const ctx = document.getElementById("myChart");

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Rampa",
        borderColor: ["#222"],
        borderWidth: 2.5,
        pointRadius: 0.8,
        color: "#000",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "rpm",
          color: "#000",
          font: {
            size: 20,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.5)",
        },
        ticks: {
          color: "blue",
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "time (seg)",
          color: "#000",
          font: {
            size: 20,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.5)",
        },
        ticks: {
          color: "red",
        },
      },
    },
    labels: {
      fontColor: "#000",
      fontSize: "40px",
    },
  },
});

const show = (data) => {
  myChart.data["datasets"][0].data.push(data.rpm);
  myChart.data["labels"].push(data.time.toString());
  // console.log(data)
  myChart.update();
};

const x = Array.from({ length: 100 }, (_, i) => i + 1);
const y = x.map((x) => 226.8 * Math.pow(x, -0.94));

let data = [];
y.map((element, i) => {
  data.push({ time: i, rpm: element });
});

let j = 1;
setInterval(() => {
  if (j < dataJson.length) {
    show(dataJson[j]);
    j++;
  }
}, 100);
