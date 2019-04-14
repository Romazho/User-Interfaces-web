//modele

class MessagesObserver {


     /**
      * je ne suis pas sur si on a besoin d'un constructeur...
      * @param {Message} data - The content of the message.
      */

     //a voire
     constructor(data) {
         this.data = data;
     }

    ajouterMessage(message) {

        compteurNotification++;
        updateCompteur();

        var container = document.getElementById("con22");
        var current = container.childNodes[1];

        console.log(message.channelId);
        console.log(current.id);

        if (message.channelId == current.id ) {
            var sender = document.getElementById("nom").innerHTML;

            if (message.sender == sender) {
                var messageBox = document.createElement("div");
                messageBox.id = "messageNous";
                messageBox.innerHTML = message.data;
                document.getElementById("messageText").appendChild(messageBox);
                document.getElementById("messageText").scrollBy(0, 5000);

                //affichage du temps
                var dateBox = document.createElement("div");
                dateBox.id = "date";

                let stringDate = this.afficherDate(message);

                dateBox.innerHTML = stringDate;
                document.getElementById("messageText").appendChild(dateBox);
            }

            else {
                playSound("appointed");
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

                let stringDate = this.afficherDate(message);
                dateBox.innerHTML = stringDate;
                document.getElementById("messageText").appendChild(dateBox);
            }
        }
    }

    
    afficherDate(message) {

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


    afficherErreur(){

        var errorBox = document.createElement("div");

        errorBox.id = "erreur";

        errorBox.innerHTML = "Une erreur s'est produite lors d'un envoie d'un message";
        document.getElementById("messageText").appendChild(errorBox);

    }

    afficherHistorique(data) {

        for (var i = 0; i < data.messages.length; i++) {
            this.ajouterMessage(data.messages[i]);
        }

    }



}


