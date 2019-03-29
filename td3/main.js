
//fonction bonus
function connecter(){
        var name = prompt("Entrez votre nom", "Roman");
        if (name != null) {
            document.getElementById("nom").innerHTML = name;
        }
    }


function envoyer(){

	var mess = "hello";
	//recevoir le channelId dans le handler?
	let message = new Message(onMessage,channelId,mess,mess,mess);


	//on efface ce qui a été écrit a la fin.
	document.getElementById("ecrirmes").value = " ";
}


function myFunction(x){

//x.classList.toggle("fa-plus");


	//a changer cette implementation...
	if(y % 2 == 0){
		x.classList.remove("fa-minus");
		x.classList.add("fa-plus");
	}
	
	else {
		x.classList.remove("fa-plus");
		x.classList.add("fa-minus");
	}

	y++;



	/*if (document.getElementById("eq").className === "fa-minus") {
		document.getElementById("eq").className = "fa-thumbs-up";
	
	}
	else {
		document.getElementById("eq").className = "fa-thumbs-down";
	
	}*/




	/*event.srcElement.style.display = "none";
	let indexIcon = event.srcElement.className === "fas fa-minus" ? 0 : 1;
	let divParent = event.srcElement.parentElement;
	divParent.children[indexIcon].style.display = "inline";
	*/
}

/*
function affichage() {

	xmlhttp.open("POST", "http://localhost:8080", true);
	// était: "data-output.json"
	xmlhttp.send(); //c'est ici qu'on peut envoyer notre donnée

}
*/