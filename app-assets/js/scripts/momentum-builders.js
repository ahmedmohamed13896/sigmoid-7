$(window).on("load", function () {
  if (feather) {
    feather.replace({
      width: 14,
      height: 14,
    });
  }
  //------------ Statistics Line Chart ------------
  //-----------------------------------------------

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }



  function getJsonData(data, elementID ,chartID) {
    let properties = [];
    let tableBody = "";
    let chartDates = [];
    let chartDatesValues = [];
    let dataHTML = `
                    <thead>
                        <tr>`;
    

    // store data properties
    for (let i in data.data[0]) {
      if (i != "exchange" && i != "No" && i != "urls" && i != "MC") {
        properties.push(i);
        dataHTML += `<th>${i}</th>`;
      }
    }

    dataHTML += `</tr>
                    </thead>
                    <tbody>`;


    $.each(data.data, function (key, value) {
      tableBody += `
                           <tr>`;
      for (let i = 0; i < properties.length; i++) {
        if (i != "exchange" && i != "No" && i != "urls" && i != "MC") {
            value[properties[i]][0] =='-' ?  tableBody += `<td class="text-danger">${value[properties[i]]}</td>`: tableBody += `<td>${value[properties[i]]}</td>`;
          }
        }

        
       
      tableBody += `
                           </tr>`;
    });

    tableBody += `</tbody>`;
    dataHTML += tableBody;
    $(elementID).append(dataHTML);




    // console.log(properties);

   

    for(let i=1; i<properties.length - 1; i++){
      chartDates.push(properties[i]);
      // console.log(data.data[0][properties[i]]);
      chartDatesValues.push(data.data[0][properties[i]]);
    }

    let sum = chartDatesValues.reduce(function (a, b) {
      return Number(a) + Number(b);
    }, 0);     

    for(let x=0; x<chartDatesValues.length; x++){
      chartDatesValues[x] = ((chartDatesValues[x] * 100) / sum).toFixed(2) ;
      console.log(chartDatesValues[x] + "%");
    }

    


    createBarChart(chartID, chartDates, chartDatesValues);

  }

    function createBarChart(id, chartDates, chartDatesValues) {
      var barChartEx = $(id),
        chartWrapper = $(".chartjs");
      var warningColorShade = "#ffe802",
        tooltipShadow = "rgba(0, 0, 0, 0.25)",
        lineChartPrimary = "#666ee8",
        lineChartDanger = "#ff4961",
        labelColor = "#6e6b7b",
        successColorShade = "#28dac6",
        grid_line_color = "rgba(200, 200, 200, 0.2)"; // RGBA color helps in dark layout

      // for(let i=0;i<chartDatesValues.length;i++){
      //   chartDatesValues+= "%";
      // }


      // Line Chart
      // --------------------------------------------------------------------

      // Wrap charts with div of height according to their data-height
      if (chartWrapper.length) {
        chartWrapper.each(function () {
          $(this).wrap(
            $(
              '<div style="height:' +
                this.getAttribute("data-height") +
                'px"></div>'
            )
          );
        });
      }

        if (barChartEx.length) {
          var barChartExample = new Chart(barChartEx, {
            type: "bar",
            options: {
              elements: {
                rectangle: {
                  borderWidth: 2,
                  borderSkipped: "bottom",
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              responsiveAnimationDuration: 500,
              legend: {
                display: false,
              },
              tooltips: {
                // Updated default tooltip UI
                shadowOffsetX: 1,
                shadowOffsetY: 1,
                shadowBlur: 8,
                shadowColor: tooltipShadow,
                backgroundColor: window.colors.solid.white,
                titleFontColor: window.colors.solid.black,
                bodyFontColor: window.colors.solid.black,
              },
              scales: {
                xAxes: [
                  {
                    barThickness: 15,
                    display: true,
                    gridLines: {
                      display: true,
                      color: grid_line_color,
                      zeroLineColor: grid_line_color,
                    },
                    scaleLabel: {
                      display: false,
                    },
                    ticks: {
                      fontColor: labelColor,
                    },
                  },
                ],
                yAxes: [
                  {
                    display: true,
                    gridLines: {
                      color: grid_line_color,
                      zeroLineColor: grid_line_color,
                    },
                    ticks: {
                      stepSize: 20,
                      min: id=="#winners_line_chart"? 0: -100,
                      max: 100,
                      fontColor: labelColor,
                      callback: function (label) {
                        if (label) {
                          return label + "%";
                        }
                      },
                    },
                  },
                ],
              },
            },
            data: {
              labels: chartDates,
              datasets: [
                {
                  data: chartDatesValues,
                  backgroundColor: successColorShade,
                  borderColor: "transparent",
                },
              ],
            },
          });
        }
    }

  // get data from the json link

  // Momentum Builders 3D winners
    fetch("https://api.apispreadsheets.com/data/8620/")
    .then((response) => response.json())
    .then((data) => {
        // Create Table from Json

        getJsonData(data, "#3DWinners", "#winners_line_chart");
        // createLineChart();
    });

  // Momentum Builders 3D Losers
  fetch("https://api.apispreadsheets.com/data/8617/")
    .then((response) => response.json())
    .then((data) => {
      // Create Table from Json
      

      getJsonData(data, "#3DLosers", "#losers_line_chart");
      // createLineChart();
    });
});
