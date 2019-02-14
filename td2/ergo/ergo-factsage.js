

function affichage() {

	document.getElementById("load").style.visibility = "visible";

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {

		var  x, txt = "";
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);

			console.log(myObj);
			
			var myTable= " <h3>" + myObj.formule + "</h3>" 
			myTable += "<table>";
			myTable += "<tr border-spacing='10px'> <th> Phase </th>  <th> mol </th> <th> Température (k) </th> <th> Pression (atm) </th> <th> Type </th> </tr>"; 
			
			for(var i=0; i<13; i++){
				myTable += "<tr> <td >" + myObj.output1[i].libelle + "</td>" +
				"<td align='center'>" + myObj.output1[i].concentration + "</td>" +
				"<td align='center'>" + myObj.output1[i].conditions.temperature.valeur + "</td>" +
				"<td align='center'>" + myObj.output1[i].conditions.pression.valeur + "</td>" +
				"<td align='center'>" + myObj.output1[i].conditions.type + "</td>" ;
			}
			
			myTable += "</table> <table> <tr class = 'trCustom'>";
			//myTable += "<tr class = 'trCustom'> <th> Nom </th> <th> Unité </th> <th> Valeur </th>  </tr>";

			for(var i=0;i<6;i++){
				myTable += "<th >" + myObj.output2[i].libelle + "</th>";
			}
			myTable += "</tr> <tr class = 'trCustom'>";
			for(var i=0;i<6;i++){
				myTable += " <th >" + myObj.output2[i].unite + "</th>";
			}
			myTable+="</tr> <tr>"; 
			for(var i=0;i<6;i++){
				myTable +=" <td >" + myObj.output2[i].valeur + "</td>";
			}
			
			myTable+="</tr> </table>";

			document.getElementById('resultat').innerHTML = myTable;
		}
	};

	xmlhttp.open("POST", "http://localhost:8080", true);
	// était: "data-output.json"
	xmlhttp.send(); //c'est ici qu'on peut envoyer notre donnée

}
