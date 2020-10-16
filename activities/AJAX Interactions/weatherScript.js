var apiKey; /*insert api key for open weather map*/

document.addEventListener("DOMContentLoaded", buttonBind);

function buttonBind(){
  console.log("Button clicked.");
  /*Listener for click of button*/
  document.getElementById("infoSubmit").addEventListener("click", function(event){
    
    /*Creating Request, getting all info from form*/
    var request = new XMLHttpRequest();
    var city_name = document.getElementById("city_name").value;
    var zip_code = document.getElementById("zip_code").value;
    var country_code = document.getElementById("country_code").value;
    var payload;

    /*Testing to see if zipcode can be used*/
    if (zip_code != ""){
      /*Opening request with zip code info*/
      payload = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip_code +
      "," + country_code + "&appid=" + apiKey;
    }
    
    /*checks to see if city name can be used*/
    else if (city_name != ""){
      payload = "https://api.openweathermap.org/data/2.5/weather?q="+city_name + "," +
      country_code + "&appid=" + apiKey;
    }

      /*Opening request with zip code info*/
      request.open("GET", payload, true);

      /*Asynchronous: When request is loaded, do following function() with it*/
      request.addEventListener("load", function(){
        
        /*check to make sure it's not an error*/
        if (request.status >= 200 && request.status < 400){
          var response = JSON.parse(request.responseText);
          document.getElementById("returnedName").textContent = response.name;
          document.getElementById("returnedTemp").textContent = response.main.temp;
          document.getElementById("returnedHum").textContent = response.main.humidity;
          
        /*Display error if things went wrong*/
        }else{
          console.log("Oops! Error: " + request.statusText);
        }
      });
      /*Done BEFORE previous event listener*/
      request.send();
      event.preventDefault();
  });
}
