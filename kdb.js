var query = "GetArrowCLO[]"; // Enter query here
var result = document.getElementById("result");
var websocket = new WebSocket("ws://dc2nix2p196:35077/");
websocket.binaryType = 'arraybuffer'; // Required by c.js
//console.log(query);
websocket.onopen = function() { 
	console.log("Websocket has opened"); 
	websocket.send(serialize(query)); } // Event handler configuration
	websocket.onclose = function() { console.log("Websocket has closed"); }
	websocket.onmessage = function(e) { 
		var data = deserialize(e.data); 
		console.log(data);
		//result.innerHTML = dataHandler(data); 
		data = data[1]
		result.innerHTML=csvTbl(data)
		//result.innerHTML=data
	}

websocket.onerror = function(err) { console.log(err); }

function csvTbl(data){ // Change csv string into a HTML formatted table
	var i,table = "",
		rows = data.split("\\n"),
		header = rows[0].split(","),
		rowcount =	rows.length;
	//table += "<table><thead><th>" + header.join("</th><th>") + "</th></tr></thead><tbody>";
	//table += "<table id=\"myTable\"><tr><th>" + header.join("</th><th>") + "</th></tr>";
	table += "<table class=\"filterTable\" id=\"arrow\"><thead><th>" + header.join("</th><th>") + "</th></tr></thead><tbody>";;
	
	
	for(i=1;i<rowcount;i++){
		table+="<tr><td>" + rows[i].split(",").join("</td><td>") + "</tr>";
	}
	
	table+="</table>";
return table;
}

function jsonTbl(data){
	var table,colheaders,index,row,col;
		table = '<table><thead><tr>';
	for(colheaders in data[0]){ // Set up column headers
		table+= '<th>' + colheaders + '</th>';
	}
	table+= '</tr></thead><tbody>';
	for(index in data){ // Construct table body
		row = data[index];
		table+= '<tr>';
	for(col in row){
		table+= '<td>' + row[col] + '</td>';
	}
	table+= '</tr>';
	}
	table+= '</tbody></table>';
	return table;
}

function dataHandler(data){ // What to do with the data
	switch(data[0]){
	case "result":
	return data[1];
	break;
	case "table<br>":
	return csvTbl(data[1]);
	break;
	}
}

var reverse;
reverse = false;

function sortTable(N) {
  var filterTable, rows, sorted, i, x, y, sortFlag;
  filterTable = document.querySelector(".filterTable");
  sorted = true;
  
  if (reverse == false){
	  while (sorted) {
		 sorted = false;
		 rows = filterTable.rows;
		 for (i = 1; i < rows.length - 1; i++) {
			sortFlag = false;
			x = rows[i].getElementsByTagName("TD")[N];
			y = rows[i + 1].getElementsByTagName("TD")[N];
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			   sortFlag = true;
			   break;
			}
		 }
		 if (sortFlag) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			sorted = true;
		 }
	  }
	  reverse = true;
  } else{
		console.log(reverse);
	  	 while (sorted) {
		 sorted = false;
		 rows = filterTable.rows;
		 for (i = rows.length-1; i > 1; i--) {
			sortFlag = false;
			x = rows[i].getElementsByTagName("TD")[N];
			y = rows[i - 1].getElementsByTagName("TD")[N];
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			   sortFlag = true;
			   break;
			}
		 }
		 if (sortFlag) {
			rows[i].parentNode.insertBefore(rows[i], rows[i-1]);
			sorted = true;
		 }
	  }
	  reverse = false;  
	  
  }
}



function sortTableInt(N) {
  var filterTable, rows, sorted, i, x, y, sortFlag;
  filterTable = document.querySelector(".filterTable");
  sorted = true;
  
  if (reverse == false){
	  while (sorted) {
		 sorted = false;
		 rows = filterTable.rows;
		 for (i = 1; i < rows.length - 1; i++) {
			sortFlag = false;
			x = rows[i].getElementsByTagName("TD")[N];
			y = rows[i + 1].getElementsByTagName("TD")[N];
			if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
			   sortFlag = true;
			   break;
			}
		 }
		 if (sortFlag) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			sorted = true;
		 }
	  }
	  reverse = true;
  } else{
		console.log(reverse);
	  	 while (sorted) {
		 sorted = false;
		 rows = filterTable.rows;
		 for (i = rows.length-1; i > 1; i--) {
			sortFlag = false;
			x = rows[i].getElementsByTagName("TD")[N];
			y = rows[i - 1].getElementsByTagName("TD")[N];
			if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
			   sortFlag = true;
			   break;
			}
		 }
		 if (sortFlag) {
			rows[i].parentNode.insertBefore(rows[i], rows[i-1]);
			sorted = true;
		 }
	  }
	  reverse = false;  
	  
  }
}

function SearchTable() {

  // Declare variables 
  var input = document.getElementById("myInput");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("arrow");
  var trs = table.tBodies[0].getElementsByTagName("tr");

  // Loop through first tbody's rows
  for (var i = 0; i < trs.length; i++) {

    // define the row's cells
    var tds = trs[i].getElementsByTagName("td");

    // hide the row
    trs[i].style.display = "none";

    // loop through row cells
    for (var i2 = 0; i2 < tds.length; i2++) {

      // if there's a match
      if (tds[i2].innerHTML.toUpperCase().indexOf(filter) > -1) {

        // show the row
        trs[i].style.display = "";

        // skip to the next row
        continue;

      }
    }
  }

}


