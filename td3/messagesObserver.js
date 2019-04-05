//modele

class messagesObserver {


     /**
      * je ne suis pas sur si on a besoin d'un constructeur...
      * @param {Message} data - The content of the message.
      */
     constructor(data) {
         this.data = data;
     }



     //pourquoi cette fonction ne marche pas??????
     ajouterMessage(message) {
        
        document.getElementById("testHello").innerHTML = message.data;
     };

    
}


