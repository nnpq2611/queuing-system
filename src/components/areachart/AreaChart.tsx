import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart: React.FC<{ data: any }> = ({ data }) => {
  const series = [
    {
      name: "series1",
    //   data: [...data.slice(2), data[0]],
     data: [31, 40, 28, 51, 42, 109, 100]
    },
  ];
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#5185F7"],
    },
    xaxis: {
      categories: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5","Thứ 6","Thứ 7"],
    },
    colors: ["rgba(206, 221, 255, 1)", "rgba(206, 221, 255, 0)"],
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default AreaChart;
