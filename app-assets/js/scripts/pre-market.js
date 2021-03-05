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

  function getJsonData(data, elementID, dataType) {
    let properties = [];
    let tableBody = "";

    let dataHTML = `
                    <thead>
                        <tr>`;

    // store data properties
    for (let i in data[dataType][0]) {
      if (
        i != "id" &&
        i != "No." &&
        i != "No" &&
        i != "Industry" &&
        i != "Country" &&
        i != "P/E" &&
        i != "Id" &&
        i != "chg %"
      ) {
        properties.push(i);
        dataHTML += `<th>${i}</th>`;
      }
    }

    dataHTML += `</tr>
                    </thead>
                    <tbody>`;

    $.each(data[dataType], function (key, value) {
      tableBody += `
                        <tr>`;
      for (let i = 0; i < properties.length; i++) {
        if (
          i != "id" &&
          i != "No." &&
          i != "No" &&
          i != "Industry" &&
          i != "Country" &&
          i != "P/E" &&
          i != "Id" &&
          i != "chg %"
        ) {
          if (value[properties[i]]) {
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
                    <div class="col-xl-6 col-md col-12 my-2">
                        <div class="card card-tiny-line-stats">
                            <div class="card-body pb-50">
                                <h6 class="ticker text-center">${
                                  data[data.length - 1].companyName
                                }</h6>
                                <h2 class="font-weight-bolder mb-1 text-center ${className}">${
      className == "text-center"
        ? data[data.length - 1]["premarketAdjusted"]
        : className == "text-danger"
        ? data[data.length - 1]["premarketAdjusted"] + "%"
        : className == "text-center act"
        ? data[data.length - 1]["premarketChangeAdjusted"] + "%"
        : data[data.length - 1]["premarketAdjusted"]
    }</h2>
                                <div class="d-flex justify-content-between">
                                    <div class="vol ">Vol: <span>${
                                      data[data.length - 1].volume
                                    }</span></div>
                                    <div class="price ">Price: <span>${
                                      data[data.length - 1].price
                                    }</span></div>
                                </div>
                                <div id="card${cardNumber}"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-6 col-md col-12 my-2">
                        <div class="card card-tiny-line-stats">
                            <div class="card-body pb-50">
                                <h6 class="ticker text-center">${
                                  data[data.length - 2].companyName
                                }</h6>
                                <h2 class="font-weight-bolder mb-1 text-center ${className}">${
      className == "text-center"
        ? data[data.length - 2]["premarketAdjusted"]
        : className == "text-danger"
        ? data[data.length - 2]["premarketAdjusted"] + "%"
        : className == "text-center act"
        ? data[data.length - 2]["premarketChangeAdjusted"] + "%"
        : data[data.length - 2]["premarketAdjusted"]
    }</h2>
                                <div class="d-flex justify-content-between">
                                    <div class="vol ">Vol: <span>${
                                      data[data.length - 2].volume
                                    }</span></div>
                                    <div class="price ">Price: <span>${
                                      data[data.length - 2].price
                                    }</span></div>
                                </div>
                                <div id="card${cardNumber + 1}"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-6 col-md col-12  my-2">
                        <div class="card card-tiny-line-stats">
                            <div class="card-body pb-50">
                                <h6 class="ticker text-center">${
                                  data[data.length - 3].companyName
                                }</h6>
                                <h2 class="font-weight-bolder mb-1 text-center ${className}">${
      className == "text-center"
        ? data[data.length - 3]["premarketAdjusted"]
        : className == "text-danger"
        ? data[data.length - 3]["premarketAdjusted"] + "%"
        : className == "text-center act"
        ? data[data.length - 3]["premarketChangeAdjusted"] + "%"
        : data[data.length - 3]["premarketAdjusted"]
    }</h2>
                                <div class="d-flex justify-content-between">
                                    <div class="vol ">Vol: <span>${
                                      data[data.length - 3].volume
                                    }</span></div>
                                    <div class="price ">Price: <span>${
                                      data[data.length - 3].price
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
    } else if (status == "active") {
      var $card7 = document.querySelector("#card7");
      var $card8 = document.querySelector("#card8");
      var $card9 = document.querySelector("#card9");
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
    } else if (status == "active") {
      // create chart 7
      createChart(
        $trackBgColor,
        $card7,
        statisticsProfitChartOptions,
        statisticsProfitChart
      );
      // create chart 8
      createChart(
        $trackBgColor,
        $card8,
        statisticsProfitChartOptions,
        statisticsProfitChart
      );
      // create chart 9
      createChart(
        $trackBgColor,
        $card9,
        statisticsProfitChartOptions,
        statisticsProfitChart
      );
    }
  }

  // get data from the json link

  //preMarketGainers

   function preMarketGainersFunc(data) {
     // save data in local storage
     localStorage.setItem("preMarketGainersData", JSON.stringify(data));

     // Create Table from Json
     var status = "winner";
     $(".loading-item").removeClass("d-flex").hide();

     var prop = getJsonData(data, "#preMarketGainers", "preMarketGainers");
     // console.log(prop);
     // get best 3 cards

     var items = data["preMarketGainers"].slice();
     function sortByProperty(property) {
       return function (a, b) {
         if (parseFloat(a[property]) > parseFloat(b[property])) return 1;
         else if (parseFloat(a[property]) < parseFloat(b[property])) return -1;
         return 0;
       };
     }
     items.sort(sortByProperty("premarketAdjusted"));
     // items.reverse(sortByProperty("premarketAdjusted"));


     displayCards(items, "#preMarketGainers_cards", 1, "text-center");
     createAllCharts(status);

   }

   function fetchPreMarketGainersData(){
     
         fetch(
           "https://api.sheety.co/27ac9c070347fb610f4bf47546824333/fss/preMarketGainers"
         )
         .then((response) => response.json())
         .then((data) => {
           preMarketGainersFunc(data); 
           console.log("preMarketGainers from inside fetch");
     
         });
   }

    function getData(obj) {
      console.log(obj + " from inside localStorage");
      var retivedData = JSON.parse(localStorage.getItem(obj));
      if (obj == "preMarketGainersData") {
        preMarketGainersFunc(retivedData);
      } else if (obj == "preMarketLaggardsData") {
        preMarketLaggardsFunc(retivedData);
      } else if (obj == "preMarketMostActiveData") {
        preMarketMostActiveFunc(retivedData);
      }
    }


     localStorage.getItem("preMarketGainersData") == "" ||
     localStorage.getItem("preMarketGainersData") == undefined ||
     localStorage.getItem("preMarketGainersData") == null
       ? fetchPreMarketGainersData()
       : getData("preMarketGainersData");




  // preMarketLaggards

    function preMarketLaggardsFunc (data){
      // save data in local storage
      localStorage.setItem("preMarketLaggardsData", JSON.stringify(data));

      // Create Table from Json
      var status = "loser";
      $(".loading-item").removeClass("d-flex").hide();

      var prop = getJsonData(data, "#preMarketLaggards", "preMarketLaggards");
      // console.log(prop);
      // get best 3 cards

      var items = data["preMarketLaggards"].slice();
      
      function sortByProperty(property) {
        return function (a, b) {
          if (parseFloat(a[property]) > parseFloat(b[property])) return 1;
          else if (parseFloat(a[property]) < parseFloat(b[property])) return -1;
          return 0;
        };
      }
      items.sort(sortByProperty("premarketAdjusted"));
      items.reverse(sortByProperty("premarketAdjusted"));

      displayCards(items, "#preMarketLaggards_cards", 4, "text-danger");
      createAllCharts(status);
    }



    function fetchPreMarketLaggardsData(){
      fetch(
        "https://api.sheety.co/27ac9c070347fb610f4bf47546824333/fss/preMarketLaggards"
      )
      .then((response) => response.json())
      .then((data) => {
        preMarketLaggardsFunc(data);
        console.log("preMarketLaggards from inside fetch");
      });
    }

     localStorage.getItem("preMarketLaggardsData") == "" ||
     localStorage.getItem("preMarketLaggardsData") == undefined ||
     localStorage.getItem("preMarketLaggardsData") == null
       ? fetchPreMarketLaggardsData()
       : getData("preMarketLaggardsData");







  // preMarketMostActive

    function preMarketMostActiveFunc (data){
      // save data in local storage
      localStorage.setItem("preMarketMostActiveData", JSON.stringify(data));

      // Create Table from Json
      var status = "active";
      $(".loading-item").removeClass("d-flex").hide();

      var prop = getJsonData(
        data,
        "#preMarketMostActive",
        "preMarketMostActive"
      );
      // console.log(prop);
      // get best 3 cards

      var items = data["preMarketMostActive"].slice();
      
      function sortByProperty(property) {
        return function (a, b) {
          if (parseFloat(a[property]) > parseFloat(b[property])) return 1;
          else if (parseFloat(a[property]) < parseFloat(b[property])) return -1;
          return 0;
        };
      }
      items.sort(sortByProperty("premarketChangeAdjusted"));
      //   items.reverse(sortByProperty("premarketAdjusted"));

      

      displayCards(items, "#preMarketMostActive_cards", 7, "text-center act");
      createAllCharts(status);
    }



     function fetchPreMarketMostActiveData(){
       fetch(
         "https://api.sheety.co/27ac9c070347fb610f4bf47546824333/fss/preMarketMostActive"
       )
         .then((response) => response.json())
         .then((data) => {
             preMarketMostActiveFunc(data);
             console.log("preMarketMostActive from inside fetch");
         });
     }

       localStorage.getItem("preMarketMostActiveData") == "" ||
       localStorage.getItem("preMarketMostActiveData") == undefined ||
       localStorage.getItem("preMarketMostActiveData") == null
         ? fetchPreMarketMostActiveData()
         : getData("preMarketMostActiveData");


})
        
        