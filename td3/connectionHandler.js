

class ConnectionHandler {


    /** Cette fonction est responssable de construir l'objet connectionHandler
     @param {WebSocket} socket - le web socket associé au ConnectionHandler
     */
    constructor(socket){
        this.MessagesObserver  = undefined;
        this.ChannelsObserver  = undefined;
        this.socket = socket;
    }

    
 
 
    /** Cette fonction est responssable d'ajouter un observateur de message à l'objet connectionHandler
     @param {MessageObserver} messageObserver - l'observateur de message
     */
    subscribeMessageEvent(messageObserver){
        this.MessagesObserver = messageObserver;
        
    }


    /** Cette fonction est responssable d'ajouter un observateur de channel à l'objet connectionHandler
     @param {ChannelObserver} channelObserver - l'observateur de channel
     */
    subscribeChannelEvent(channelsObserver){
        this.ChannelsObserver = channelsObserver;
    }
    /** Cette fonction est responssable d'initialiser l'ensemble des responsabilités liées au connectionHandler selon l'évènement 
     */
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
