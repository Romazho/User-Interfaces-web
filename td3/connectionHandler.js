

class ConnectionHandler {

    constructor(socket){
        this.MessagesObserver  = undefined;
        this.ChannelsObserver  = undefined;
        this.socket = socket;
    }

    

    subscribeMessageEvent(messageObserver){
        this.MessagesObserver = messageObserver;
        
    }

    subscribeChannelEvent(channelsObserver){
        this.ChannelsObserver = channelsObserver;
    }

    init(){

        this.socket.onmessage = (event) =>{
            console.log(event.data);
        
            var text = "";
            var msg = JSON.parse(event.data);
            console.log(msg.data);
            
            var time = new Date(msg.timestamp);
            var timeStr = time.toLocaleTimeString();
        
            switch (msg.eventType) {
                case "updateChannelsList":     
                    this.ChannelsObserver.updateChannelList(msg);
                    break;
                case "onJoinChannel":           
                    this.ChannelsObserver.changePlusMinus(msg.channelId);
                    break;
                case "onCreateChannel":      
                    this.ChannelsObserver.ajouterGroupe(msg.data);
                    break;
                case "onLeaveChannel": 
                    this.ChannelsObserver.retirerUtilisateur(msg.sender);
                    break;
                case "onMessage":
                    this.MessagesObserver.ajouterMessage(msg);    
                    break;
                case "onError":
                   
                    this.MessagesObserver.afficherErreur();        
                    break;
                case "onGetChannel":
                    this.MessagesObserver.afficherHistorique(msg.data);
                    break;
            }
        
        }
    }


}
