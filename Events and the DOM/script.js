/* TABLE STYLING */

var mainTable = document.createElement("table");
mainTable.style.border = "1px solid grey";

/* header row */
var newHeader = document.createElement("thead");
var headerRow = document.createElement("tr");
for (var i = 1; i < 5; i++){
  var newTableItem = document.createElement("th");
  newTableItem.style.border = "1px solid grey";
  newTableItem.style.backgroundColor = "#f2f2f2";
  newTableItem.textContent = "Header " + i;
  headerRow.appendChild(newTableItem);
}

newHeader.appendChild(headerRow);
mainTable.appendChild(newHeader);

/* table body */
var newTableBody = document.createElement("tbody");

for (var i = 1; i < 4; i++){
  var newRow = document.createElement("tr");
  for (var j = 1; j < 5; j++){
    var newTableItem = document.createElement("td");
    newTableItem.style.border = "1px solid grey";
    newTableItem.style.backgroundColor = "#f2f2f2";
    newTableItem.textContent = i + " " + j;
    newRow.appendChild(newTableItem);
  }
  newTableBody.appendChild(newRow);
}
mainTable.appendChild(newTableBody);
document.body.appendChild(mainTable);

/*DIRECTIONAL BUTTON + MARK STYLING*/

/*container*/
var containerDiv = document.createElement("div");
containerDiv.style.height = "200px";
containerDiv.style.marginTop = "30px";
containerDiv.style.width = "200px";
containerDiv.style.outline = "thick solid black"
containerDiv.style.position = "relative";
containerDiv.style.backgroundColor = "#f2f2f2";

/*up*/
var upDiv = document.createElement("div");
upDiv.textContent = "↑";
upDiv.style.position = "relative";
upDiv.style.left = "75px";
upDiv.style.height = "50px";
upDiv.style.width = "50px";
upDiv.style.outline = "thick dotted grey";
upDiv.style.textAlign = "center";
upDiv.style.backgroundColor = "#fff9d9";

containerDiv.appendChild(upDiv);

/*left*/
var leftDiv = document.createElement("div");
leftDiv.textContent = "←";
leftDiv.style.position = "relative";
leftDiv.style.top = "25px";
leftDiv.style.height = "50px";
leftDiv.style.width = "50px";
leftDiv.style.outline = "thick dotted grey";
leftDiv.style.textAlign = "center";
leftDiv.style.backgroundColor = "#fff9d9";

containerDiv.appendChild(leftDiv);

/*right*/
var rightDiv = document.createElement("div");
rightDiv.textContent = "→";
rightDiv.style.position = "relative";
rightDiv.style.top = "-25px";
rightDiv.style.float = "right";
rightDiv.style.height = "50px";
rightDiv.style.width = "50px";
rightDiv.style.outline = "thick dotted grey";
rightDiv.style.textAlign = "center";
rightDiv.style.backgroundColor = "#fff9d9";

containerDiv.appendChild(rightDiv);

/*bottom*/
var downDiv = document.createElement("div");
downDiv.textContent = "↓";
downDiv.style.position = "relative";
downDiv.style.top = "50px";
downDiv.style.left = "75px";
downDiv.style.height = "50px";
downDiv.style.width = "50px";
downDiv.style.outline = "thick dotted grey";
downDiv.style.textAlign = "center";
downDiv.style.backgroundColor = "#fff9d9";

containerDiv.appendChild(downDiv);

/*Mark (center)*/
var markDiv = document.createElement("div");
markDiv.textContent = "MARK CELL";
markDiv.style.position = "absolute";
markDiv.style.top = "75px";
markDiv.style.left = "75px";
markDiv.style.height = "50px";
markDiv.style.width = "50px";
markDiv.style.outline = "thick dotted grey";
markDiv.style.textAlign = "center";
markDiv.style.backgroundColor = "#fff3b3";

containerDiv.appendChild(markDiv);

document.body.appendChild(containerDiv);

/* MOVEMENT BEHAVIOR */

/*Selecting starting cell in upper left*/
var currentRow = newTableBody.firstElementChild;
var currentColumn = currentRow.firstElementChild;
var currentColumnNum = 0;
currentColumn.style.border = "3px solid grey";

/*Event Listeners*/
rightDiv.addEventListener("click", goRight);
leftDiv.addEventListener("click", goLeft);
upDiv.addEventListener("click", goUp);
downDiv.addEventListener("click", goDown);
markDiv.addEventListener("click", markCell);

/*Go right: Goes one cell to the right, adds to currentColumnNum, which
is to be used during the row movements*/
function goRight(){
  if (currentColumn.nextElementSibling != null){
    currentColumn.style.border = "1px solid grey";
    currentColumn = currentColumn.nextElementSibling;
    currentColumn.style.border = "3px solid grey";
    currentColumnNum++;
  }
}

/*Go left: Goes one cell to the left, adds to currentColumnNum, which
is to be used during the row movements*/
function goLeft(){
  if (currentColumn.previousElementSibling != null){
    currentColumn.style.border = "1px solid grey";
    currentColumn = currentColumn.previousElementSibling;
    currentColumn.style.border = "3px solid grey";
    currentColumnNum--;
  }
}

/*Go up: Goes one cell upwards.Uses currentColumnNum to remain in same 
column*/
function goUp(){
  if (currentRow.previousElementSibling != null){
    currentColumn.style.border = "1px solid grey";
    currentRow = currentRow.previousElementSibling;
    currentColumn = currentRow.childNodes[currentColumnNum];
    currentColumn.style.border = "3px solid grey";
  }
}

/*Go down: Goes one cell downwards.Uses currentColumnNum to remain in same 
column*/
function goDown(){
  if (currentRow.nextElementSibling != null){
    currentColumn.style.border = "1px solid grey";
    currentRow = currentRow.nextElementSibling;
    currentColumn = currentRow.childNodes[currentColumnNum];
    currentColumn.style.border = "3px solid grey";
  }
}

/*Mark Cell: Permanently changes background color of that cell to 
yellow.*/
function markCell(){
  currentColumn.style.backgroundColor = "#fff3b3";
}