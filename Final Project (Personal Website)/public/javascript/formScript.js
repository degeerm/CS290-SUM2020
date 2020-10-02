/*This JavaScript is to be used with the form page.*/

/*Function for adding information to SQL table. To be used below.*/
function addToTable(payload){
  request = new XMLHttpRequest();
  var qstring = "name=" + payload.nameVal +
                "&opinion=" + payload.opinionVal +
                "&longRes=" + payload.longResponse;
  request.open("GET", "/insert-opinion?" + qstring, true);

  /*asynchronous load*/
  request.addEventListener("load", function(){
    if (request.status >= 200 && request.status <400){
      var response = JSON.parse(req.responseText);
      if (response.result = "Sent successfully"){
        return;
      }
    }else{
      console.log("Wuh oh! Error:" + request.statusText);
    }
  });
  request.send("/insert-opinion?" + qstring);
}

/*Adds event listener for form submission*/
document.addEventListener("DOMContentLoaded", buttonBind);

/*Binds the submit button to submit a POST request*/
function buttonBind(){
    document.getElementById("formButton").addEventListener("click", function(){
      /*Opening request to HTTP bin + Initializing payload values with form values*/
      var request = new XMLHttpRequest();
      var name = document.getElementById("name-input").value;
      var opinion = getRadioVal(document.getElementById("surveyForm"),"opinion");
      var longRes = document.getElementById("longRes").value;

      var payload = {nameVal:null,opinionVal:null, longResponse:null};
      payload.nameVal = name;
      payload.opinionVal = opinion;
      payload.longResponse = longRes;

      /*makes sure that the name isn't empty*/
      if (name == ""){
        alert("Please input your name.");
        return;
      }

      /*Calling function that will insert it into MYSQL table*/
      addToTable(payload);

      /*Send request to httpbin to display to screen.*/
      request.open("POST","https://httpbin.org/post");
      request.setRequestHeader("Content-Type", "application/json");

      /*Making it asynchronous*/
      request.addEventListener("load", function(){
        if (request.status >= 200 && request.status <400){
          var response = JSON.parse(request.responseText);
          document.getElementById("thanks").textContent =
          ("Thanks for your participation! You answered:");

          document.getElementById("namePosition").textContent = (response.json.nameVal);
          document.getElementById("longResPosition").textContent = (response.json.longResponse);
          if (response.json.opinionVal == "opinion_great"){
            document.getElementById("opinionPosition").textContent = ("They're pretty rad!");
          }else if(response.json.opinionVal == "opinion_meh"){
            document.getElementById("opinionPosition").textContent = ("They're okay.");
          }else if (response.json.opinionVal == "opinion_bad"){
            document.getElementById("opinionPosition").textContent = ("Not a huge fan.");
          }
        }

	      /*Error Case*/
        else{
          console.log("Oops! Error: " + request.statusText);
        }
      });

      request.send(JSON.stringify(payload));
      event.preventDefault();
  });
}

/*Gets the value of the radio part of the form*/
function getRadioVal(form, name) {
    var radio_vals = form.elements[name];
    var returnVal;
    var len=radio_vals.length;
    for (var i=0; i<len; i++) {
      if ( radio_vals[i].checked ) { 
        returnVal = radio_vals[i].value; 
        break;
      }
    }
    return returnVal; 
}


