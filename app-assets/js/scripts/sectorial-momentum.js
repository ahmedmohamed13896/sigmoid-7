$(window).on('load', function() {
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
    for (let i in data.sectorPerformance[0]) {
      if (
        i != "No." &&
        i != "no" &&
        i != "Industry" &&
        i != "Country" &&
        i != "P/E" &&
        i != "Id" &&
        i != "id" &&
        i != "perfHalf" &&
        i != "perfYear" &&
        i != "perfYtd" &&
        i != "avgVolume" &&
        i != "recom"
      ) {
        properties.push(i);
        dataHTML += `<th>${i}</th>`;
      }
    }

    dataHTML += `</tr>
                    </thead>
                    <tbody>`;

    $.each(data.sectorPerformance, function (key, value) {
      tableBody += `
                        <tr>`;
      for (let i = 0; i < properties.length; i++) {
        if (
          i != "No." &&
          i != "no" &&
          i != "Industry" &&
          i != "Country" &&
          i != "P/E" &&
          i != "Id" &&
          i != "id" &&
          i != "perfHalf" &&
          i != "perfYear" &&
          i != "perfYtd" &&
          i != "avgVolume" &&
          i != "recom"
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

    return properties;
  }

  // display cards

  function displayCards(data, cardsID, cardNumber, className) {
    let html = `<div class="card-body statistics-body" >
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 my-2">
                        <div class="card card-tiny-line-stats">
                            <div class="card-body pb-50">
                                <h6 class="ticker text-center">${
                                  data[data.length - 1].name
                                }</h6>
                                <h2 class="font-weight-bolder mb-1 text-center ${className}">${
      data[data.length - 1].change
    }</h2>
                                <div class="d-flex justify-content-end">
                                    <div class="vol ">Volume: <span>${
                                      data[data.length - 1].volume
                                    }</span></div>
                                    
                                </div>
                                <div id="card${cardNumber}"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 my-2">
                        <div class="card card-tiny-line-stats">
                            <div class="card-body pb-50">
                                <h6 class="ticker text-center">${
                                  data[data.length - 2].name
                                }</h6>
                                <h2 class="font-weight-bolder mb-1 text-center ${className}">${
      data[data.length - 2].change
    }</h2>
                                <div class="d-flex justify-content-end">
                                    <div class="vol ">Volume: <span>${
                                      data[data.length - 2].volume
                                    }</span></div>
                                   
                                </div>
                                <div id="card${cardNumber + 1}"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-12 col-12 my-2">
                        <div class="card card-tiny-line-stats">
                            <div class="card-body pb-50">
                                <h6 class="ticker text-center">${
                                  data[data.length - 3].name
                                }</h6>
                                <h2 class="font-weight-bolder mb-1 text-center ${className}">${
      data[data.length - 3].change
    }</h2>
                                <div class="d-flex justify-content-end">
                                    <div class="vol ">Volume: <span>${
                                      data[data.length - 3].volume
                                    }</span></div>
                                </div>
                                <div id="card${cardNumber + 2}"></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>`;

    $(cardsID).append(html);
  }

  function createAllCharts(status) {
    // Charts

    var $trackBgColor = "#EBEBEB";
    if (status == "winner") {
      var $card1 = document.querySelector("#card1");
      var $card2 = document.querySelector("#card2");
      var $card3 = document.querySelector("#card3");
    } else if (status == "loser") {
      var $card4 = document.querySelector("#card4");
      var $card5 = document.querySelector("#card5");
      var $card6 = document.querySelector("#card6");
    }

    var statisticsProfitChartOptions;
    var statisticsProfitChart;

    function createChart(
      trackBgColor,
      chartId,
      chartOptions,
      statisticsChartName
    ) {
      chartOptions = {
        chart: {
          height: 70,
          type: "line",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        grid: {
          borderColor: trackBgColor,
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
          padding: {
            top: -30,
            bottom: -10,
          },
        },
        stroke: {
          width: 3,
        },
        colors: [window.colors.solid.info],
        series: [
          {
            data: [0, 20, 5, 30, 15, 45],
          },
        ],
        markers: {
          size: 2,
          colors: window.colors.solid.info,
          strokeColors: window.colors.solid.info,
          strokeWidth: 2,
          strokeOpacity: 1,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [
            {
              seriesIndex: 0,
              dataPointIndex: 5,
              fillColor: "#ffffff",
              strokeColor: window.colors.solid.info,
              size: 5,
            },
          ],
          shape: "circle",
          radius: 2,
          hover: {
            size: 3,
          },
        },
        xaxis: {
          labels: {
            show: true,
            style: {
              fontSize: "0px",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        tooltip: {
          x: {
            show: false,
          },
        },
      };
      statisticsChartName = new ApexCharts(chartId, chartOptions);
      statisticsChartName.render();
    }

    if (status == "winner") {
      // create chart 1
      createChart(
        $trackBgColor,
        $card1,
        statisticsProfitChartOptions,
        statisticsProfitChart
      );
      // create chart 2
      createChart(
        $trackBgColor,
        $card2,
        statisticsProfitChartOptions,
        statisticsProfitChart
      );
      // create chart 3
      createChart(
        $trackBgColor,
        $card3,
        statisticsProfitChartOptions,
        statisticsProfitChart
      );
    } else if (status == "loser") {
      // create chart 4
      createChart(
        $trackBgColor,
        $card4,
        statisticsProfitChartOptions,
        statisticsProfitChart
      );
      // create chart 5
      createChart(
        $trackBgColor,
        $card5,
        statisticsProfitChartOptions,
        statisticsProfitChart
      );
      // create chart 6
      createChart(
        $trackBgColor,
        $card6,
        statisticsProfitChartOptions,
        statisticsProfitChart
      );
    }
  }

  // get data from the json link

  // sectorPerformance


  function sectorPerformanceFunc(data){
    // save data in local storage
    sessionStorage.setItem("sectorPerformanceData", JSON.stringify(data));


    // Create Table from Json
    var status = "winner";
    $(".loading-item").removeClass("d-flex").hide();

    getJsonData(data, "#sectorPerformance");
    // console.log(prop);

    var items = data.sectorPerformance.slice();
    // console.log(items);
    function sortByProperty(property) {
      return function (a, b) {
        if (parseInt(a[property]) > parseInt(b[property])) return 1;
        else if (parseInt(a[property]) < parseInt(b[property])) return -1;
        return 0;
      };
    }
    items.sort(sortByProperty("change"));
    items.reverse(sortByProperty("change"));

    displayCards(items, "#sectorPerformance_cards", 1, "text-center");
    createAllCharts(status);
  };


  function fetchSectorPerformanceData() {
    fetch(
      "https://api.sheety.co/27ac9c070347fb610f4bf47546824333/fss/sectorPerformance"
    )
      .then((response) => response.json())
      .then((data) => {
        sectorPerformanceFunc(data);
        console.log("winners from inside fetch");
      });
  }

 




    function getData(obj) {
      console.log(obj + " from inside sessionStorage");
      var retivedData = JSON.parse(sessionStorage.getItem(obj));
        sectorPerformanceFunc(retivedData);
    }

    sessionStorage.getItem("sectorPerformanceData") == "" ||
    sessionStorage.getItem("sectorPerformanceData") == undefined ||
    sessionStorage.getItem("sectorPerformanceData") == null
      ? fetchSectorPerformanceData()
      : getData("sectorPerformanceData");

})
        
        