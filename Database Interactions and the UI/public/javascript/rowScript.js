/*Function for deleting an item*/
function deleteExercise(tableId, id){
  /*Physically deleting it from table*/

  /*Get table information*/
  var table = document.getElementById(tableId);
  var numRows = table.rows.length;

  /*cycle until remove-id is found*/
	for(var i = 1; i < numRows; i++){
		var exercise = table.rows[i];
		var allData = exercise.getElementsByTagName("td");
		var idCell = allData[allData.length -2];
		
		if(idCell.children[1].id === ("remove-"+id)){
			table.deleteRow(i);
	  	numRows--;
		  break;
		}
	}

  /*call route handler to remove it from MYSQL database*/
  var req = new XMLHttpRequest();
	req.open("GET", "/delete-workout?id="+id, false);
	
	req.send("/delete-workout?id="+id);
};	

/*Makes a delete button for a row*/
function makeDeleteButton(id){
  /*Button for User*/
  var deleteInput = document.createElement('input');
  var deleteCol = document.createElement('td');
  deleteInput.setAttribute('name','delete');
  deleteInput.setAttribute('value','Delete');
  deleteInput.setAttribute('type','button');
  deleteInput.setAttribute('onClick', 'deleteExercise("dataTable",' + id + ')');

  /*hidden input to store ID*/
  var deleteHidden = document.createElement('input');
  deleteHidden.setAttribute('type','hidden');

  /*Can't just do ID; page requires refresh without the remove-*/
  deleteHidden.setAttribute('id', 'remove-'+id);

  deleteCol.appendChild(deleteInput);
  deleteCol.appendChild(deleteHidden);
  return deleteCol;
}

/*Makes an update button for a row*/
function makeUpdateButton(id){
  var updateCol = document.createElement('td');
  var updateLink = document.createElement('a');
  updateLink.setAttribute('href','/?id='+id);

  var updateInput = document.createElement('input');
  updateInput.setAttribute('value','Update');
  updateInput.setAttribute('type','button');
  updateLink.appendChild(updateInput);
  updateCol.appendChild(updateLink);
  return updateCol;
}
	
/*Function for adding new item from form*/
function addNew(){
	var req = new XMLHttpRequest();
  var newExercise = document.getElementById("inputNew");
  var measurement;

  if (newExercise.elements.name.value == ""){
    alert ("Error: Name is required.");
    return;
  }

	/*Formatting measurement*/
	if(newExercise.elements.measurement.checked){
		measurement ="1";
	}
	else{
		measurement = "0";
	}

	/*Open Request- add stuff to MySQL table*/
	req.open("GET", "/insert?name="+newExercise.elements.name.value+
					"&reps="+newExercise.elements.reps.value+
					"&weight="+newExercise.elements.weight.value+
					"&date="+newExercise.elements.date.value + 
					"&measurement="+measurement, true);

  /*physically add stuff to HTML table for user. Does not add to
  table visible to user unless MYSQL operation was successful.*/
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			var table = document.getElementById("dataTable");
			
			/*Create new row*/
			var newRow = document.createElement('tr');
			table.appendChild(newRow);

			/*Name cell*/
			var nameCol = document.createElement('td');
			nameCol.textContent = newExercise.elements.name.value;
			newRow.appendChild(nameCol);

			/*Rep Cell*/
			var repCol = document.createElement('td');
			repCol.textContent = newExercise.elements.reps.value || "0";
			newRow.appendChild(repCol);

			/*weight cell*/
			var weightCol = document.createElement('td');
			weightCol.textContent = newExercise.elements.weight.value || "0";
			newRow.appendChild(weightCol);

			/*checking what unit it is*/
     		 var measurementCol = document.createElement('td');
      
			if(newExercise.elements.measurement.checked){
				measurementCol.textContent = "lbs";
			}else{
				measurementCol.textContent = "kg";
			}
			newRow.appendChild(measurementCol);

			/*date cell*/
			var dateCol = document.createElement('td');
      var date;

      /*Changes the date value to MM-DD-YYYY if date exists*/
      if (newExercise.elements.date.value){
        date = newExercise.elements.date.value
        date = date.toString();
        var datearray = date.split("-");
        date = datearray[1] + '/' + datearray[2] + '/' + datearray[0];
    
      /*Change the date value to None if no date exists.*/
      }else{
        date = "None";
      }
      dateCol.textContent = date;
			newRow.appendChild(dateCol);
			
			var id = response.insertId;
			
			/*Creating a Delete Button*/
			var deleteCol = makeDeleteButton(id);
			newRow.appendChild(deleteCol);
			
			/*Creating an update button*/
      var updateCol = makeUpdateButton(id);
			newRow.appendChild(updateCol);
    }else{
	    console.log("Wuh oh! Error: " + req.statusText);
    }  
	});
  
	/*Sending Request*/
	req.send("/insert?name="+newExercise.elements.name.value+
	"&reps="+newExercise.elements.reps.value+
	"&weight="+newExercise.elements.weight.value+
	"&date="+newExercise.elements.date.value + 
	"&measurement="+measurement);
	event.preventDefault();
}

module.exports = {
  /*Adds a new exercise if it comes in via a POST request*/
  addNewPost(newExercise){
    /*Making the request*/
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var req = new XMLHttpRequest();
    if (newExercise.name == ""){
      alert ("Error: Name is required.");
      return;
    }
    /*Open Request- add stuff to MySQL table*/
    req.open("GET", "http://flip3.engr.oregonstate.edu:3567/insert?name="+newExercise.name+
            "&reps="+newExercise.reps+
            "&weight="+newExercise.weight+
            "&date="+newExercise.date+
            "&measurement="+newExercise.lbs);

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400){
        console.log(req.responseText);
      }
    });
    /*Sending Request*/
    req.send(null);
  }
}


