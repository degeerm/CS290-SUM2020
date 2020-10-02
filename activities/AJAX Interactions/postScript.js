/*create the event listener for the button press*/
document.getElementById("buttonSubmit").addEventListener("click", function(event){
	
	/*creating a new request, setting values from document*/
	var request = new XMLHttpRequest();
	var payload = {fieldOne:null, fieldTwo:null, fieldThree:null};
	payload.fieldOne = document.getElementById("field_one").value;
	payload.fieldTwo = document.getElementById("field_two").value;
	payload.fieldThree = document.getElementById("field_three").value;
	request.open("POST", "http://httpbin.org/post", true);
	request.setRequestHeader("Content-Type", "application/json");
	
	/*Asynchronous: Event is loading, when it loads (info received),
	parse info and set text content of div elements to info*/ 
	request.addEventListener("load", function(){
		
		/*making sure status is not an error, since generally between 200
		and 400 are okay statuses. Took this line from the lectures, specifically
		Week 4, Javascript and HTTP, Asynchronous Requests*/
		if (request.status >= 200 && request.status < 400){
			var response = JSON.parse(request.responseText);
			document.getElementById("result_one").textContent = response.json.fieldOne;
			document.getElementById("result_two").textContent = response.json.fieldTwo;
			document.getElementById("result_three").textContent = response.json.fieldThree;
		
		/*if there's an error, display the message*/
		}else{
			console.log("Oops! Error: " + request.statusText);
		}
	});
	
	/*actually happens BEFORE previous bit, sending in the info*/
	request.send(JSON.stringify(payload));
	
	/*prevent page from refreshing when user submits*/
	event.preventDefault();
});