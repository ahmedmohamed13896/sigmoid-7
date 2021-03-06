$(window).on('load', function() {
  if (feather) {
    feather.replace({
      width: 14,
      height: 14,
    });
  }
  //------------ Statistics Line Chart ------------
  //-----------------------------------------------

  // News table

  // function getText() {
  //   // read text from URL location
  //   var request = new XMLHttpRequest();
  //   request.open("GET", "https://sparticus.xyz/newsscan/index.php?quote=DDD", true);
  //   request.send(null);
  //   request.onreadystatechange = function () {
  //     if (request.readyState === 4 && request.status === 200) {
  //       var type = request.getResponseHeader("Content-Type");
  //       if (type.indexOf("text") !== 1) {
  //         return request.responseText;
  //       }
  //     }
  //   };
  // }
  // var storedText = getText();

  // console.log(
  //   storedText
  // );

  function getNewsData(data, elementID) {
    let dataHTML = `<div class="card-body"><ul class="timeline">`;
      
    for (let i = 0; i < data.length; i++) {
      dataHTML += `<li class="timeline-item">
        <span class="timeline-point timeline-point-warning timeline-point-indicator"></span>
          <div class="timeline-event">
              <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                  <h6 class="headLine">${data[i].headline}</h6>
                  <span class="timeline-event-time">${data[i].date} <br> ${data[i].time} </span>
              </div>
              <p>${data[i].sourceName}</p>
              <div class="media align-items-center">
                  <div class="avatar">
                      <img src="app-assets/images/avatars/12-small.png" alt="avatar" height="38" width="38" />
                  </div>
              </div>
          </div>
      </li>`;
    }

    dataHTML += `</ul></div>`;
    $(elementID).append(dataHTML);
  }

  var isRtl = $("html").attr("data-textdirection") === "rtl",
    chartColors = {
      column: {
        series1: "#826af9",
        series2: "#d2b0ff",
        bg: "#f8d3ff",
      },
      success: {
        shade_100: "#7eefc7",
        shade_200: "#06774f",
      },
      donut: {
        series1: "#ffe700",
        series2: "#00d4bd",
        series3: "#826bf8",
        series4: "#2b9bf4",
        series5: "#FFA1A1",
      },
      area: {
        series3: "#a4f8cd",
        series2: "#60f2ca",
        series1: "#2bdac7",
      },
    };

  // Line charts

  function getLineChartData(data, elementID) {
    var lineChartEl = document.querySelector(elementID),
      lineChartConfig = {
        chart: {
          height: 400,
          type: "line",
          zoom: {
            enabled: false,
          },
          parentHeightOffset: 0,
          toolbar: {
            show: false,
          },
        },
        series: [
          {
            data: [
              280,
              200,
              220,
              180,
              270,
              250,
              70,
              90,
              200,
              150,
              160,
              100,
              150,
              100,
              50,
            ],
          },
        ],
        markers: {
          strokeWidth: 7,
          strokeOpacity: 1,
          strokeColors: [window.colors.solid.white],
          colors: [window.colors.solid.warning],
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        colors: [window.colors.solid.warning],
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: -20,
          },
        },
        tooltip: {
          custom: function (data) {
            return (
              '<div class="px-1 py-50">' +
              "<span>" +
              data.series[data.seriesIndex][data.dataPointIndex] +
              "%</span>" +
              "</div>"
            );
          },
        },
        xaxis: {
          categories: [
            "7/12",
            "8/12",
            "9/12",
            "10/12",
            "11/12",
            "12/12",
            "13/12",
            "14/12",
            "15/12",
            "16/12",
            "17/12",
            "18/12",
            "19/12",
            "20/12",
            "21/12",
          ],
        },
        yaxis: {
          opposite: isRtl,
        },
      };
    if (typeof lineChartEl !== undefined && lineChartEl !== null) {
      var lineChart = new ApexCharts(lineChartEl, lineChartConfig);
      lineChart.render();
    }
  }

  // lineArea charts

  var itemLabel = 0;

  function getLineAreaChartData(data, elementID) {
    let lineObjects = [
      "Revenue",
      "Netincome ",
      "Grossprofitratio",
      "Volume",
      "Relative Vol",
      "Avg Vol",
    ];

    let storedData = {
      storeRevenue: [],
      storeNetincome: [],
      Grossprofitratio: [],
      storeAbsoluteVol: [],
      storeRelativeVol: [],
      storeAverageVol: [],
    };

    for (let i in data) {
      if (elementID == "#revenue_chart") {
        if (data[i]["revenue1QValue"].search("Revenue") !== -1) {
          storedData.storeRevenue.push(data[i]);
        } else if (data[i]["revenue1QValue"].search("Netincome") !== -1) {
          storedData.storeNetincome.push(data[i]);
        } else if (
          data[i]["revenue1QValue"].search("Grossprofitratio") !== -1
        ) {
          storedData.Grossprofitratio.push(data[i]);
        }
      } else if (elementID == "#liquidity_chart") {
        if (data[i]["absoluteVol1DaysValue"].search("Absolute") !== -1) {
          storedData.storeAbsoluteVol.push(data[i]);
        } else if (data[i]["absoluteVol1DaysValue"].search("Relative") !== -1) {
          storedData.storeRelativeVol.push(data[i]);
        } else if (data[i]["absoluteVol1DaysValue"].search("Average") !== -1) {
          storedData.storeAverageVol.push(data[i]);
        }
      }
    }
    console.log(storedData);

    var areaChartEl = document.querySelector(elementID),
      areaChartConfig = {
        chart: {
          height: 400,
          type: "area",
          parentHeightOffset: 0,
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: false,
          curve: "straight",
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "start",
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        colors: [
          chartColors.area.series3,
          chartColors.area.series2,
          chartColors.area.series1,
        ],
        series: [
          {
            name: `${lineObjects[itemLabel++]}`,
            data: [
              100,
              120,
              90,
              170,
              130,
              160,
              140,
              240,
              220,
              180,
              270,
              280,
              375,
            ],
          },
          {
            name: `${lineObjects[itemLabel++]}`,
            data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275],
          },
          {
            name: `${lineObjects[itemLabel++]}`,
            data: [20, 40, 30, 70, 40, 60, 50, 140, 120, 100, 140, 180, 220],
          },
        ],
        xaxis: {
          categories: [
            "7/12",
            "8/12",
            "9/12",
            "10/12",
            "11/12",
            "12/12",
            "13/12",
            "14/12",
            "15/12",
            "16/12",
            "17/12",
            "18/12",
            "19/12",
          ],
        },
        fill: {
          opacity: 1,
          type: "solid",
        },
        tooltip: {
          shared: false,
        },
        yaxis: {
          opposite: isRtl,
        },
      };
    if (typeof areaChartEl !== undefined && areaChartEl !== null) {
      var areaChart = new ApexCharts(areaChartEl, areaChartConfig);
      areaChart.render();
    }
  }

  

  // revenue

  function revenueFunc(data) {
    // save data in local storage
    localStorage.setItem("revenueData", JSON.stringify(data));

    getLineAreaChartData(data.revenue, "#revenue_chart");
    $(".loading-item").removeClass("d-flex").hide();
  }

  function fetchRevenueData() {
    fetch("https://api.sheety.co/27ac9c070347fb610f4bf47546824333/fss/revenue")
      .then((response) => response.json())
      .then((data) => {
        revenueFunc(data);
        console.log("revenue from inside fetch");
      })
      .catch((error) => console.log(error));
  }

  localStorage.getItem("revenueData") == "" ||
  localStorage.getItem("revenueData") == undefined ||
  localStorage.getItem("revenueData") == null
    ? fetchRevenueData()
    : getData("revenueData");

  // liquidity
  function liquidityFunc(data) {
    // save data in local storage
    localStorage.setItem("liquidityData", JSON.stringify(data));
    getLineAreaChartData(data.liquidity, "#liquidity_chart");
    $(".loading-item").removeClass("d-flex").hide();
  }

  function fetchLiquidityData() {
    fetch(
      "https://api.sheety.co/27ac9c070347fb610f4bf47546824333/fss/liquidity"
    )
      .then((response) => response.json())
      .then((data) => {
        liquidityFunc(data);
        console.log("liquidity from inside fetch");
      })
      .catch((error) => console.log(error));
  }

  localStorage.getItem("liquidityData") == "" ||
  localStorage.getItem("liquidityData") == undefined ||
  localStorage.getItem("liquidityData") == null
    ? fetchLiquidityData()
    : getData("liquidityData");

  // price
  function priceFunc(data) {
    // save data in local storage
    localStorage.setItem("priceData", JSON.stringify(data));
    getLineChartData(data.price, "#price_chart");
    $(".loading-item").removeClass("d-flex").hide();
  }

  function fetchPriceData() {
    fetch("https://api.sheety.co/27ac9c070347fb610f4bf47546824333/fss/price")
      .then((response) => response.json())
      .then((data) => {
        priceFunc(data);
        console.log("price from inside fetch");
      })
      .catch((error) => console.log(error));
  }

  localStorage.getItem("priceData") == "" ||
  localStorage.getItem("priceData") == undefined ||
  localStorage.getItem("priceData") == null
    ? fetchPriceData()
    : getData("priceData");



  // News
  function newsFunc(data) {
    // save data in local storage
    localStorage.setItem("newsData", JSON.stringify(data));
    getNewsData(data.news, "#news_cards");
    $(".loading-item").removeClass("d-flex").hide();
  }

  function fetchNewsData() {
    fetch("https://api.sheety.co/27ac9c070347fb610f4bf47546824333/fss/news")
      .then((response) => response.json())
      .then((data) => {
        newsFunc(data);
        // console.log(data);
        console.log("news from inside fetch");
      })
      .catch((error) => console.log(error));
  }

  localStorage.getItem("newsData") == "" ||
  localStorage.getItem("newsData") == undefined ||
  localStorage.getItem("newsData") == null ||
  localStorage.getItem("newsData") == []
    ? fetchNewsData()
    : getData("newsData");



    // get data 
    function getData(obj) {
      console.log(obj + " from inside localStorage");
      var retivedData = JSON.parse(localStorage.getItem(obj));
      if (obj == "newsData") {
        newsFunc(retivedData);
      } else if (obj == "revenueData") {
        revenueFunc(retivedData);
      } else if (obj == "liquidityData") {
        liquidityFunc(retivedData);
      } else if (obj == "priceData") {
        priceFunc(retivedData);
      }
    }
    
});
        
        