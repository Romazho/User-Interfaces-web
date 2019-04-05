

    //connection au server
    var nom = document.getElementById("nom").innerHTML ;
    var exampleSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca"+ 
    "/chatservice?username="+ nom);



    exampleSocket.onmessage = function (event) {
        console.log(event.data);

        //var f = document.getElementById("messageText").value;
        var text = "";
        //msg est un objet
        var msg = JSON.parse(event.data);
        var time = new Date(msg.timestamp);
        var timeStr = time.toLocaleTimeString();

        switch (msg.eventType) {
            case "onJoinChannel":
                channelsObserver.ajouterUtilisateur(msg.sender);
                break;
            case "onCreateChannel":
                //channelsObserver.   Ajouter fct pour creer un channel
                break;
            case "onLeaveChannel":
                channelsObserver.retirerUtilisateur(msg.sender);
                break;
            case "onMessage":
                //messagesObserver
                messagesObserver.ajouterMessage(msg);
                break;
            case "onError":
                //messagesObserver.  Ajouter fct pour afficher un erreur
                break;
        }

    }


    //temporaire
    function ajouterMessage(message) {
        
        document.getElementById("testHello").innerHTML = message.data;
     };



//fonction bonus
function connecter(){
        var name = prompt("Entrez votre nom", "Roman");
        if (name != null) {
            document.getElementById("nom").innerHTML = name;
        }
    }


function envoyerMessage(){

    //on prend ce qui a été écrit dans la bar
    var data = document.getElementById("dataMessage").value;
    
    //recevoir le channelId dans le handler?
    var channelId = "dbf646dc-5006-4d9f-8815-fd37514818ee";

    var nom = document.getElementById("nom").innerHTML ;    //nom = TheMan

    //création du message
    let message = new Message("onMessage",channelId,data,nom,nom);
    
    exampleSocket.send(JSON.stringify(message)); 

	//on efface ce qui a été écrit a la fin.
    document.getElementById("dataMessage").value = " ";
    

}


function changePlusMinus(x){

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


var y = 0;

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks on "ajouter", close the modal
    function ajoutGroupe() {
        modal.style.display = "none";
        //envoyer nom du groupe au serveur.
    }


    //When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
