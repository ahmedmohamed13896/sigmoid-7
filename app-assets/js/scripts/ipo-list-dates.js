$(window).on('load', function() {
            if (feather) {
                feather.replace({
                    width: 14,
                    height: 14
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
                for (let i in data.usIpOs[0]) {
                  if (
                    i != "id" &&
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




                $.each(data.usIpOs, function (key, value) {
                  tableBody += `
                        <tr>`;
                  for (let i = 0; i < properties.length; i++) {
                    if (
                      i != "id"&&
                      i != "No." &&
                      i != "No" &&
                      i != "Industry" &&
                      i != "Country" &&
                      i != "P/E" &&
                      i != "Id"
                    ) {
                      if (value[properties[i]][0] == "-") {
                        tableBody += `<td class="text-danger">${
                          value[properties[i]]
                        }</td>`;
                      } else if (value[properties[i]] == "") {
                        tableBody += `<td>${numberWithCommas(
                          value[properties[i]]
                        )}</td>`;
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

            function displayCards(data, cardsID) {
        

            let html = `
            <div class="card-body statistics-body" >
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12 col-12 my-2">
                        <div class="card card-profile">
                            <img src="app-assets/images/banner/banner-12.jpg" class="img-fluid card-img-top" alt="Profile Cover Photo">
                            <div class="card-body">
                                <div class="profile-image-wrapper">
                                    <div class="profile-image">
                                        <div class="avatar">
                                            <img src="app-assets/images/portrait/small/avatar-s-9.jpg" alt="Profile Picture">
                                        </div>
                                    </div>
                                </div>
                                <h3>${data[data.length - 1].name}</h3>
                                <h6 class="text-muted">${
                                  data[data.length - 1].symbol
                                }</h6>
                                <div class="badge badge-light-primary profile-badge">${
                                  data[data.length - 1]["ipoDate*"]
                                }</div>
                                <hr class="mb-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="card-data">
                                        <h6 class="text-muted font-weight-bolder">exchange</h6>
                                        <h3 class="mb-0">${
                                          data[data.length - 1].exchange
                                        }</h3>
                                    </div>
                                   <div class="card-data">
                                        <h6 class="text-muted font-weight-bolder">priceRange</h6>
                                        <h3 class="mb-0">${
                                          data[data.length - 1].priceRange
                                        }</h3>
                                    </div>
                                   <div class="card-data">
                                        <h6 class="text-muted font-weight-bolder">shares</h6>
                                        <h3 class="mb-0">${
                                          data[data.length - 1].shares
                                        }</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>



                     <div class="col-lg-4 col-md-6 col-sm-12 col-12 my-2">
                        <div class="card card-profile">
                            <img src="app-assets/images/banner/banner-12.jpg" class="img-fluid card-img-top" alt="Profile Cover Photo">
                            <div class="card-body">
                                <div class="profile-image-wrapper">
                                    <div class="profile-image">
                                        <div class="avatar">
                                            <img src="app-assets/images/portrait/small/avatar-s-9.jpg" alt="Profile Picture">
                                        </div>
                                    </div>
                                </div>
                                <h3>${data[data.length - 2].name}</h3>
                                <h6 class="text-muted">${
                                  data[data.length - 2].symbol
                                }</h6>
                                <div class="badge badge-light-primary profile-badge">${
                                  data[data.length - 2]["ipoDate*"]
                                }</div>
                                <hr class="mb-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="card-data">
                                        <h6 class="text-muted font-weight-bolder">exchange</h6>
                                        <h3 class="mb-0">${
                                          data[data.length - 2].exchange
                                        }</h3>
                                    </div>
                                    <div class="card-data">
                                        <h6 class="text-muted font-weight-bolder">priceRange</h6>
                                        <h3 class="mb-0">${
                                          data[data.length - 2].priceRange
                                        }</h3>
                                    </div>
                                    <div class="card-data">
                                        <h6 class="text-muted font-weight-bolder">shares</h6>
                                        <h3 class="mb-0">${
                                          data[data.length - 2].shares
                                        }</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div class="col-lg-4 col-md-12 col-sm-12 col-12 my-2">
                        <div class="card card-profile">
                            <img src="app-assets/images/banner/banner-12.jpg" class="img-fluid card-img-top" alt="Profile Cover Photo">
                            <div class="card-body">
                                <div class="profile-image-wrapper">
                                    <div class="profile-image">
                                        <div class="avatar">
                                            <img src="app-assets/images/portrait/small/avatar-s-9.jpg" alt="Profile Picture">
                                        </div>
                                    </div>
                                </div>
                                <h3>${data[data.length - 3].name}</h3>
                                <h6 class="text-muted">${
                                  data[data.length - 3].symbol
                                }</h6>
                                <div class="badge badge-light-primary profile-badge">${
                                  data[data.length - 3]["ipoDate*"]
                                }</div>
                                <hr class="mb-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="card-data">
                                        <h6 class="text-muted font-weight-bolder">exchange</h6>
                                        <h3 class="mb-0">${
                                          data[data.length - 3].exchange
                                        }</h3>
                                    </div>
                                    <div class="card-data">
                                        <h6 class="text-muted font-weight-bolder">priceRange</h6>
                                        <h3 class="mb-0">${
                                          data[data.length - 3].priceRange
                                        }</h3>
                                    </div>
                                    <div class="card-data">
                                        <h6 class="text-muted font-weight-bolder">shares</h6>
                                        <h3 class="mb-0">${
                                          data[data.length - 3].shares
                                        }</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>

                </div>
            </div>
               
            `;

                $(cardsID).append(html);
            }





            // get data from the json link 


            // Daily Winners 

            fetch("https://api.sheety.co/29d581fe29aafb1741ba848aa79f529e/fullSpectrumScreener/usIpOs")
              .then((response) => response.json())
              .then((data) => {
                // Create Table from Json
                var status = "winner";
                var prop = getJsonData(data, "#dailyWinners");
                // console.log(prop);
                // get best 3 cards

                var items = data.usIpOs.slice();
                console.log(items);
                function sortByProperty(property) {
                  return function (a, b) {
                    if (parseInt(a[property]) > parseInt(b[property])) return 1;
                    else if (parseInt(a[property]) < parseInt(b[property]))
                      return -1;
                    return 0;
                  };
                }
                items.sort(sortByProperty("shares"));

                $(".loading-item").removeClass("d-flex").hide();
                displayCards(items, "#winners_cards");
              });


            // Daily Losers
            // fetch('https://api.apispreadsheets.com/data/8602/')
            //     .then(response => response.json())
            //     .then(data => {
            //       // Create Table from Json
            //       var status = "loser";

            //       getJsonData(data, "#dailyLosers");
            //       // get best 3 cards
            //       var items = data.data.slice();
            //       function sortByProperty(property) {
            //         return function (a, b) {
            //           if (parseInt(a[property]) > parseInt(b[property])) {
            //             return 1;
            //           } else if (
            //             parseInt(a[property]) < parseInt(b[property])
            //           ) {
            //             return -1;
            //           }
            //           return 0;
            //         };
            //       }
            //       items.sort(sortByProperty("Change"));
            //       items.reverse(sortByProperty("Change"));
            //       displayCards(items, "#losers_cards", 4, "text-danger");
            //       createAllCharts(status);
            //     });



        })
        
        