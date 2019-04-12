

class ConnectionHandler {

    constructor(exampleSocket){
        this.MessagesObserver  = undefined;
        this.ChannelsObserver  = undefined;
        this.exampleSocket = exampleSocket;
    }

    

    subscribeMessageEvent(messageObserver){
        this.MessagesObserver = messageObserver;
        
    }

    subscribeChannelEvent(channelsObserver){
        this.ChannelsObserver = channelsObserver;
    }

    init(){

        this.exampleSocket.onmessage = (event) =>{
            console.log(event.data);
        
            //var f = document.getElementById("messageText").value;
            var text = "";
            //msg est un objet
            var msg = JSON.parse(event.data);
            console.log(msg.data);
            
            var time = new Date(msg.timestamp);
            var timeStr = time.toLocaleTimeString();
        
            switch (msg.eventType) {
                case "updateChannelsList":
                    this.ChannelsObserver.updateChannelList(msg);
                    break;
                case "onJoinChannel":
                    this.ChannelsObserver.ajouterUtilisateur(msg.sender);
                    break;
                case "onCreateChannel":
                    //channelsObserver.   Ajouter fct pour creer un channel
                    break;
                case "onLeaveChannel":
                    this.ChannelsObserver.retirerUtilisateur(msg.sender);
                    break;
                case "onMessage":
                    //a faire ceci : mais ca ne marche pas...
                    //ajouterMessage(msg); 
                    this.MessagesObserver.ajouterMessage(msg);
                    break;
                case "onError":
                    //messagesObserver.  Ajouter fct pour afficher un erreur
                    this.MessagesObserver.afficherErreur();
                    break;
            }
        
        }
    }


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