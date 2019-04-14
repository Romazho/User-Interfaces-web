var socket;

$(document).ready(function(){
   
    initialisation();
});

function initialisation(){
     //connection au server
    var nom = document.getElementById("nom").innerHTML ;
    socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca"+ 
    "/chatservice?username="+ nom);

    // 1 . Create une instance de l'observable
    let connectionHandler = new ConnectionHandler(socket);

    // 2. Creer une instance des observer
    let messageObserver = new MessagesObserver();
    let channelObserver = new ChannelsObserver();

    // 3. Subscribe, .. 
    connectionHandler.subscribeMessageEvent(messageObserver);
    connectionHandler.subscribeChannelEvent(channelObserver);

    connectionHandler.init();


    document.getElementById("con22").innerHTML = "";

    document.getElementById("con22").innerHTML += "<div>Groupe actif:</div>";

    var activeGroup = document.createElement("h4");
    activeGroup.innerHTML = "General";
    activeGroup.id = "dbf646dc-5006-4d9f-8815-fd37514818ee";
    var parent = document.getElementById("con22");
    parent.appendChild(activeGroup);
}


var compteurNotification = 0; 

function updateCompteur() {
    var cloche = document.getElementById("cloche");

    while (cloche.hasChildNodes()) {
        cloche.removeChild(cloche.lastChild);
    }

    if (compteurNotification != 0) {
        var rouge = document.createElement("div");
        rouge.id = "notif";
        rouge.innerHTML = compteurNotification;
        document.getElementById("cloche").appendChild(rouge);
    }
}

function resetCompteur() {
    compteurNotification = 0; 
    updateCompteur();
}

//fonction bonus
function connecter(){
        var name = prompt("Entrez votre nom");
        document.getElementById("nom").innerHTML = name;
        if (name != null) {
           initialisation();
        }
    }

//cette fonction doit recevoir un chanelID pour envoyer le message dans le bon channel.
function envoyerMessage(){
    
    //on prend ce qui a été écrit dans la bar
    var data = document.getElementById("dataMessage").value;
    
    //recevoir le channelId dans le handler?
    //var channelId = "dbf646dc-5006-4d9f-8815-fd37514818ee";

    var container = document.getElementById("con22");
    var current = container.childNodes[1];

    var nom = document.getElementById("nom").innerHTML ;    //nom = TheMan

    //création du message
    let message = new Message("onMessage",current.id,data,nom,nom);

    //envoie du message
    socket.send(JSON.stringify(message)); 

	//on efface ce qui a été écrit a la fin.
    document.getElementById("dataMessage").value = "";
   
}

function envoyerGroupe() {

    var nom = prompt("Entrez le nom du groupe");

    //on recupere le nom du groupe
    //var nom = document.getElementById("NomGroupe").innerHTML;
    var id = "dbf646dc-5006-4d9f-8815-fd37514818ee";

    //on crée un nouveau channel
    var channel = new Message("onCreateChannel", id, nom, nom, nom);
    //console.log(nom);

    //envoie du message
    socket.send(JSON.stringify(channel)); 

}

function envoyerMessagePouce(){
    var data = "👍";
    var channelId = "dbf646dc-5006-4d9f-8815-fd37514818ee";

    var nom = document.getElementById("nom").innerHTML ;    //nom = TheMan

    //création du message
    let message = new Message("onMessage",channelId,data,nom,nom);

    //envoie du message
    socket.send(JSON.stringify(message));

}  

function playSound(filename){
    var mp3Source = '<source src="' + filename + '.mp3" type="audio/mpeg">';
    var oggSource = '<source src="' + filename + '.ogg" type="audio/ogg">';
    var embedSource = '<embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3">';
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay">' + mp3Source + oggSource + embedSource + '</audio>';
  }

var input = document.getElementById("dataMessage");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("envoyerEnter").click();
    }
});




/*
function displayMessage() {
    var message = document.createElement("div");
    message.id = "bubbleme";
    message.innerHTML = "fdfgl;sdjfglksdfj;gslkdfjgs;dlfgjaksdjhfaskdfhaskdjfhaskdjfhakdjfhaskdjfhaskdjfhasdkjfhasdfkjahsdkfjahsdfaskdfhasdkfahsdkfjahsdkfjas";
    document.getElementById("messageText").appendChild(message);
    document.getElementById("messageText").scrollBy(0,5000);
}
*/


function envoyerRequeteJoin(x) {
    //on prend ce qui a été écrit dans la bar

    x.classList.add("fa-minus");

    changerGroupe(x);    

    var id = x.id;

    var data = x.innerHTML;

    //création du message

    let request = new Message("onJoinChannel", id, data, data, data);

    //envoie du message
    socket.send(JSON.stringify(request));

}

function changeStatus(elem) {

        if (elem.classList.contains("fa-plus"))
            envoyerRequeteJoin(elem);
        else {
            envoyerRequestLeave(elem);
        }
    
}

function envoyerRequestLeave(x) {
    //on prend ce qui a été écrit dans la bar

    var id = x.id;

    var data = x.innerHTML;

    //création du message

    let request = new Message("onLeaveChannel", id, data, data, data);

    //envoie du message
    socket.send(JSON.stringify(request));

    changerGroupeGeneral(x);          
}

function changerGroupe(elem) {

    var parent = elem.parentElement;
    var icone = parent.firstChild;
    var channel = parent.childNodes[1];

    //var ok = document.getElementById("con22");
    //var current = ok.childNodes[1];
    //if (elem.id != current.id) {
    //    document.getElementById("messageText").innerHTML = "";
    //}   



    if (icone.classList.contains("fa-minus")) {

        //on change juste le texte
        document.getElementById("con22").innerHTML = "";

        document.getElementById("con22").innerHTML += "<div>Groupe actif:</div>";

        var activeGroup = document.createElement("h4");
        activeGroup.innerHTML = channel.innerHTML;
        activeGroup.id = channel.id;
        var parent = document.getElementById("con22");
        parent.appendChild(activeGroup);


    }

    //envoyerRequeteJoin(elem);

    //var container = document.getElementById("con22");
    //var current = container.childNodes[1];
    var nom = "hello";
    ////création du message
   // let message = new Message("onGetChannel", elem.id, nom, nom, nom);
    //socket.send(JSON.stringify(message));


}


function changerGroupeGeneral(elem) {

    document.getElementById("con22").innerHTML = "";

    document.getElementById("con22").innerHTML += "<div>Groupe actif:</div>";

    var activeGroup = document.createElement("h4");
    activeGroup.innerHTML = "General";
    activeGroup.id = elem.id;
    var parent = document.getElementById("con22");
    parent.appendChild(activeGroup);

    document.getElementById("messageText").innerHTML = "";


    //envoyerRequeteJoin(elem);

    //var container = document.getElementById("con22");
    //var current = container.childNodes[1];
    var nom = "hello";
    ////création du message
    //let message = new Message("onGetChannel", elem.id, nom, nom, nom);
    //socket.send(JSON.stringify(message));
}