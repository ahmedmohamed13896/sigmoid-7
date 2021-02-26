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

  function getJsonData(data, elementID) {
    let properties = [];
    let tableBody = "";

    let dataHTML = `
                    <thead>
                        <tr>`;

    // store data properties
    for (let i in data.data[0]) {
      if (
        i != "No." &&
        i != "No" &&
        i != "Industry" &&
        i != "Country" &&
        i != "P/E" &&
        i != "Id"
      ) {
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
        if (
          i != "No." &&
          i != "No" &&
          i != "Industry" &&
          i != "Country" &&
          i != "P/E" &&
          i != "Id"
        ) {
          if (value[properties[i]][0] == "-") {
            tableBody += `<td class="text-danger">${value[properties[i]]}</td>`;
          } else if (value[properties[i]] == "") {
            tableBody += `<td>${numberWithCommas(value[properties[i]])}</td>`;
          } else if (value[properties[i]]) {
            tableBody += `<td>${value[properties[i]]}</td>`;
          }
        }
      }
      tableBody += `
                           </tr>`;
    });
    tableBody += `</tbody>`;
    dataHTML += tableBody;
    $(elementID).append(dataHTML);
  }

  function getJsonData2(data, elementID) {
    let properties = [];
    let tableBody = "";
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
  }

 

  function createLineChart(id) {
    var lineChartEx = $(id),
     chartWrapper = $('.chartjs');
    var warningColorShade = "#ffe802",
      tooltipShadow = "rgba(0, 0, 0, 0.25)",
      lineChartPrimary = "#666ee8",
      lineChartDanger = "#ff4961",
      labelColor = "#6e6b7b",
      grid_line_color = "rgba(200, 200, 200, 0.2)"; // RGBA color helps in dark layout

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

    if (lineChartEx.length) {
      var lineExample = new Chart(lineChartEx, {
        type: "line",
        plugins: [
          // to add spacing between legends and chart
          {
            beforeInit: function (chart) {
              chart.legend.afterFit = function () {
                this.height += 20;
              };
            },
          },
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          backgroundColor: false,
          hover: {
            mode: "label",
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
          layout: {
            padding: {
              top: -15,
              bottom: -25,
              left: -15,
            },
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                },
                gridLines: {
                  display: true,
                  color: grid_line_color,
                  zeroLineColor: grid_line_color,
                },
                ticks: {
                  fontColor: labelColor,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                },
                ticks: {
                  stepSize: 100,
                  min: 0,
                  max: 400,
                  fontColor: labelColor,
                },
                gridLines: {
                  display: true,
                  color: grid_line_color,
                  zeroLineColor: grid_line_color,
                },
              },
            ],
          },
          legend: {
            position: "top",
            align: "start",
            labels: {
              usePointStyle: true,
              padding: 25,
              boxWidth: 9,
            },
          },
        },
        data: {
          labels: [
            0,
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100,
            110,
            120,
            130,
            140,
          ],
          datasets: [
            {
              data: [
                80,
                150,
                180,
                270,
                210,
                160,
                160,
                202,
                265,
                210,
                270,
                255,
                290,
                360,
                375,
              ],
              label: "Europe",
              borderColor: lineChartDanger,
              lineTension: 0.5,
              pointStyle: "circle",
              backgroundColor: lineChartDanger,
              fill: false,
              pointRadius: 1,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 5,
              pointBorderColor: "transparent",
              pointHoverBorderColor: window.colors.solid.white,
              pointHoverBackgroundColor: lineChartDanger,
              pointShadowOffsetX: 1,
              pointShadowOffsetY: 1,
              pointShadowBlur: 5,
              pointShadowColor: tooltipShadow,
            },
            {
              data: [
                80,
                125,
                105,
                130,
                215,
                195,
                140,
                160,
                230,
                300,
                220,
                170,
                210,
                200,
                280,
              ],
              label: "Asia",
              borderColor: lineChartPrimary,
              lineTension: 0.5,
              pointStyle: "circle",
              backgroundColor: lineChartPrimary,
              fill: false,
              pointRadius: 1,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 5,
              pointBorderColor: "transparent",
              pointHoverBorderColor: window.colors.solid.white,
              pointHoverBackgroundColor: lineChartPrimary,
              pointShadowOffsetX: 1,
              pointShadowOffsetY: 1,
              pointShadowBlur: 5,
              pointShadowColor: tooltipShadow,
            },
            {
              data: [
                80,
                99,
                82,
                90,
                115,
                115,
                74,
                75,
                130,
                155,
                125,
                90,
                140,
                130,
                180,
              ],
              label: "Africa",
              borderColor: warningColorShade,
              lineTension: 0.5,
              pointStyle: "circle",
              backgroundColor: warningColorShade,
              fill: false,
              pointRadius: 1,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 5,
              pointBorderColor: "transparent",
              pointHoverBorderColor: window.colors.solid.white,
              pointHoverBackgroundColor: warningColorShade,
              pointShadowOffsetX: 1,
              pointShadowOffsetY: 1,
              pointShadowBlur: 5,
              pointShadowColor: tooltipShadow,
            },
          ],
        },
      });
    }
  }

  // get data from the json link

  // Momentum Builders 3D winners
    fetch("https://api.apispreadsheets.com/data/8617/")
    .then((response) => response.json())
    .then((data) => {
        // Create Table from Json
        var status = "loser";

        getJsonData2(data, "#3DWinners");
        createLineChart("#winners_line_chart");
    });

  // Momentum Builders 3D Losers
  fetch("https://api.apispreadsheets.com/data/8617/")
    .then((response) => response.json())
    .then((data) => {
      // Create Table from Json
      var status = "loser";

      getJsonData2(data, "#3DLosers");
      createLineChart("#losers_line_chart");
    });
});
