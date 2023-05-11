import React from 'react'
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';

const MultipleRadialbars = () => {
    const options: ApexOptions = {
        series: [44, 55],
        chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
            //   formatter: function () {
            //     // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            //     return 249
            //   }
            }
          }
        }
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    return (
        <div>
            <ReactApexChart
                options={options}
                type="area"
                height={350}
            />
        </div>
    )
}

export default MultipleRadialbars