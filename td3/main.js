var exampleSocket;

$(document).ready(function(){
    //connection au server
    var nom = document.getElementById("nom").innerHTML ;
    exampleSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca"+ 
    "/chatservice?username="+ nom);

    // 1 . Create une instance de l'observable
    let connectionHandler = new ConnectionHandler(exampleSocket);

    // 2. Creer une instance des observer
    let messageObserver = new MessagesObserver();
    let channelObserver = new ChannelsObserver();

    // 3. Subscribe, .. 
    connectionHandler.subscribeMessageEvent(messageObserver);
    connectionHandler.subscribeChannelEvent(channelObserver);

    connectionHandler.init();


});




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

    //envoie du message
    exampleSocket.send(JSON.stringify(message)); 

	//on efface ce qui a été écrit a la fin.
    document.getElementById("dataMessage").value = " ";
    

}

var input = document.getElementById("dataMessage");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("envoyerEnter").click();
    }
});


var y = 0;

function changePlusMinus(x){

//x.classList.toggle("fa-plus");

	//a changer cette implementation...
	if(y % 2 == 0){
		x.classList.remove("fa-plus");
		x.classList.add("fa-minus");
	}
	
	else {
		x.classList.remove("fa-minus");
		x.classList.add("fa-plus");
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

function displayMessage() {
    var message = document.createElement("div");
    message.id = "bubbleme";
    message.innerHTML = "testFuckerfdfgl;sdjfglksdfj;gslkdfjgs;dlfgjaksdjhfaskdfhaskdjfhaskdjfhakdjfhaskdjfhaskdjfhasdkjfhasdfkjahsdkfjahsdfaskdfhasdkfahsdkfjahsdkfjas";
    document.getElementById("messageText").appendChild(message);
    document.getElementById("messageText").scrollBy(0,5000);
}