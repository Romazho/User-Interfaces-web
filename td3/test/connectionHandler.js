
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
            //a faire ceci : mais ca ne marche pas...
            //ajouterMessage(msg); 
            ajouterMessage(msg);
            break;
        case "onError":
            //messagesObserver.  Ajouter fct pour afficher un erreur
            break;
    }

}


//temporaire car il faut faire messageObserver.ajouterMessage(msg)
function ajouterMessage(message) {

    var sender = document.getElementById("nom").innerHTML;

    if (message.sender == "TheWoman" ) {
        var messageBox = document.createElement("div");
        messageBox.id = "messageNous";
        messageBox.innerHTML = message.data;
        document.getElementById("messageText").appendChild(messageBox);
        document.getElementById("messageText").scrollBy(0, 5000);

        //affichage du temps
        var dateBox = document.createElement("div");
        dateBox.id = "date";

        stringDate = afficherDate(message);

        dateBox.innerHTML = stringDate;
        document.getElementById("messageText").appendChild(dateBox);
    }
    else {

        //affichage du nom
        var name = document.createElement("div");
        name.id = "nomOther";
        name.innerHTML = message.sender;
        document.getElementById("messageText").appendChild(name);

        var messageBox = document.createElement("div");
        messageBox.id = "messageFromOthers";
        messageBox.innerHTML = message.data;
        document.getElementById("messageText").appendChild(messageBox);
        document.getElementById("messageText").scrollBy(0, 5000);


        //affichage du temps
        var dateBox = document.createElement("div");
        dateBox.id = "dateOther";
        //var date = message.timestamp;

        stringDate = afficherDate(message);

        dateBox.innerHTML = stringDate;
        document.getElementById("messageText").appendChild(dateBox);
    }


};


function afficherDate(message) {

    var date = new Date(message.timestamp);

    var stringDate = "";

    switch (date.getDay()) {
        case 0:
            stringDate = "DIMANCHE";
            break;
        case 1:
            stringDate = "LUNDI";
            break;
        case 2:
            stringDate = "MARDI";
            break;
        case 3:
            stringDate = "MERCREDI";
            break;
        case 4:
            stringDate = "JEUDI";
            break;
        case 5:
            stringDate = "VENDREDI";
            break;
        case 6:
            stringDate = "SAMEDI";
            break;

    }

    var month = date.getMonth() + 1;
    stringDate += " " + month + ", " + date.getHours() + ":" + date.getMinutes();

    return stringDate;
}



//le switch est ici!

/*Class ConnectionHandler {

    constructor();{

        var exampleSocket = new WebSocket("wss://http://log2420-nginx.info.polymtl.ca"+ 
        "/chatservice?username="+ document.getElementById("nom").innerHTML,"http");
    };



    


};   */





{
/*
function sendUserMessage(){
    var serverCall = new XMLHttpRequest();
    console.log("test");
    serverCall.onreadystatechange = function(){
        if(this.readyState == "4" && this.status == "200"){
            var time = new Date();
            var messageText = document.getElementById("messageInput").innerHTML.toString();
            var message = new Message("onMessage","insert channel id",messageText,"insert user",time.getHours().toString()+":"+time.getMinutes().toString());
            //Update Messages Observer (and therefore Channels Observer)
            //Display message in messages list
        }
    };
    serverCall.open("POST", "http://log2420-nginx.info.polymtl.ca", true);
    serverCall.send();   
}

function sendCreateMessage(){
    var serverCall = new XMLHttpRequest();
    serverCall.onreadystatechange = function(){
        if(this.readyState == "4" && this.status == "200"){
            var time = new Date();
            var groupName = "Welcome to the " + "get group name after we implement it in the View" + " channel!"; 
            var message = new Message("onCreateChannel","insert channel id",groupName,"Admin",time.getHours().toString()+":"+time.getMinutes().toString());
            //Update Messages Observer (and therefore Channels Observer)
            //Display message in messages list
        }
    };
    serverCall.open("POST", "http://log2420-nginx.info.polymtl.ca", true);
    serverCall.send();   
}

function sendJoinMessage(){
    var serverCall = new XMLHttpRequest();
    serverCall.onreadystatechange = function(){
        if(this.readyState == "4" && this.status == "200"){
            var time = new Date();
            var joinedUser = document.getElementById("username").innerHTML.toString() + " has joined the channel!"; //THIS IS NOT OPTIMAL
            var message = new Message("onCreateChannel","insert channel id",joinedUser,"Admin",time.getHours().toString()+":"+time.getMinutes().toString());
            //Update Messages Observer (and therefore Channels Observer)
            //Display message in messages list
        }
    };
    serverCall.open("POST", "http://log2420-nginx.info.polymtl.ca", true);
    serverCall.send();   
}

function sendLeaveMessage(){
    var serverCall = new XMLHttpRequest();
    serverCall.onreadystatechange = function(){
        if(this.readyState == "4" && this.status == "200"){
            var time = new Date();
            var leftUser = document.getElementById("username").innerHTML.toString() + " has left the channel!"; //THIS IS NOT OPTIMAL
            var message = new Message("onCreateChannel","insert channel id",leftUser,"Admin",time.getHours().toString()+":"+time.getMinutes().toString());
            //Display message in messages list
        }
    };
    serverCall.open("POST", "http://log2420-nginx.info.polymtl.ca", true);
    serverCall.send();   
}*/
}

{
/*
    var username = "Roman";

    var exampleSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + username);

    var msg = JSON.parse(event.data);

    
    exampleSocket.send("Here's some text that the server is urgently awaiting!"); 
    document.getElementById("testHello").innerHTML = "succesfull connection";

    var log = document.getElementById('chatbox');


    ws.onmessage = function (event) {
        var f = log.contentDocument;
        var msg = JSON.parse(event.data);
        var text = "";

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
                messagesObserver.ajouterMessage(msg);
                break;
            case "onError":
                //messagesObserver.  Ajouter fct pour afficher un erreur
                break;
        }
    }
*/
}