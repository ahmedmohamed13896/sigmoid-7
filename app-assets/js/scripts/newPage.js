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

jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
  }
});





 function getJsonData(data, elementID) {
   let properties = [];
   let tableBody = "";

   let dataHTML = `
                    <thead>
                        <tr>`;

   // store data properties
   for (let i in data[0]) {
     properties.push(i);
     dataHTML += `<th>${i}</th>`;
   }

   dataHTML += `</tr>
                    </thead>
                    <tbody>`;

   $.each(data, function (key, value) {
     tableBody += `
                        <tr>`;
     for (let i = 0; i < properties.length; i++) {
         if (value[properties[i]]) {
           tableBody += `<td>${value[properties[i]]}</td>`;
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








 fetch("https://sparticus.xyz/newsscan/index.php?quote=DDD")
   .then((response) => response.json())
   .then((data) => {

     $(".loading-item").removeClass("d-flex").hide();

     var prop = getJsonData(data, "#newsTable");
   });



});
        
        