var socket;

$(document).ready(function(){
   
    initialisation();
});

/** cette fonction initialise les objets et elle genere un div dans un conteneur */
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

    // 3. Subscribe
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

/** Cette fonction est responsalbe d'afficher les notifications*/
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

/** Cette fonction est responssable de mettre le compteurNotification à zéro */
function resetCompteur() {
    compteurNotification = 0; 
    updateCompteur();
}


/** fonction bonus: Cette fonction est responssalbe de changer le nom de l'utilisateur
 * en créeant un nouveau websocket avec la fonction initialisation()*/
function connecter(){
        var name = prompt("Entrez votre nom");
        document.getElementById("nom").innerHTML = name;
        if (name != null) {
           initialisation();
        }
    }


/** Cette fonction est responssable d'envoyer un message au serveur*/
function envoyerMessage(){
    
    //on prend ce qui a été écrit dans la bar
    var data = document.getElementById("dataMessage").value;

    var container = document.getElementById("con22");
    var current = container.childNodes[1];

    var nom = document.getElementById("nom").innerHTML ;

    //création du message
    let message = new Message("onMessage",current.id,data,nom,nom);

    //envoie du message
    socket.send(JSON.stringify(message)); 

	//on efface ce qui a été écrit a la fin.
    document.getElementById("dataMessage").value = "";
   
}

/** Cette fonction est responssable d'envoyer un groupe au serveur*/
function envoyerGroupe() {

    var nom = prompt("Entrez le nom du groupe");

    //on recupere le nom du groupe
    var id = "dbf646dc-5006-4d9f-8815-fd37514818ee";

    //on crée un nouveau channel
    var channel = new Message("onCreateChannel", id, nom, nom, nom);

    //envoie du message
    socket.send(JSON.stringify(channel)); 

}

/** Cette fonction est responssable d'envoyer un message sous la forme d'une pouce*/
function envoyerMessagePouce(){
    var data = "👍";
    var channelId = "dbf646dc-5006-4d9f-8815-fd37514818ee";

    var nom = document.getElementById("nom").innerHTML ;    //nom = TheMan

    //création du message
    let message = new Message("onMessage",channelId,data,nom,nom);

    //envoie du message
    socket.send(JSON.stringify(message));

}  

/** Cette fonction est responssable d'envoyer du son
  @param {string} filename : -le nom du fichier
 */
function playSound(filename){
    var mp3Source = '<source src="' + filename + '.mp3" type="audio/mpeg">';
    var oggSource = '<source src="' + filename + '.ogg" type="audio/ogg">';
    var embedSource = '<embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3">';
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay">' + mp3Source + oggSource + embedSource + '</audio>';
  }


var input = document.getElementById("dataMessage");
/** Cette fonction est responssable d'envoyer un message avec le button "Entrée"*/
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("envoyerEnter").click();
    }
});



/** Cette fonction est responssable d'envoyer une requete "onJoinChannel" au serveur
 @param {HTMLElement} element - l'icone généré
 */
function envoyerRequeteJoin(element) {

    element.classList.add("fa-minus");

    changerGroupe(element);    

    var id = element.id;

    var data = element.innerHTML;

    //création du message
    let request = new Message("onJoinChannel", id, data, data, data);

    //envoie du message
    socket.send(JSON.stringify(request));

}

/** Cette fonction est responssable de choisir quelle fonction il faut appeller
 @param {HTMLElement} element - l'icone généré
 */
function changeStatus(element) {

    if (element.classList.contains("fa-plus"))
        envoyerRequeteJoin(element);
    else {
        envoyerRequestLeave(element);
        }
    
}

/** Cette fonction est responssable d'envoyer une requete "onLeaveChannel" au serveur
 @param {HTMLElement} element - l'icone généré
 */
function envoyerRequestLeave(element) {
    //on prend ce qui a été écrit dans la bar

    var id = element.id;

    var data = element.innerHTML;

    //création du message
    let request = new Message("onLeaveChannel", id, data, data, data);

    //envoie du message
    socket.send(JSON.stringify(request));

    changerGroupeGeneral(element);          
}

/** Cette fonction est responssable de changer le nom du groupe afficher sous l'onglet "Groupe actif"
 @param {HTMLElement} element - l'icone généré
 */
function changerGroupe(element) {

    var parent = element.parentElement;
    var icone = parent.firstChild;
    var channel = parent.childNodes[1];

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

}


/** Cette fonction est responssable d'afficher "General" sous l'onglet "Groupe actif"
 @param {HTMLElement} element - l'icone généré
 */
function changerGroupeGeneral(element) {

    document.getElementById("con22").innerHTML = "";

    document.getElementById("con22").innerHTML += "<div>Groupe actif:</div>";

    var activeGroup = document.createElement("h4");
    activeGroup.innerHTML = "General";
    activeGroup.id = element.id;
    var parent = document.getElementById("con22");
    parent.appendChild(activeGroup);

    document.getElementById("messageText").innerHTML = "";
}