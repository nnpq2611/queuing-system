import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const MultipleRadialbars = () => {
  const series = [94, 6];
  const options: ApexOptions = {
    chart: {
      height: "auto",
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "16px",
            show: false,
          },
          value: {
            fontSize: "18px",
          },
          total: {
            show: false,
            label: "Total",
            formatter: (w: any) => {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return "249";
            },
          },
        },
      },
    },
    labels: ["Đang hoạt động", "Ngưng hoạt động"],
    legend: {
      show: false,
      floating: true,
      fontSize: "5px",
      position: "left",
      offsetX: 160,
      offsetY: 10,
      labels: {
        useSeriesColors: true,
      },

      formatter: (seriesName: any, opts: any) => {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 1,
      },
    },
    responsive: [
      {
        breakpoint: 400,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],

    stroke: {
      lineCap: "round",
    },

    colors: ["#FF7506", "#7E7D88"],

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#FF7506", "#7E7D88"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height={140}
    />
  );
};

export default MultipleRadialbars;
