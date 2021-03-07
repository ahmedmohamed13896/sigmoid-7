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
      if (i != "exchange" && i != "No" && i != "urls" && i != "MC") {
        properties.push(i);
        dataHTML += `<th>${i}</th>`;
      }
    }

    dataHTML += `</tr>
                    </thead>
                    <tbody>`;

    $.each(data.data, function (key, value) {
      tableBody += `<tr>`;
      for (let i = 0; i < properties.length; i++) {
        if (i != "exchange" && i != "No" && i != "urls" && i != "MC") {
          if (i == 3) {
            value[properties[i]][0] == "-"
              ? (tableBody += `<td class="text-danger" style="background-color:yellow;">${
                  value[properties[i]]
                }</td>`)
              : (tableBody += `<td style="background-color:yellow;">${
                  value[properties[i]]
                }</td>`);
          } else {
            value[properties[i]][0] == "-"
              ? (tableBody += `<td class="text-danger">${
                  value[properties[i]]
                }</td>`)
              : (tableBody += `<td>${value[properties[i]]}</td>`);
          }
        }
      }

      tableBody += `</tr>`;
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
                                  data[data.length - 1].ticker
                                }</h6>
                                <h2 class="font-weight-bolder mb-1 text-center ${className}">${
                                  data[data.length - 1].volume
                                }%</h2>             
                                <div id="card${cardNumber}"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 my-2">
                        <div class="card card-tiny-line-stats">
                            <div class="card-body pb-50">
                                <h6 class="ticker text-center">${
                                  data[data.length - 2].ticker
                                }</h6>
                                <h2 class="font-weight-bolder mb-1 text-center ${className}">${
                                  data[data.length - 2].volume
                                }%</h2>
                                <div id="card${cardNumber + 1}"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-12 col-12 my-2">
                        <div class="card card-tiny-line-stats">
                            <div class="card-body pb-50">
                                <h6 class="ticker text-center">${
                                  data[data.length - 3].ticker
                                }</h6>
                                <h2 class="font-weight-bolder mb-1 text-center ${className}">${
                                  data[data.length - 3].volume
                                }%</h2>
                                <div id="card${cardNumber + 2}"></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>`;

    $(cardsID).append(html);
  }



  
  function createAllCharts(status, properties, items) {
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

    function createChart(trackBgColor, chartId, chartOptions, statisticsChartName, items) {
      
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
        statisticsProfitChart,
        items
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



  // Momentum Builders 3D winners



  function _3dWinnersFunc (data){
    // save data in local storage
    sessionStorage.setItem("3dWinnersData", JSON.stringify(data));

    // Create Table from Json
    $(".loading-item").removeClass("d-flex").hide();

    var properties = getJsonData(data, "#3DWinners");

    let items = data.data.slice();

    function sortByProperty(property) {
      return function (a, b) {
        if (parseInt(a[property]) > parseInt(b[property])) return 1;
        else if (parseInt(a[property]) < parseInt(b[property])) return -1;
        return 0;
      };
    }

    items.sort(sortByProperty("volume"));
    // items.reverse(sortByProperty("volume"));
    // console.log(items);

    displayCards(items, "#winners_cards", 1, "text-center");
    createAllCharts("winner", properties);
  }

  function fetch3dWinnersData() {
    fetch("https://api.apispreadsheets.com/data/8620/")
      .then((response) => response.json())
      .then((data) => {
        _3dWinnersFunc(data);
         console.log("3D winners from inside fetch");
      });
  }


  function getData(obj) {
    console.log(obj + " from inside sessionStorage");
    var retivedData = JSON.parse(sessionStorage.getItem(obj));
    if (obj == "3dWinnersData") {
      _3dWinnersFunc(retivedData);
    } else if (obj == "3dLosersData") {
      _3dLosersFunc(retivedData);
    }
  }

  sessionStorage.getItem("3dWinnersData") == "" ||
  sessionStorage.getItem("3dWinnersData") == undefined ||
  sessionStorage.getItem("3dWinnersData") == null
    ? fetch3dWinnersData()
    : getData("3dWinnersData");


    // 3D losers

    function _3dLosersFunc (data){
      // save data in local storage
      sessionStorage.setItem("3dLosersData", JSON.stringify(data));
      // Create Table from Json
      $(".loading-item").removeClass("d-flex").hide();

      function sortByProperty(property) {
        return function (a, b) {
          if (parseInt(a[property]) > parseInt(b[property])) return 1;
          else if (parseInt(a[property]) < parseInt(b[property])) return -1;
          return 0;
        };
      }

      var properties = getJsonData(data, "#3DLosers");
      // get best 3 cards
      let items = data.data.slice();
      items.sort(sortByProperty("volume"));
      // items.reverse();
      // console.log(items);

      displayCards(items, "#losers_cards", 4, "text-danger");
      createAllCharts("loser", properties);
    }



  // Momentum Builders 3D Losers


  function fetch3dLosersData(){
    fetch("https://api.apispreadsheets.com/data/8617/")
      .then((response) => response.json())
      .then((data) => {
        
        _3dLosersFunc(data);
        console.log("3d losers from inside fetch");

      });
  }


  sessionStorage.getItem("3dLosersData") == "" ||
  sessionStorage.getItem("3dLosersData") == undefined ||
  sessionStorage.getItem("3dLosersData") == null
    ? fetch3dLosersData()
    : getData("3dLosersData");
});
